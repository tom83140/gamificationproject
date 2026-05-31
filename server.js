// server.js – Brainstorm Arena (完整版)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
        }
    }
}));

const SPREADSHEET_ID = '15-aJvO1NEYRevBXK-Zz9noNNQUisiBf_J0NoyXgELO4';
const credentials = process.env.GOOGLE_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
  : require('./service-account.json'); // 本地开发仍可用文件

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const sheets = google.sheets({ version: 'v4', auth });
let logSheetReady = false;

async function initSheet() {
    try {
        await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID, range: 'A1', valueInputOption: 'USER_ENTERED', insertDataOption: 'INSERT_ROWS',
            requestBody: { values: [['时间戳', '事件类型', '房间ID', '团队名称', '本轮得分', '累计得分', '补充信息']] }
        });
        logSheetReady = true;
        console.log('✅ Google Sheet 已连接');
    } catch (err) {
        console.warn('⚠️ Google Sheets 连接失败，日志功能不可用:', err.message);
    }
}

async function appendLog(row) {
    if (!logSheetReady) return;
    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID, range: 'A1', valueInputOption: 'USER_ENTERED', insertDataOption: 'INSERT_ROWS',
            requestBody: { values: [row] }
        });
    } catch (err) { console.error('写入 Sheet 失败:', err.message); }
}

const rooms = new Map();

io.on('connection', (socket) => {
    console.log('🟢 连接:', socket.id);
    appendLog([new Date().toISOString(), '用户连接', '', '', '', '', socket.id]);

    socket.on('create_room', (_, callback) => {
        const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        const initialState = {
            currentStage: 'login',
            selectedPromptIndex: 1,
            teams: {},
            teamStages: {},
            stageTimers: {},
            votes: {},
            pitchOrder: [],
            currentPitchingTeam: null,
            roundNumber: 1,
            hostTeamId: null
        };
        rooms.set(roomId, initialState);
        socket.join(roomId);
        appendLog([new Date().toISOString(), '创建房间', roomId, '', '', '', socket.id]);
        callback({ success: true, roomId, gameState: initialState });
    });

    socket.on('join_room', (roomId, callback) => {
        const code = roomId.toUpperCase();
        const state = rooms.get(code);
        if (!state) return callback({ success: false, error: '房间不存在' });
        socket.join(code);
        appendLog([new Date().toISOString(), '加入房间', code, '', '', '', socket.id]);
        callback({ success: true, roomId: code, gameState: state });
    });

    socket.on('team_login', async ({ roomId, teamId, teamData }) => {
        const state = rooms.get(roomId);
        if (!state) return;
        if (!state.teams[teamId]) {
            state.teams[teamId] = {
                id: teamId, name: teamData.name, color: teamData.color, avatarUrl: teamData.avatarUrl,
                tokens: 0, totalTokensEarned: 0, uploadedPDF: null, quizCompleted: false, quizScore: 0, joinedAt: Date.now()
            };
            if (!state.hostTeamId) state.hostTeamId = teamId;
            state.teamStages[teamId] = '';
            io.to(roomId).emit('state_updated', state);
            appendLog([new Date().toISOString(), '团队加入', roomId, teamData.name, '', '', teamId]);
        }
    });

    socket.on('update_state', ({ roomId, newState }) => {
        const state = rooms.get(roomId);
        if (!state) return;
        if (newState.currentStage) {
            const allowed = ['login', 'prompt', 'quiz', 'pitch_prep', 'pitch', 'voting', 'results'];
            if (allowed.includes(newState.currentStage)) state.currentStage = newState.currentStage;
        }
        if (newState.currentPitchingTeam !== undefined) state.currentPitchingTeam = newState.currentPitchingTeam;
        io.to(roomId).emit('state_updated', state);
    });

    socket.on('advance_team_stage', ({ roomId, teamId, newStage }) => {
        const state = rooms.get(roomId);
        if (!state || !state.teams[teamId]) return;
        const validStages = ['mural', 'canva', 'upload', 'pitch_prep_done'];
        if (!validStages.includes(newStage)) return;
        state.teamStages[teamId] = newStage;
        io.to(roomId).emit('state_updated', state);
        appendLog([new Date().toISOString(), '团队进度', roomId, state.teams[teamId].name, newStage, '', '']);

        if (newStage === 'pitch_prep_done') {
            const allTeams = Object.keys(state.teams);
            const allDone = allTeams.every(tid => state.teamStages[tid] === 'pitch_prep_done');
            if (allDone && state.currentStage === 'quiz') {
                state.currentStage = 'pitch_prep';
                state.pitchOrder = allTeams.slice();
                state.currentPitchingTeam = null;
                allTeams.forEach(tid => { state.teamStages[tid] = ''; });
                io.to(roomId).emit('state_updated', state);
            }
        }
    });

    socket.on('submit_quiz', ({ roomId, teamId, score }) => {
        const state = rooms.get(roomId);
        if (state?.teams[teamId]) {
            state.teams[teamId].quizCompleted = true;
            state.teams[teamId].quizScore = score;
            state.teamStages[teamId] = 'mural';   // 自动进入 mural
            io.to(roomId).emit('state_updated', state);
            appendLog([new Date().toISOString(), '测验完成', roomId, state.teams[teamId].name, score, '', '']);
        }
    });

    socket.on('pdf_uploaded', ({ roomId, teamId, fileInfo }) => {
        const state = rooms.get(roomId);
        if (state?.teams[teamId]) {
            state.teams[teamId].uploadedPDF = fileInfo;
            io.to(roomId).emit('state_updated', state);
            appendLog([new Date().toISOString(), 'PDF上传', roomId, state.teams[teamId].name, '', '', fileInfo.name]);
        }
    });

    socket.on('submit_votes', ({ roomId, teamId, allocations }) => {
        const state = rooms.get(roomId);
        if (!state?.teams[teamId]) return;
        state.votes[teamId] = allocations;
        Object.entries(allocations).forEach(([targetId, amount]) => {
            if (state.teams[targetId]) {
                state.teams[targetId].tokens += amount;
                state.teams[targetId].totalTokensEarned += amount;
            }
        });
        io.to(roomId).emit('state_updated', state);
        const voterName = state.teams[teamId].name;
        appendLog([new Date().toISOString(), '投票', roomId, voterName, '', JSON.stringify(allocations), '']);

        const allTeams = Object.values(state.teams);
        const allVoted = allTeams.every(t => state.votes[t.id]);
        if (allVoted) {
            allTeams.forEach(t => {
                appendLog([new Date().toISOString(), '本轮得分', roomId, t.name, t.tokens, t.totalTokensEarned, `Round ${state.roundNumber}`]);
            });
            state.currentStage = 'results';
            io.to(roomId).emit('state_updated', state);
        }
    });

    socket.on('start_timer', ({ roomId, stageKey, endTime }) => {
        socket.to(roomId).emit('timer_started', { stageKey, endTime });
    });

    socket.on('disconnect', () => {
        console.log('🔴 断开:', socket.id);
        appendLog([new Date().toISOString(), '断开连接', '', '', '', '', socket.id]);
    });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const PORT = process.env.PORT || 3000;
initSheet().then(() => {
    server.listen(PORT, () => console.log(`🚀 服务器运行在 http://localhost:${PORT}`));
});