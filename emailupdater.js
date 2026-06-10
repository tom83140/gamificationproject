window.emailData = [
    // ============ Prompt 1 – Internal frustration (5 emails) ============
    {
        subject: 'Re: Q3 Deliverable Status – Missing Updates',
        from: 'Jennifer Hart, Project Manager <j.hart@evcompany.com>',
        excerpt: `Hi team,

I completely missed the email about the dashboard change last week. I wasn't in the loop on the new timeline until a customer asked me about it during our quarterly review call. It was embarrassing, and it made our entire department look disorganised.

This isn't the first time this has happened. Last month the legal team updated the warranty terms and nobody in sales knew until a customer flagged it. We need a single source of truth that every department can check before a customer-facing release.

I'm proposing a mandatory cross‑team status meeting every Monday, or at the very least a shared dashboard that shows what's changing and who's responsible for it. Can we get IT's help to set this up before the next sprint?

Best,
Jennifer`,
        keyword: 'missed the email',
        promptIndex: 0
    },
    {
        subject: 'Who changed the login flow without notifying UX?',
        from: 'Marcus Chen, UX Designer <m.chen@evcompany.com>',
        excerpt: `Hey all,

I just discovered that the login flow was changed last Thursday. I didn't know that changed until I saw the live site this morning. The new flow completely breaks the onboarding journey we designed and tested last quarter with real users.

This isn't just a minor visual tweak – it removes the progress indicator that first-time EV buyers rely on to understand where they are in the setup process. I had to redo the prototypes for the next sprint, which is going to delay our usability testing.

Who's responsible for this communication gap? We need a process where any UI change, no matter how small, gets flagged to the UX team before deployment. A simple Slack channel notification would have saved me hours of rework.

Thanks,
Marcus`,
        keyword: "I didn't know that changed",
        promptIndex: 0
    },
    {
        subject: 'Missed the email about the new pricing model – again',
        from: 'Linda Park, Sales Director <l.park@evcompany.com>',
        excerpt: `Team,

I missed the email about the pricing update until a customer told me yesterday. I wasn't in the loop on the latest discount rules, and our sales team looked completely unprepared during a demo. The customer asked if we even knew our own product.

This keeps happening between sales and finance. The last pricing change also bypassed our team, and we only found out when a contract got rejected. We need a mandatory cross‑team briefing before any pricing change goes live, not an afterthought email buried in a thread.

Can we agree that from now on, finance will present pricing updates at the weekly sales meeting? I don't care if it's a 10‑minute slot – we just need to be informed before our customers are.

Regards,
Linda`,
        keyword: "wasn't in the loop",
        promptIndex: 0
    },
    {
        subject: "Re: Deployment rollback – why wasn't I informed?",
        from: 'David Smith, Engineering Lead <d.smith@evcompany.com>',
        excerpt: `Morning,

I didn't know that changed until the CI/CD pipeline broke at 3am. The ops team rolled back a deployment but never notified anyone on my team. I wasn't in the loop, and now half the developers are fixing bugs that could have been avoided if we'd been given a heads‑up.

This is the third rollback this quarter, and every time the communication is reactive. We have a perfectly good incident management tool, but nobody uses it for non‑critical changes. I'm tired of being the last to know about changes that affect my team's work.

I'd like to propose a simple rule: any infrastructure change must be logged in the #engineering‑ops channel and tagged with the affected teams. That way, nobody can claim they weren't informed.

Cheers,
David`,
        keyword: "who's responsible for this",
        promptIndex: 0
    },
    {
        subject: 'Re: Policy update missed by entire department',
        from: 'Rebecca Torres, HR Manager <r.torres@evcompany.com>',
        excerpt: `Dear colleagues,

I didn't know that changed until someone asked me about the new remote work policy during a benefits orientation. I wasn't in the loop at all, and I looked uninformed in front of a room full of new hires. That's not the kind of first impression we want to make.

We have a policy portal, but nobody checks it because it's buried in the intranet. Important updates get missed, and then managers are surprised when employees ask about something they should have known about weeks ago.

I suggest we create a “policy digest” email that goes out every Friday, summarizing any changes from the previous week. It doesn't have to be long – just a bullet‑point list with links. If we don't do something, we'll keep playing catch‑up.

Warmly,
Rebecca`,
        keyword: 'missed the email',
        promptIndex: 0
    },

    // ============ Prompt 2 – Customer experience (5 emails) ============
    {
        subject: 'First‑time EV buyer feedback – frustrating experience',
        from: 'Olivia Grant, Customer Success <o.grant@evcompany.com>',
        excerpt: `Hi team,

A first-time EV buyer called our support line in tears yesterday. She had just driven 20 minutes to a charging station, only to find it was out of service. The app didn't reflect the real‑time status, and she couldn't find a working station nearby. Her charging anxiety is through the roof.

This isn't an isolated case. We're hearing more and more stories of new owners who feel overwhelmed by the whole charging experience. The interface is confusing, and the number of steps to start a session is ridiculous compared to just plugging in a phone.

I think we need to simplify the onboarding flow drastically. Maybe a “charge assistant” that guides first-time buyers step‑by‑step, using plain language and real‑time availability. If we don't solve this, we'll lose customers before they even finish their first charge.

Cheers,
Olivia`,
        keyword: 'charging anxiety',
        promptIndex: 1
    },
    {
        subject: 'Re: Onboarding flow is too complex – too many steps',
        from: 'Noah Kim, Product Manager <n.kim@evcompany.com>',
        excerpt: `Hey all,

Our usability test with first-time EV buyers showed something alarming: the setup wizard has too many steps, and people were dropping off before they even got to the fun part. The confusing interface and constant charging anxiety messages are scaring potential owners away.

We asked testers to describe the experience, and words like “frustrating”, “overwhelming”, and “too technical” came up repeatedly. They compared it to buying a smartphone, where everything just works out of the box. Our process is nothing like that.

I'm proposing we cut the setup flow down to three essential actions: (1) verify your account, (2) choose a home charging plan, and (3) take a virtual tour of the car. Everything else can be optional and introduced later. Let's set up a workshop with UX to map this out.

Best,
Noah`,
        keyword: 'too many steps',
        promptIndex: 1
    },
    {
        subject: 'Charging anxiety complaints surging',
        from: 'Rachel Adams, Customer Support <r.adams@evcompany.com>',
        excerpt: `Team,

I've been tracking support tickets, and charging anxiety complaints are up 40% this month. New owners are the most affected. They mention a confusing interface on the public charging map and too many steps to activate a session. Some even said they'd consider returning the car if the experience doesn't improve.

One customer said, “I just want to plug in and walk away, like I do with my phone. Why is this so complicated?” That really stuck with me. We're marketing simplicity, but delivering complexity.

I'd like to work with UX and product to create a “charge assistant” that guides users step‑by‑step through their first few charges. It could be a simple overlay in the app that walks them through finding a station, starting a session, and monitoring progress. Can we discuss this at the next sprint planning?

Thanks,
Rachel`,
        keyword: 'charging anxiety',
        promptIndex: 1
    },
    {
        subject: 'Our interface is confusing new owners',
        from: 'Tomás Reyes, UX Researcher <t.reyes@evcompany.com>',
        excerpt: `Hi all,

The latest round of user research is in, and it's not pretty. First-time EV buyers find our dashboard confusing. The confusing interface leads directly to charging anxiety because they can't easily see their battery status, find nearby stations, or understand how long a charge will take.

We tested five common tasks, and the average completion time was double what we'd expect for a consumer app. One participant said, “It feels like I need a degree in electrical engineering just to drive this car.” That's not the brand we want.

I'm recommending a complete redesign of the home screen, with the most important information (range, nearby chargers, charging speed) front and center. We also need to simplify the language – replace “kWh” with “miles added per minute” or something similarly intuitive.

Regards,
Tomás`,
        keyword: 'confusing interface',
        promptIndex: 1
    },
    {
        subject: 'Re: Lost sales due to complex purchasing process',
        from: 'Grace Lee, Marketing Director <g.lee@evcompany.com>',
        excerpt: `Team,

We just lost a potential customer because of too many steps in the purchasing process. A first-time EV buyer walked away from the online configurator after 20 minutes. She said the process was confusing, and she couldn't get a quick summary of the total cost without going through every single option.

We're seeing this pattern in our analytics: a high drop‑off rate on the configurator page. People start building their dream car but give up before they reach the checkout. This is a huge missed opportunity.

I propose we streamline the buying journey to a single page, where customers can see the base price, add options with clear cost impacts, and get an instant financing quote – all without scrolling endlessly. If we can make it as simple as ordering a phone, we'll convert more of these leads.

Thanks,
Grace`,
        keyword: 'first-time EV buyer',
        promptIndex: 1
    },

    // ============ Prompt 3 – Onboarding & tools (5 emails) ============
    {
        subject: 'Onboarding experience feedback',
        from: 'Alex Johnson, New Software Engineer <a.johnson@evcompany.com>',
        excerpt: `Hi everyone,

I've been here for three months now, and I have to be honest: the onboarding is a mess. It took me months to understand how the internal tools connect, and I still have to ask someone every time I need to deploy. There's no documentation for our custom scripts, and the codebase is a maze without a map.

My buddy has been incredibly helpful, but they're also busy with their own work. I feel guilty interrupting them multiple times a day just to figure out basic things like how to set up a local environment or which branch to merge into.

Could we invest some time in creating a proper developer wiki? Even just a few pages on the most common tasks would save new hires like me hours of confusion. I'm happy to help write up what I've learned so far.

Thanks,
Alex`,
        keyword: 'took me months to understand',
        promptIndex: 2
    },
    {
        subject: 'Re: Missing documentation for internal tools',
        from: 'Priya Patel, HR Coordinator <p.patel@evcompany.com>',
        excerpt: `Dear all,

New hires keep telling me there's no documentation for the legacy systems they need to use from day one. They had to ask someone every time they hit a roadblock, and the onboarding is a mess because we rely entirely on tribal knowledge.

One new employee told me she spent her first two weeks just trying to figure out who to ask for what. That's not a great start, and it makes us look unprofessional. The frustration is showing up in our engagement surveys, too.

I'd like to propose creating a centralized onboarding wiki, with step‑by‑step guides for every tool and process. It doesn't have to be perfect – we can start small and build it out over time. But we need something more than a welcome email and a prayer.

Regards,
Priya`,
        keyword: 'no documentation',
        promptIndex: 2
    },
    {
        subject: 'New hire kept asking me questions',
        from: 'Carlos Mendez, Senior Developer <c.mendez@evcompany.com>',
        excerpt: `Hi,

When I joined three years ago, I had to ask someone every time I needed something. Now I'm that person for the new hire on my team. It took me months to understand our codebase, and I'm watching the same struggle play out again.

I don't mind mentoring, but it's draining when the questions are about things that should be documented. The onboarding is a mess, and it's costing us productivity. I spend at least an hour a day just answering setup questions.

What if we created a structured onboarding program with sandbox environments, so new hires can experiment without fear of breaking something? And a checklist of key resources they need to be aware of in their first week. I'd be happy to lead this initiative if we can allocate some time for it.

Cheers,
Carlos`,
        keyword: 'had to ask someone every time',
        promptIndex: 2
    },
    {
        subject: 'Re: Ramp‑up time for new team members',
        from: 'Hannah Lee, Team Lead <h.lee@evcompany.com>',
        excerpt: `Team,

It took me months to understand our deployment process when I first joined, and I see new members going through the exact same pain. There's no documentation for the CI/CD pipeline, and the onboarding is a mess. We're setting people up for failure.

I just onboarded a new developer, and it took her three weeks just to get her local environment running. That's three weeks of lost productivity because we don't have clear setup guides. It's not her fault – it's ours.

I'm proposing a buddy system where every new hire is paired with someone from a different team for their first month. They'd still have their main team, but the buddy can help with cross‑team questions and introduce them to other departments. Plus, we need a knowledge base that's actually maintained.

Best,
Hannah`,
        keyword: 'took me months to understand',
        promptIndex: 2
    },
    {
        subject: 'Onboarding process is broken',
        from: 'Daniel Wright, IT Support <d.wright@evcompany.com>',
        excerpt: `Hi all,

The onboarding is a mess from an IT perspective. We create accounts manually, and there's no documentation for new hires about accessing shared drives, VPNs, or the dozens of internal tools they need. They had to ask someone every time they got stuck, which means they're constantly contacting IT support.

This isn't scalable. We're onboarding five to ten people a month now, and each one generates dozens of tickets just for basic access issues. It's a waste of everyone's time.

I'd like to propose an automated onboarding portal. When a new hire joins, they'd receive a link that walks them through everything: account setup, permissions, tool introductions, and key contacts. It could be built on our existing intranet and would save us hours every week.

Thanks,
Daniel`,
        keyword: 'onboarding is a mess',
        promptIndex: 2
    },

    // ============ Prompt 4 – Data & decisions (5 emails) ============
    {
        subject: 'Re: Monthly sales report delayed again',
        from: 'Sarah Lee, Data Analyst <s.lee@evcompany.com>',
        excerpt: `Hi,

We have the data but the reports take too long because we're still stitching spreadsheets together manually. By the time we know something is off, it's too late to adjust. Last month, we discovered a 15% drop in a key region two weeks after it started.

The leadership team is making decisions on gut feeling instead of real‑time insights, and I can't blame them – they don't have the numbers when they need them. Our current process is too slow and too error‑prone.

I'm requesting two days of engineering support to set up a basic data pipeline that can generate daily sales summaries automatically. Even a simple PDF report delivered to inboxes every morning would be a huge improvement over what we have now.

Regards,
Sarah`,
        keyword: 'reports take too long',
        promptIndex: 3
    },
    {
        subject: "We're still making decisions on gut feeling",
        from: 'Mark Davis, VP Sales <m.davis@evcompany.com>',
        excerpt: `Team,

I'll be blunt: we're relying too much on gut feeling, and it's costing us. We have the data but we can't access it quickly enough, so we end up making pricing decisions based on intuition rather than evidence.

Last quarter, we ran a campaign that we thought was performing well, but when the numbers finally came in, we'd actually lost money on it. By the time we knew, it was too late to pull the plug. That can't happen again.

I want us to invest in a real‑time dashboard that shows campaign performance, sales trends, and customer acquisition costs. If we can see the numbers as they happen, we can pivot on the same day instead of waiting for a monthly report. Can IT help us scope this?

Thanks,
Mark`,
        keyword: 'gut feeling',
        promptIndex: 3
    },
    {
        subject: 'Re: Feature prioritization data needed urgently',
        from: 'Emily Tran, Product Manager <e.tran@evcompany.com>',
        excerpt: `Hi all,

We have the data but by the time we know which feature is performing well, it's too late to allocate resources. The analytics reports take too long, and we're forced to rely on gut feeling when deciding what to build next.

A recent example: we thought our new charging‑station finder was a hit, but three weeks later the data showed hardly anyone was using it. By then, we'd already committed two sprints to refining it. If we'd had real‑time data, we could have pivoted much earlier.

I'm proposing we implement a self‑service BI tool that product managers can query directly, without waiting for the data team. Something simple like Metabase or Looker that connects to our existing databases. It would speed up decision‑making dramatically.

Cheers,
Emily`,
        keyword: "by the time we know it's too late",
        promptIndex: 3
    },
    {
        subject: 'Re: Dashboard update timeline',
        from: 'Kevin Park, Data Engineering <k.park@evcompany.com>',
        excerpt: `Team,

We have the data but reports take too long because our data warehouse isn't optimized for the queries marketing runs. Every time they ask for a new report, it takes us days to pull together. Marketing complains they can't act on time, and by the time we know a campaign is underperforming, it's too late to fix it.

I've been saying for months that we need to refactor the ETL pipeline. Right now it's a patchwork of scripts that nobody fully understands. Two dedicated engineers could clean it up in a month, but we keep getting pulled into other priorities.

If this really matters to the company – and I think it does – we need to make it a formal project, not a side task. Can we get buy‑in from leadership to allocate resources?

Thanks,
Kevin`,
        keyword: 'reports take too long',
        promptIndex: 3
    },
    {
        subject: 'Campaign performance data is stale',
        from: 'Laura Simmons, Marketing Analyst <l.simmons@evcompany.com>',
        excerpt: `Hi,

By the time we know a campaign is failing it's too late. We have the data but the reports take too long to generate, so we're making last‑minute changes based on gut feeling. Our latest email campaign was running for a week before we saw the open rates – a week!

The data team is doing their best, but the process is broken. I'm spending more time chasing reports than actually analyzing them. And when I do get them, the insights are already old.

I'd love to see automated alerts that trigger when key metrics drop below a threshold. That way, we can intervene in real time instead of waiting for a scheduled report. Is this something we can explore with the engineering team?

Thanks,
Laura`,
        keyword: "by the time we know it's too late",
        promptIndex: 3
    },

    // ============ Prompt 5 – Collaboration (5 emails) ============
    {
        subject: 'Re: Customer feature request got lost again',
        from: 'Michael Brown, Sales Manager <m.brown@evcompany.com>',
        excerpt: `Hey all,

A great customer idea never reached engineering – it's still sitting in my inbox. The request was for a battery‑health notification feature that several fleet managers have asked for, but by the time it reached us, two of those customers had already signed with a competitor.

This happens because we're still siloed. Sales talks to customers, but that feedback doesn't flow to engineering or UX. We need a shared pipeline where ideas from the field can be seen and discussed by all teams. I'm not asking for a complex system – even a shared Trello board would be a huge improvement.

Can we set up a monthly cross‑team meeting where sales, engineering, and UX review incoming feature requests together? That way, nothing gets lost in someone's inbox.

Best,
Michael`,
        keyword: 'siloed',
        promptIndex: 4
    },
    {
        subject: "Why wasn't UX involved in the new dashboard?",
        from: 'Jessica Wong, UX Lead <j.wong@evcompany.com>',
        excerpt: `Team,

We had no idea they were working on that dashboard until it was already in production. The design has major accessibility issues – contrast ratios are off, the navigation is confusing, and it doesn't follow our established patterns. Now we have to rework it from scratch.

This is the third time this year that a product has been built without UX input. It's wasteful and it creates a poor experience for our customers. The engineering team isn't trying to bypass us – they just don't have a clear process for involving UX early.

I'm proposing a weekly sync between engineering and UX, even if it's just 15 minutes, to review what's being worked on and flag anything that needs design input. Let's stop building in silos.

Thanks,
Jessica`,
        keyword: 'we had no idea they were working on that',
        promptIndex: 4
    },
    {
        subject: "That's not my department, but…",
        from: 'Ryan Kim, Engineering Manager <r.kim@evcompany.com>',
        excerpt: `Hi,

A customer complaint about our mobile app came through support, but I was told “that's not my department” and it got passed around for weeks before landing in my inbox. By the time it reached us, the customer had already posted a negative review online.

The problem is that nobody owns cross‑functional issues. The support team doesn't know who to escalate to, and the engineering team doesn't monitor support tickets. We need clear ownership rules so nothing falls between the cracks.

I suggest we create a simple “triage” process: when a ticket comes in that spans multiple teams, a designated person assigns it to the right owner within 24 hours. No more “that's not my department.”

Cheers,
Ryan`,
        keyword: "that's not my department",
        promptIndex: 4
    },
    {
        subject: 'Re: Cross‑team collaboration breakdown',
        from: 'Susan Park, Product Director <s.park@evcompany.com>',
        excerpt: `All,

We're still siloed in ways that hurt our speed and quality. Marketing launches campaigns without telling sales, so the sales team is surprised when leads come in asking about promotions they didn't know about. Engineering builds features UX hasn't reviewed, and we end up reworking them.

We had no idea they were working on that new referral program until it was live. It's a great program, but it wasn't tested with real users, and we had to scramble to fix the onboarding flow. That could have been avoided with a simple cross‑functional showcase.

I'm proposing a monthly “show and tell” where every team shares what they're working on for the next month. It doesn't have to be formal – just a 30‑minute session over Zoom. The goal is to surface overlaps and dependencies early, before they become problems.

Regards,
Susan`,
        keyword: 'siloed',
        promptIndex: 4
    },
    {
        subject: "Engineering fixed a bug we didn't report",
        from: 'Eric Johnson, Customer Support <e.johnson@evcompany.com>',
        excerpt: `Hi,

We had no idea they were working on that login issue, but apparently engineering got wind of it from a stray Slack message. That's lucky, but it also shows how siloed our information is. The bug had been affecting users for weeks, and we never formally reported it because we didn't have a clear channel.

Support teams hear about problems first, but that feedback rarely reaches the people who can fix them. We need a better way to surface pain points from the front lines to the development teams.

What if we set up a simple “Voice of the Customer” channel where support can flag recurring issues and engineering can subscribe? Something lightweight but visible. I'm sure we'd prevent a lot of frustration on both sides.

Thanks,
Eric`,
        keyword: 'we had no idea they were working on that',
        promptIndex: 4
    },

    // ============ Prompt 6 – Sustainability pressure (5 emails) ============
    {
        subject: 'Re: Employee survey on sustainability engagement',
        from: 'Anna Lee, Sustainability Manager <a.lee@evcompany.com>',
        excerpt: `Dear all,

The employee engagement survey results are in, and the feedback on sustainability is sobering. Most employees feel that we talk about it but nothing changes. They see the company's climate pledges as just marketing speak, and they don't feel connected to the goals.

This is a huge missed opportunity. Our employees are passionate about the environment – that's why many of them joined an EV company. But without visible progress, that passion turns to cynicism. We need to make our sustainability efforts tangible.

I'm proposing a “green team” in every department. Each team would have one volunteer who acts as a sustainability champion, sharing updates, collecting ideas, and helping their colleagues see how their daily work connects to our carbon‑reduction targets. This isn't a huge time commitment, but it would make a real difference in engagement.

Best,
Anna`,
        keyword: 'we talk about it but nothing changes',
        promptIndex: 5
    },
    {
        subject: 'How does my job help the environment?',
        from: 'Tom Harris, Assembly Technician <t.harris@evcompany.com>',
        excerpt: `Hi,

I've been with the company for two years, and I still don't see how my job connects to it. I build battery packs all day, and I know they go into electric vehicles, but nobody explains how that reduces emissions or what the bigger picture is. The company talks about sustainability, but it feels like just marketing speak to me.

I want to be proud of the work I do. I want to know that the battery packs I assemble are helping to reduce carbon emissions. But right now, I just feel like a cog in a machine.

Could we put a dashboard on the factory floor showing our real‑time carbon savings? Something that says “This week, the packs you built will save X tons of CO2 compared to gasoline cars.” That would make me feel connected to the mission.

Thanks,
Tom`,
        keyword: "I don't see how my job connects to it",
        promptIndex: 5
    },
    {
        subject: 'Employees say sustainability is just marketing speak',
        from: 'Rachel Green, Communications <r.green@evcompany.com>',
        excerpt: `Team,

I ran a focus group with employees across different departments, and the message was consistent: they think our sustainability goals are just marketing speak. They hear we talk about it but nothing changes, and they can't point to a single action the company has taken that made them feel involved.

This is a communications failure, but also a substantive one. We need to translate our high‑level goals into concrete, visible actions that every team can see and contribute to. People need to feel like they're part of the solution, not just spectators.

I suggest we launch a monthly “Sustainability Spotlight” newsletter that highlights specific projects, from the factory floor to the boardroom, and profiles employees who are driving change. That way, people see real progress and feel motivated to get involved.

Regards,
Rachel`,
        keyword: 'just marketing speak',
        promptIndex: 5
    },
    {
        subject: 'Re: Concrete sustainability actions?',
        from: 'Daniel Kim, Software Engineer <d.kim@evcompany.com>',
        excerpt: `Hi,

I keep hearing about our climate targets in company meetings, but what are we actually doing? I'd like to know how the code I write reduces the carbon footprint of our vehicles. Right now it feels like we talk about it but nothing changes on my day‑to‑day work.

I'm not asking for a medal, but some transparency would be nice. If our software optimizes battery charging and that saves energy, tell me how much. If we're working on a feature that helps drivers reduce their carbon footprint, let me know so I can feel good about the impact.

Maybe the engineering team could start a “green code” initiative where we track the environmental impact of our features. Even something simple like a dashboard showing the estimated CO2 savings from our work would make a difference.

Cheers,
Daniel`,
        keyword: 'what are we actually doing',
        promptIndex: 5
    },
    {
        subject: 'Re: Linking sustainability to performance reviews',
        from: 'Lisa Chen, HR Director <l.chen@evcompany.com>',
        excerpt: `Dear colleagues,

We talk about it but nothing changes because sustainability isn't tied to anyone's performance goals. Employees don't see how their job connects to it, and there's no incentive for them to care beyond personal values.

I've been thinking about this from an HR perspective. What if we added a “green contribution” metric to annual reviews? It wouldn't have to be a big part of the score – maybe 5% – but it would signal that the company takes sustainability seriously and expects everyone to contribute in some way.

This could also help with recruitment. Candidates are increasingly asking about our environmental record, and we could point to this policy as evidence that we walk the talk. I'd like to discuss this with the leadership team at the next strategy meeting.

Warmly,
Lisa`,
        keyword: 'we talk about it but nothing changes',
        promptIndex: 5
    }
];

