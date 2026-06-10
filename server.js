// server.js - Brainstorm Arena
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(__dirname, {
    index: false,
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
        }
    }
}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'intro.html')));
app.get('/app', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/app.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const SPREADSHEET_ID = '15-aJvO1NEYRevBXK-Zz9noNNQUisiBf_J0NoyXgELO4';
const serviceAccountPath = path.join(__dirname, 'service-account.json');
const credentials = process.env.GOOGLE_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
  : (fs.existsSync(serviceAccountPath) ? require(serviceAccountPath) : null);

const auth = credentials ? new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
}) : null;
const sheets = auth ? google.sheets({ version: 'v4', auth }) : null;
let logSheetReady = false;

async function initSheet() {
    if (!sheets) {
        console.warn('Google credentials not found. Local run will skip Google Sheet logging.');
        return;
    }
    try {
        await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A1',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: [['Timestamp', 'Event Type', 'Room ID', 'Team Name', 'Round Score', 'Total Score', 'Details']]
            }
        });
        logSheetReady = true;
        console.log('Google Sheet connected.');
    } catch (err) {
        console.warn('Google Sheets connection failed. Logging is unavailable:', err.message);
    }
}

async function appendLog(row) {
    if (!logSheetReady) return;
    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A1',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: { values: [row] }
        });
    } catch (err) {
        console.error('Failed to write to Sheet:', err.message);
    }
}

const rooms = new Map();