window.prompts = [
    {
        id: 0,
        title: 'Automation Excellence',
        description: 'How can we better complete automation code management and visualization across all engineering teams?',
        introduction: 'Our internal tools and processes are scattered, leading to duplicated effort, miscommunication, and slow deployment cycles. Teams waste time searching for information that should be centralized and automated.',
        icon: 'AUTO',
        color: '#06b6d4'
    },
    {
        id: 1,
        title: 'Charging Trust',
        description: 'How can we improve electric vehicle charging reliability and customer trust without increasing infrastructure costs?',
        introduction: 'First‑time EV buyers face confusing interfaces and charging anxiety. The experience of owning an electric car should be as seamless as charging a smartphone, yet our customers report too many steps and unclear information.',
        icon: 'EV',
        color: '#f97316'
    },
    {
        id: 2,
        title: 'Radical Transparency',
        description: 'How can we build a transparency‑first data ecosystem that earns customer trust and differentiates our brand?',
        introduction: 'New employees struggle with a messy onboarding process, lack of documentation, and reliance on tribal knowledge. We need to provide clear, accessible resources so that everyone can contribute from day one.',
        icon: 'DATA',
        color: '#10b981'
    },
    {
        id: 3,
        title: 'Battery Longevity',
        description: 'How can software solutions optimize battery performance and extend lifespan while reducing range anxiety?',
        introduction: 'Despite collecting vast amounts of data, reports take too long to generate, and decisions are often made on gut feeling. We must turn our existing data into real‑time insights that drive faster, smarter decisions.',
        icon: 'BATT',
        color: '#8b5cf6'
    },
    {
        id: 4,
        title: 'Smart AI Routing',
        description: 'How can AI‑powered routing transform our service operations and customer support experience?',
        introduction: 'Teams operate in silos, and great ideas get lost between departments. Sales, engineering, and UX rarely collaborate early enough, leading to rework and missed opportunities. We need to break down these walls to innovate faster.',
        icon: 'AI',
        color: '#ec4899'
    },
    {
        id: 5,
        title: 'Sustainability Pressure',
        description: 'How can we make our sustainability goals visible and meaningful to every employee, not just the leadership team?',
        introduction: 'Employees hear about our climate pledges but rarely see tangible progress. Sustainability feels disconnected from their daily work, leading to cynicism and disengagement. We need to embed our green goals into everyday operations and make them personal.',
        icon: 'ECO',
        color: '#2ecc71'
    }
];