io.on('connection', (socket) => {
    console.log('Connected:', socket.id);
    appendLog([new Date().toISOString(), 'User Connected', '', '', '', '', socket.id]);

    socket.on('create_room', (_, callback) => {
        const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        const initialState = {
            currentStage: 'login',
            selectedPromptIndex: Math.floor(Math.random() * 6),
            teams: {},
            teamStages: {},
            stageTimers: {},
            votes: {},
            ratingSubmissions: {},
            pitchOrder: [],
            currentPitchingTeam: null,
            roundNumber: 1,
            hostTeamId: null
        };
        rooms.set(roomId, initialState);
        socket.join(roomId);
        appendLog([new Date().toISOString(), 'Room Created', roomId, '', '', '', socket.id]);
        callback({ success: true, roomId, gameState: initialState });
    });

    socket.on('join_room', (roomId, callback) => {
        const code = roomId.toUpperCase();
        const state = rooms.get(code);
        if (!state) return callback({ success: false, error: 'Room does not exist' });
        socket.join(code);
        appendLog([new Date().toISOString(), 'Room Joined', code, '', '', '', socket.id]);
        callback({ success: true, roomId: code, gameState: state });
    });

    socket.on('team_login', async ({ roomId, teamId, teamData }) => {
        const state = rooms.get(roomId);
        if (!state) return;
        if (!state.teams[teamId]) {
            state.teams[teamId] = {
                id: teamId,
                name: teamData.name,
                color: teamData.color,
                avatarUrl: teamData.avatarUrl,
                tokens: 0,
                totalTokensEarned: 0,
                uploadedPDF: null,
                quizCompleted: false,
                quizScore: 0,
                quizAnswers: [],
                quizSubmission: null,
                joinedAt: Date.now()
            };
            if (!state.hostTeamId) state.hostTeamId = teamId;
            state.teamStages[teamId] = '';
            io.to(roomId).emit('state_updated', state);
            appendLog([new Date().toISOString(), 'Team Joined', roomId, teamData.name, '', '', teamId]);
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
        const validStages = ['mural', 'pitch_prep_done'];
        if (!validStages.includes(newStage)) return;
        state.teamStages[teamId] = newStage;
        io.to(roomId).emit('state_updated', state);
        appendLog([new Date().toISOString(), 'Team Progress', roomId, state.teams[teamId].name, newStage, '', '']);

        if (newStage === 'pitch_prep_done') {
            const allTeams = Object.keys(state.teams);
            const allDone = allTeams.every(tid => state.teamStages[tid] === 'pitch_prep_done');
            if (allDone && state.currentStage === 'quiz') {
                state.currentStage = 'pitch_prep';
                state.pitchOrder = allTeams.slice();
                state.currentPitchingTeam = state.pitchOrder[0] || null;
                state.stageTimers.pitch_prep = { running: false, ended: false, endTime: null };
                state.stageTimers.pitch = { running: false, ended: false, endTime: null };
                allTeams.forEach(tid => { state.teamStages[tid] = ''; });
                io.to(roomId).emit('state_updated', state);
            }
        }
    });

    socket.on('submit_quiz', ({ roomId, teamId, selectedPromptIndex, answers, details, score }, callback) => {
        const state = rooms.get(roomId);
        if (!state) {
            if (callback) callback({ success: false, error: 'Room does not exist' });
            return;
        }
        if (!state.teams[teamId]) {
            if (callback) callback({ success: false, error: 'Team does not exist' });
            return;
        }

        if (state.teams[teamId]) {
            const safeDetails = Array.isArray(details) ? details.map((item) => ({
                questionIndex: Number(item.questionIndex),
                question: String(item.question || ''),
                selectedIndex: Number(item.selectedIndex),
                selectedAnswer: String(item.selectedAnswer || ''),
                correctIndex: Number(item.correctIndex),
                correctAnswer: String(item.correctAnswer || ''),
                isCorrect: Boolean(item.isCorrect)
            })) : [];
            const safeAnswers = Array.isArray(answers) ? answers.map(Number) : [];
            const calculatedScore = safeDetails.length
                ? safeDetails.filter(item => item.isCorrect).length
                : Number(score || 0);

            state.teams[teamId].quizCompleted = true;
            state.teams[teamId].quizScore = calculatedScore;
            state.teams[teamId].quizAnswers = safeAnswers;
            state.teams[teamId].quizSubmission = {
                roundNumber: state.roundNumber,
                selectedPromptIndex: Number.isInteger(selectedPromptIndex) ? selectedPromptIndex : state.selectedPromptIndex,
                score: calculatedScore,
                answers: safeAnswers,
                details: safeDetails,
                submittedAt: Date.now()
            };
            io.to(roomId).emit('state_updated', state);
            appendLog([
                new Date().toISOString(),
                'Quiz Completed',
                roomId,
                state.teams[teamId].name,
                calculatedScore,
                '',
                JSON.stringify(state.teams[teamId].quizSubmission)
            ]);
            if (callback) callback({ success: true, gameState: state });
        }
    });

    socket.on('pdf_uploaded', ({ roomId, teamId, fileInfo }) => {
        const state = rooms.get(roomId);
        if (state?.teams[teamId]) {
            state.teams[teamId].uploadedPDF = fileInfo;
            io.to(roomId).emit('state_updated', state);
            appendLog([new Date().toISOString(), 'PDF Uploaded', roomId, state.teams[teamId].name, '', '', fileInfo.name]);
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
        appendLog([new Date().toISOString(), 'Votes Submitted', roomId, voterName, '', JSON.stringify(allocations), '']);

        const allTeams = Object.values(state.teams);
        const allVoted = allTeams.every(t => state.votes[t.id]);
        if (allVoted) {
            allTeams.forEach(t => {
                appendLog([new Date().toISOString(), 'Round Score', roomId, t.name, t.tokens, t.totalTokensEarned, `Round ${state.roundNumber}`]);
            });
            state.currentStage = 'results';
            io.to(roomId).emit('state_updated', state);
        }
    });

    socket.on('submit_rating', ({ roomId, teamId, payload }, callback) => {
        const state = rooms.get(roomId);
        if (!state) {
            if (callback) callback({ success: false, error: 'Room does not exist' });
            return;
        }
        if (!state.teams[teamId]) {
            if (callback) callback({ success: false, error: 'Team does not exist' });
            return;
        }

        if (!state.ratingSubmissions) state.ratingSubmissions = {};
        const safePayload = {
            ...(payload || {}),
            scorerTeamId: teamId,
            scorerTeamName: state.teams[teamId].name,
            roomId,
            roundNumber: state.roundNumber,
            confirmedAt: new Date().toISOString()
        };

        state.ratingSubmissions[teamId] = safePayload;
        appendLog([
            new Date().toISOString(),
            'Rating JSON Submitted',
            roomId,
            state.teams[teamId].name,
            '',
            '',
            JSON.stringify(safePayload)
        ]);

        const allTeams = Object.keys(state.teams);
        const allRated = allTeams.length > 0 && allTeams.every(tid => state.ratingSubmissions[tid]);

        if (allRated) {
            state.currentStage = 'results';
            io.to(roomId).emit('state_updated', state);
        } else {
            socket.to(roomId).emit('rating_submission_updated', {
                teamId,
                submission: safePayload,
                submittedTeamIds: Object.keys(state.ratingSubmissions),
                allRated: false
            });
        }

        if (callback) callback({ success: true, allRated, gameState: state });
    });

    socket.on('begin_pitch', ({ roomId }) => {
        const state = rooms.get(roomId);
        if (!state || state.currentStage !== 'pitch_prep') return;

        state.currentStage = 'pitch';
        state.stageTimers.pitch = { running: false, ended: false, endTime: null };
        io.to(roomId).emit('state_updated', state);
    });

    socket.on('complete_pitch', ({ roomId }) => {
        const state = rooms.get(roomId);
        if (!state || state.currentStage !== 'pitch') return;

        const order = Array.isArray(state.pitchOrder) ? state.pitchOrder : Object.keys(state.teams);
        const currentIndex = order.indexOf(state.currentPitchingTeam);
        const nextTeamId = currentIndex >= 0 ? order[currentIndex + 1] : order[0];

        state.stageTimers.pitch_prep = { running: false, ended: false, endTime: null };
        state.stageTimers.pitch = { running: false, ended: false, endTime: null };

        if (nextTeamId) {
            state.currentPitchingTeam = nextTeamId;
            state.currentStage = 'pitch_prep';
        } else {
            state.currentPitchingTeam = null;
            state.currentStage = 'voting';
        }

        io.to(roomId).emit('state_updated', state);
    });

    socket.on('skip_pitch_prep', ({ roomId }) => {
        const state = rooms.get(roomId);
        if (!state || state.currentStage !== 'pitch_prep') return;
        state.stageTimers.pitch_prep = { running: false, ended: true, endTime: Date.now() };
        state.currentStage = 'pitch';
        state.stageTimers.pitch = { running: false, ended: false, endTime: null };
        io.to(roomId).emit('state_updated', state);
    });

    socket.on('skip_pitch', ({ roomId }) => {
        const state = rooms.get(roomId);
        if (!state || state.currentStage !== 'pitch') return;
        const order = Array.isArray(state.pitchOrder) ? state.pitchOrder : Object.keys(state.teams);
        const currentIndex = order.indexOf(state.currentPitchingTeam);
        const nextTeamId = currentIndex >= 0 ? order[currentIndex + 1] : order[0];

        state.stageTimers.pitch_prep = { running: false, ended: false, endTime: null };
        state.stageTimers.pitch = { running: false, ended: true, endTime: Date.now() };

        if (nextTeamId) {
            state.currentPitchingTeam = nextTeamId;
            state.currentStage = 'pitch_prep';
        } else {
            state.currentPitchingTeam = null;
            state.currentStage = 'voting';
        }

        io.to(roomId).emit('state_updated', state);
    });

    socket.on('start_timer', ({ roomId, stageKey, endTime }) => {
        const state = rooms.get(roomId);
        if (!state) return;
        const allowedTimers = ['brainstorm', 'pitch_prep', 'pitch'];
        if (!allowedTimers.includes(stageKey)) return;

        if (!state.stageTimers) state.stageTimers = {};
        state.stageTimers[stageKey] = {
            endTime: Number(endTime),
            running: true,
            ended: false
        };

        io.to(roomId).emit('timer_started', { stageKey, endTime: Number(endTime) });
        io.to(roomId).emit('state_updated', state);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
        appendLog([new Date().toISOString(), 'Disconnected', '', '', '', '', socket.id]);
    });
});

const PORT = process.env.PORT || 3000;
initSheet().then(() => {
    server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});
