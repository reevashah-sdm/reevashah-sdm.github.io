window.PORTFOLIO_DATA=(function(){
const emo = (v, e) => {
      const hot = /Anxious|Disappointed/.test(e), warm = /Happy|Hopeful/.test(e);
      return { v: v + '%', e, bg: hot ? 'var(--color-accent)' : warm ? 'var(--color-accent-200)' : 'var(--color-surface)', fg: hot ? '#fff' : 'var(--color-text)' };
    };
    const lane = (t, s, c, bg, fg, line) => ({ t, s, c, bg, fg, line });
    
return {
      
      trends: ['Urbanization and Mobility', 'Changing Relationship Norms', 'Mobile-First Behaviour', 'Artificial Intelligence', 'Trust and Safety'],
      eras: [
        { y: 'PRE-1900', t: 'Community & Family Matchmaking', d: 'Trust-based, socially mediated' },
        { y: '1900–1980', t: 'Marriage Bureaus', d: 'Formal matchmaking, human intermediaries' },
        { y: '1980–2005', t: 'Newspaper Matrimonials', d: 'Geographic expansion, classified advertisements' },
        { y: '1995–2010', t: 'Online Matrimonial Platforms', d: 'Digital profiles, searchable databases' },
        { y: '2012–2016', t: 'Swipe-Based Dating Apps', d: 'Mobile-first, instant discovery' },
        { y: '2016–PRESENT', t: 'Behaviour-Driven Matchmaking', d: 'AI recommendations, compatibility-focused' }
      ],
      pillars: [
        { n: '01', t: 'Relationship centric philosophy', d: 'Hinge is designed around fostering long term relationships rather than maximizing the number of matches.' },
        { n: '02', t: 'Smart recommendations', d: 'The platform continuously learns from user interactions to personalize match suggestions, illustrating the integration of AI into service delivery.' },
        { n: '03', t: 'Conversation first model', d: 'Users engage by liking or commenting on specific profile elements, promoting more intentional and contextual conversations.' },
        { n: '04', t: 'Trust & safety mechanisms', d: 'Profile verification, reporting systems and moderation contribute to building trust within a digital environment where users interact with strangers.' },
        { n: '05', t: 'Service complexity', d: 'Hinge functions not only as a mobile application but also as a socio-technical system involving users, algorithms, moderators, data infrastructure, safety protocols and business strategy.' }
      ],
      market: [
        { t: 'Community campaigns', items: ['“Awkward, Together”: guide to embracing awkward dating moments', '“One More Hour”: funding grants for real-world community events', 'Nostalgia-driven brand content (“Do you miss the old internet?”)'] },
        { t: 'Market share & penetration', items: ['Positioned as the fastest-growing app in the intentional-dating segment', 'Competitive research tracks penetration against Tinder/Bumble by city tier', 'Ad messaging leans on “the dating app designed to be deleted”'] },
        { t: 'The Hinge difference framing', items: ['Matching algorithm, interface, and community values positioned as deliberately distinct from swipe-first competitors', 'Marketing consistently reinforces intentionality over volume'] }
      ],
      compare: [
        { p: 'Primary user goal & success metric', h: 'Find a serious relationship; successful relationships and quality conversations', t: 'Meet new people (casual to serious); matches, engagement, retention', b: 'Meaningful dating with greater safety and control; respectful conversations and successful matches' },
        { p: 'Target audience & design philosophy', h: 'Millennials, Gen Z professionals seeking committed relationships. Quality over quantity', t: 'Broad audience across casual and serious dating. Quantity and speed', b: 'Users seeking respectful interactions, especially women. Safety + empowerment' },
        { p: 'Profile depth & interaction model', h: 'High (prompts, preferences, personality); prompt-based profiles with intentional likes', t: 'Low–moderate; swipe-based matching', b: 'Moderate; swipe-based, women message first (heterosexual matches)' },
        { p: 'Monetization', h: 'Hinge+, HingeX, Roses', t: 'Tinder Plus, Gold, Platinum, Boosts, Super Likes', b: 'Bumble Premium, Premium+, Spotlight, Compliments' },
        { p: '2025 revenue & growth', h: 'US$690.9M · +26% YoY', t: 'US$1.863B · −4% YoY', b: 'US$783.0M · −9.6% YoY' },
        { p: 'Paying users & monthly ARPPU (2025)', h: '1.801M · US$31.97', t: '9.026M · US$17.20', b: '2.4M · US$26.80' },
        { p: 'India positioning', h: 'Growing among urban professionals seeking serious relationships', t: 'Highest awareness and largest user base', b: 'Popular among metro-city users seeking safer dating' },
        { p: 'Competitive advantage', h: 'AI-powered compatibility, deeper profiles, relationship-focused brand', t: 'Massive network effects, largest dating pool, global reach', b: 'Women-first experience and safety differentiation' },
        { p: 'Key challenge', h: 'Smaller network in emerging markets', t: 'Swipe fatigue, declining paid users, casual dating perception', b: 'Slower growth and declining paid subscribers' }
      ],
      ages: [['18–20 years', 8.9], ['21–24 years', 50], ['25–29 years', 38.9], ['30–34 years', 1.1], ['35 and above', 1.1]].map(([l, v]) => ({ l, v: v + '%', w: v + '%' })),
      orient: [['Heterosexual', 68.9], ['Bisexual', 15.6], ['Prefer not to say', 6.7], ['Homosexual', 5.6], ['Pansexual', 3.2]].map(([l, v]) => ({ l, v: v + '%', w: v + '%' })),
      stake: [
        { t: 'PRIMARY', items: ['Free-tier users', 'Paying subscribers', 'New sign-ups / onboarding', 'Active daters', 'Users who go on real dates', 'Customer support agents'] },
        { t: 'SECONDARY', items: ['Reported / blocked users', 'Trust & safety / moderation', 'Identity verification partners', 'Background-check partners', 'AI feature systems (feedback loops)', 'Referral / invite contacts', 'App store providers (Google, Apple)'] },
        { t: 'TERTIARY', items: ['Friends & family of users', 'Users who abandoned the app', 'Cross-app daters (Tinder overlap)', 'Non-users affected indirectly (misuse)', 'Regulators & compliance bodies'] }
      ],
      clusters: [
        { t: 'Hopeful cluster', img: 'assets/esd/r17.png', m: [{ l: 'Hope of meeting someone meaningful', v: '61%' }, { l: 'Wanting serious dating', v: '28%' }, { l: 'Ongoing chats', v: '18%' }] },
        { t: 'Low mood cluster', img: 'assets/esd/r19.png', m: [{ l: 'Boredom & loneliness', v: '46%' }, { l: 'Exploring self', v: '28%' }, { l: 'Fear of missing out', v: '19%' }] },
        { t: 'Curious cluster', img: 'assets/esd/r18.png', m: [{ l: 'Curiosity', v: '51%' }, { l: 'Meeting new people', v: '50%' }, { l: 'Friends’ recommendation', v: '27%' }] }
      ],
      journey: [
        { n: '01', t: 'Discovery & Onboarding', s: ['Download', 'Core Setup', 'Identity Verification'] },
        { n: '02', t: 'Preference Calibration', s: ['Basic Filters', 'Dealbreakers', 'Vitals & Virtues', 'Algorithm Seeding'] },
        { n: '03', t: 'The Discovery Loop', s: ['Profile Evaluation', 'Targeted Engagement', 'Scarcity Gate', 'Premium Review'] },
        { n: '04', t: 'Match Interactions', s: ['The Match', 'Icebreaker Phase', 'Nudging'] },
        { n: '05', t: 'Transition & Evaluation', s: ['Off-App Pivot', 'The First Date', '“We Met” Feedback'] },
        { n: '06', t: 'Offboarding', s: ['Account Pausing', 'App Deletion'] }
      ],
      behaviour: [
        { t: 'Choice overload', v: '68', u: 'out of 90 skip on empty profiles alone', d: 'An unbounded discovery feed makes every profile feel disposable next to the next one.' },
        { t: 'Trust building', v: '63', u: 'percentage cite photos as a like-driver', d: 'Verified profiles and photos dominate what earns a like; trust is established visually, fast.' },
        { t: 'Decision fatigue', v: '20', u: 'participants report feeling “drained” post date', d: '“Drained” is named at every journey stage, peaking after the first date.' },
        { t: 'Ghosting', v: '25', u: 'users report disappointment after the first date', d: 'Disappointment triples between starting a chat and after a first date, the silent-exit point.' },
        { t: 'Social proof', v: '27', u: 'percentage installed via friend referral', d: 'Friends’ recommendations and verified badges act as second-hand trust signals for new users.' },
        { t: 'Impression management', v: '52', u: 'percentage skip on offensive prompts', d: 'Prompts function as curated self-presentation; poor or offensive prompts trigger instant skips.' },
        { t: 'Validation seeking', v: '48', u: 'percentage report “happy” on receiving a like', d: 'Receiving a like is the single most positive moment in the journey; happiness spikes sharply.' },
        { t: 'Cognitive load', v: '09', u: 'competing “like” factors surveyed', d: 'Compatibility signals (interests, career, values) compete with surface traits in every decision.' }
      ],
      concerns: [['Safety while meeting', 66.7], ['Fake profiles', 65.6], ['Catfishing', 62.2], ['Harassment', 51.1], ['Scams', 50], ['Privacy', 27.8], ['Judgement', 18.9], ['Rejection', 14.4], ['Others', 6.6]].map(([l, v]) => ({ l, v: v + '%' })),
      stages: ['Creating profile', 'Waiting for matches', 'Receiving a like', 'Starting a chat', 'Planning a date', 'After a first date'],
      emotions: [
        { g: 'FEMALE', c: [emo('37.3', 'Curious'), emo('39.0', 'Curious'), emo('49.2', 'Happy'), emo('37.3', 'Curious'), emo('45.8', 'Anxious'), emo('28.8', 'Disappointed')] },
        { g: 'MALE', c: [emo('31.0', 'Curious'), emo('34.5', 'Hopeful'), emo('44.8', 'Happy'), emo('41.4', 'Happy'), emo('44.8', 'Hopeful'), emo('44.8', 'Curious')] }
      ],
      breaks: [
        { v: '67%', t: 'Safety while meeting', d: 'Respondents flag this, top concern overall.', o: 'Pre-date safety rituals, verified meet-up windows' },
        { v: '50%', t: 'Scams', d: 'List scams among their concerns.', o: 'In-app scam pattern detection & warnings' },
        { v: '66%', t: 'Premium fatigue', d: 'Subscription pressure affects experience.', o: 'Value-driven premium adoption' },
        { v: '38%', t: 'Poor recommendations', d: 'Skip-triggers (goals/values mismatch) affect 38%+ of decisions.', o: 'Transparent “why you’re seeing this profile” signal' },
        { v: '62%', t: 'Catfishing', d: 'Concerned specifically about identity misrepresentation.', o: 'Real-time selfie verification badges on profile' },
        { v: '20%', t: 'Low match quality', d: 'Cite low matches as a reason for deleting the app.', o: 'Compatibility depth over volume of daily picks' },
        { v: '28%', t: 'Ghosting', d: 'Disappointment mentions rise from 7% (chat) to 28% (post-date).', o: 'Low-pressure “not feeling it” close-out replies' },
        { v: '36%', t: 'Conversation fatigue', d: 'Delete from burnout; “drained” grows across every stage.', o: 'Conversation-starter prompts, lighter-weight chat' }
      ],
      insights: [
        { k: 'MOMENT OF TRUTH', v: '+52', t: 'Receiving a like is the peak, and it’s a cliff after', d: 'Net sentiment swings from +52 at “receiving a like” to −18 “after a first date.” No other single transition in the journey moves that far.' },
        { k: 'CRITICAL INCIDENT', v: '71%', t: 'Deletion is rarely a happy ending', d: 'Only 29% of app deletions follow “found someone.” The rest are burnout, time cost, low match quality, or bad experiences. Deletion is usually a symptom, not a success.' },
        { k: 'SERVICE GAP', v: '24%', t: 'Safety confidence is the widest gap in the service', d: 'Only 24% feel safe or very safe meeting a match, while safety-while-meeting is the #1 stated concern (67%).' },
        { k: 'HIDDEN OPPORTUNITY', v: '38%', t: 'Skip-signals are an underused compatibility layer', d: 'Different relationship goals and value mismatches drive over a third of skips; this signal could feed recommendation transparency, not just rejection.' },
        { k: 'BEHAVIOUR PATTERN', v: '3x', t: 'Disappointment triples after chat begins', d: 'From 7% of mentions at “starting a chat” to 28% “after a first date”: the conversation-to-date bridge is where trust most often breaks.' },
        { k: 'MAJOR FINDING', v: '94%', t: 'Deletion is a habit, not a decision', d: 'Nearly every respondent has deleted the app at least once, and 52% have done so multiple times. The “designed to be deleted” narrative is more cyclical than final.' }
      ],
      gaps: [
        { n: 'GAP 01', t: 'Premium fatigue', d: 'Users may experience fatigue when access to visibility, discovery, or interaction is increasingly associated with paid features. The value of a service becomes difficult to distinguish from the effort required to use it.' },
        { n: 'GAP 02', t: 'Transition gap', d: 'Moving from discovering someone to initiating a conversation, developing familiarity, and sustaining a connection can be difficult. The transition between these stages may create uncertainty and disengagement.' },
        { n: 'GAP 03', t: 'Non-intentional users', d: 'Not everyone using a social or dating platform has a clearly defined romantic objective. Some users may be seeking conversation, entertainment, curiosity, emotional support, or a sense of presence.' }
      ],
      questions: ['What motivates people to seek companionship?', 'What emotional state precedes the search?', 'What makes an interaction feel safe and worthwhile?', 'What causes people to withdraw from connection?', 'What forms of companionship do people actually value?'],
      principles: [
        { n: '1', t: 'Create accessible entry points into human connection.' },
        { n: '2', t: 'Facilitate conversations through shared interests, and storytelling.' },
        { n: '3', t: 'Support emotional expression without imposing expectations.' },
        { n: '4', t: 'Enable users to discover compatible companions at their own pace.' },
        { n: '5', t: 'Build trust through anonymity, consent, and user-controlled interaction.' }
      ],
      forms: [
        { k: 'FAMILY', img: 'assets/nsd/n06.png', d: 'You pick a companion from family, they are mostly your siblings or cousins like…', who: 'Sherlock Holmes and Enola Holmes' },
        { k: 'FRIENDS', img: 'assets/nsd/n05.png', d: 'You make a companion from the spaces you share with people, we call them friends like…', who: 'Penelope and Eloise' },
        { k: 'PARTNERS', img: 'assets/nsd/n04.png', d: 'You choose a companion to spend your life with, they are your romantic partners like…', who: 'Spiderman and MJ' }
      ],
      people: ['Married', 'Single', 'Long term relationship', 'Intentional short term relationship', 'Separated', 'Transitioner', 'Students', 'Office employees'],
      phases: [
        { t: 'Entry', d: 'What triggers the desire to connect? What expectations does the user bring?' },
        { t: 'Participation', d: 'What makes a conversation comfortable, engaging, safe, or meaningful?' },
        { t: 'Exit', d: 'Why do users disengage, stop responding, or seek another interaction?' }
      ],
      dims: [
        { t: 'Presence', k: 'PRIMARY', d: 'The reassurance of having someone available, even without constant conversation.', q: '“I don’t have to be alone with this.”' },
        { t: 'Comfort', k: 'PRIMARY', d: 'Emotional reassurance and a space to express feelings without immediately needing a solution.', q: '“I don’t have to deal with this entirely by myself.”' },
        { t: 'Belonging', k: 'PRIMARY', d: 'Feeling accepted as part of a group, community, or shared experience.', q: '“There is a place where I fit.”' },
        { t: 'Understanding', k: 'PRIMARY', d: 'Feeling heard beyond surface-level interaction, with one’s perspective and experiences acknowledged.', q: '“I feel understood.”' },
        { t: 'Exploration', k: 'ADDITIONAL', d: 'Discovering new interests, perspectives, activities, and experiences with another person.', q: '“I have someone with whom life can be experienced.”' },
        { t: 'Intimacy', k: 'ADDITIONAL', d: 'Developing familiarity, closeness, and emotional depth at a mutually comfortable pace.', q: '“I am important to this person, and they matter to me.”' },
        { t: 'Validation', k: 'ADDITIONAL', d: 'Receiving acknowledgement that one’s feelings, thoughts, and experiences are worthy of attention.', q: '“What I feel and experience matters to someone.”' },
        { t: 'Safety', k: 'ADDITIONAL', d: 'Having control over vulnerability, boundaries, disclosure, and disengagement.', q: '“I can be myself without constantly protecting myself.”' }
      ],
      drivers: [
        { n: '01', t: 'People', d: 'The desire to find someone whose presence and personality make interaction worthwhile.' },
        { n: '02', t: 'Compatibility', d: 'The importance of shared interests, conversational styles, values, humour, and expectations.' },
        { n: '03', t: 'Contextually safe space', d: 'The ability to participate without fear of judgement, unwanted pressure, or inappropriate disclosure.' },
        { n: '04', t: 'Accessibility', d: 'The ability to find and interact with a companion when the need arises, without excessive effort or barriers.' },
        { n: '05', t: 'Trust', d: 'Confidence that boundaries will be respected, personal information will be protected, and participation remains voluntary.' }
      ],
      deep: [
        { t: 'Self-expression', s: 'The freedom to open up', d: 'When people feel comfortable expressing their thoughts, emotions, and experiences without needing to filter themselves, conversations become more honest, personal, and meaningful.' },
        { t: 'Trust', s: 'The confidence to be vulnerable', d: 'Trust reduces the fear of judgement, rejection, or unwanted disclosure.' },
        { t: 'Validation', s: 'The feeling of being heard', d: 'When someone acknowledges our feelings and experiences, we feel that what we share matters.' },
        { t: 'Intimacy', s: 'The comfort of emotional closeness', d: 'Conversations can move from everyday updates to personal memories, fears, aspirations, and feelings.' },
        { t: 'Understanding', s: 'The experience of being understood', d: 'When someone listens attentively, people feel recognised beyond their words.' }
      ],
      archetypes: [
        { n: '01', t: 'The Silent Survivor', q: '“I don’t want to trouble anyone.”', img: 'assets/nsd/n23.png', like: 'Rizwan Khan, from My Name is Khan', o: 'A person who has gradually stopped seeking companionship, not necessarily because they prefer solitude, but because repeated disappointment or emotional neglect has made reaching out difficult.', needs: 'Emotional safety, non-judgement, gentle reassurance, and the freedom to disclose at their own pace.', pain: 'Fear of being a burden, difficulty asking for help, and uncertainty about whether others will respond.' },
        { n: '02', t: 'The Midnight Chatter', q: '“I just need someone to talk to.”', img: 'assets/nsd/n22.png', like: 'Geet Dhillon from Jab We Met', o: 'A person who actively seeks companionship when thoughts, boredom, or emotional intensity become difficult to manage alone.', needs: 'Availability, empathy, active listening, and emotionally compatible conversations.', pain: 'Ghosting, inconsistent communication, superficial conversations, and emotional burnout.' },
        { n: '03', t: 'The Selective Independent', q: '“I’m okay alone, but I value meaningful people.”', img: 'assets/nsd/n25.png', like: 'Rana Chaudhary from Piku', o: 'A person who is comfortable with solitude but values companionship when the interaction feels relevant and worthwhile.', needs: 'Compatibility, intellectual stimulation, shared values, and emotionally mature interactions.', pain: 'Forced conversations, superficial interactions, and relationships that demand excessive attention.' },
        { n: '04', t: 'The Transition Navigator', q: '“My existing social world has changed.”', img: 'assets/nsd/n24.png', like: 'Emily Cooper from Emily in Paris', o: 'A person experiencing loneliness because a major life transition has disrupted their familiar social environment.', needs: 'Belonging, shared experiences, routine, and opportunities for repeated interaction.', pain: 'Isolation, unfamiliar environments, loss of existing support systems, and difficulty finding people with similar experiences.' }
      ],
      musicFlow: [
        { n: '01', t: 'Briefing', d: 'Welcome & walk-through' },
        { n: '02', t: 'Profile building', d: 'Card: 5 songs, 5 artists, 3 genres' },
        { n: '03', t: 'Songs & cards', d: 'Group picks one song' },
        { n: '04', t: 'Sing & match', d: 'We pair while they sing' },
        { n: '05', t: 'Conversation brief', d: 'Pairs, cue card, 8-min starter' },
        { n: '06', t: 'Pairs sit', d: 'Split up and settle in' },
        { n: '07', t: 'Time-stamping', d: 'Get-up moment; chat freely' },
        { n: '08', t: 'Feedback form', d: '“Help us out!”' }
      ],
      musicResults: [
        { t: 'Similarity vs curiosity', d: 'Similarity made them talk about different things in life and share stories, whereas curiosity led them to find similar grounds and connect more.' },
        { t: 'Gender ratio', d: 'Helped us understand the comfort and flow of connection between same and different gender.' },
        { t: 'Singing together', d: 'It helped in ice breaking and creating a safe space for everyone to interact one on one later with ease.' }
      ],
      session: [
        { t: 'BEFORE', i: ['Outreach + archetype check', 'Manual handed + explained', 'Prototype briefing', 'Safety measures shared'] },
        { t: 'ARRIVAL', i: ['Mood lighting + comfort', 'Refreshments + soft toy', 'Space intro + name tag', 'Exit protocol', 'Username for anonymity'] },
        { t: '30-MIN CONVERSATION', i: ['First prompt question', 'Name tags set turns', 'User gel-up moment', '2nd prompt only if needed', 'Probing words for flow'] },
        { t: 'AFTER', i: ['Anonymity reveal choice', 'Feedback form', 'Verbal feedback'] }
      ],
      groups: [
        { p: 'M : M', t: 'GROUP 1 · SAME', time: '8–9 pm', c: 'Low', f: 'Difficult', r: 'Repulsion', o: 'Same gender, difficulty connecting.' },
        { p: 'F : F', t: 'GROUP 2 · SAME', time: '2–3 pm', c: 'High', f: 'Easy to medium', r: 'Bonding', o: 'Same gender, easy bonding.' },
        { p: 'M : F', t: 'GROUP 3 · OPPOSITE', time: '4–5 pm', c: 'High', f: 'Easy', r: 'Curiosity', o: 'Opposite gender attracts, effortless connection.' },
        { p: 'F : M : M', t: 'GROUP 4 · TRIO', time: '7–8 pm', c: 'Medium', f: 'Easy', r: 'Group dynamics', o: 'Group setting diverges from deep conversation.' }
      ],
      validation: [
        { t: 'Platform validation', q: ['Can users understand the service proposition?', 'Can they navigate its primary functions?', 'Can they discover a relevant interaction pathway?'] },
        { t: 'Interaction validation', q: ['Can users initiate a conversation comfortably?', 'Are the available modes of interaction clear?', 'Do users understand how to continue or disengage?'] },
        { t: 'Safety validation', q: ['Are privacy and consent mechanisms understandable?', 'Can users control their availability and disclosure?', 'Are reporting, blocking, and exit options accessible?'] }
      ],
      rivals: [
        { k: 'Who?', h: 'People seeking genuine, low-pressure conversations.', s: 'People who enjoy discovering and sharing music socially.' },
        { k: 'What?', h: 'Anonymous, voice-first conversations with optional ongoing connections.', s: 'Social music discovery through song sharing, feeds and voice notes.' },
        { k: 'When?', h: 'When someone wants to talk, feel heard or find companionship.', s: 'When someone discovers, enjoys or wants to share a meaningful song.' },
        { k: 'Where?', h: 'Within a digital, voice-led social environment.', s: 'Within a digital, music-sharing environment.' },
        { k: 'Why?', h: 'To make human connection easier without photos or real-name profiles.', s: 'To make music discovery more personal and people-driven.' },
        { k: 'How?', h: 'Users select topics, get matched, talk and mutually choose whether to stay connected.', s: 'Users share songs, discover others’ music and optionally explain songs through voice notes.' },
        { k: 'Gap', h: 'Music is not the central discovery mechanism.', s: 'Deeper companionship and sustained personal conversations are not the primary focus.' }
      ],
      visualPrinciples: ['Emotional warmth', 'Clarity', 'Space for reflection', 'Personal expression', 'Privacy and control'],
      belongStages: [
        { n: '01', k: 'START', t: 'Discover', e: 'Curious, intrigue, hope', w: 'Application' },
        { n: '02', k: 'ENTRY', t: 'Profile Building', e: 'Curious, nervous, excited', w: 'Sign up & profile, anonymity maintained' },
        { n: '03', k: 'PARTICIPATION', t: 'Exploration', e: 'Choice fatigue, confusion', w: 'Home page & Recording room' },
        { n: '04', k: 'PARTICIPATION', t: 'Engagement', e: 'Delight, confusion, boredom', w: 'Notifications & Private room' },
        { n: '05', k: 'WOW ELEMENT', t: 'AHA Moment', e: 'Validated, curious, delight', w: 'Reciprocity, shared stories, emotional depth' },
        { n: '06', k: 'EXISTS FOREVER', t: 'Exit', e: 'Frustrated, dejected, premium fatigue', w: 'Pause, logout, deactivate' }
      ],
      rules: [
        { k: 'PRIVATE ROOM', t: '12 rooms, one black hole', d: 'Calling, voice notes & personalisation across 12 rooms. If one user leaves a room, it closes for both and goes into the black hole. It can only be revived if the same user sends a connection request, not if blocked or reported.' },
        { k: 'AI CHAT COMPANION', t: 'Steps in after 72 hours', d: 'Opens when a post gets no reply within 72 hours. For first-time users with no or an inactive private room. Stays until 12 private rooms are formed.' },
        { k: 'DETACH FROM ME', t: 'User-controlled', d: 'Users can activate it whenever, or it self-activates again after 72 hours without a private room. Applies to non first-time users.' },
        { k: 'REPEATED OFFENDERS', t: '5 · 10 · 20', d: 'Warning at 5 reports, suspended at 10, removed at 20.' },
        { k: 'EXITS', t: 'Logout, pause, deactivate', d: 'Pause greys out the profile and keeps the latest PR and stories. Deactivation removes the profile; users can log back in within 30 days, after that the data is deleted.' },
        { k: 'WAYS BACK IN', t: 'Loops after exit', d: 'Changed behaviour, deleted app but came back, paused account restored, inactive account without deletion, re-active after AI companion.' }
      ],
      pricing: [
        { pr: '1 PR', rs: '12 Rs', th: '2 themes' }, { pr: '3 PR', rs: '34 Rs', th: '4 themes' }, { pr: '5 PR', rs: '56 Rs', th: '6 themes' }, { pr: '7 PR', rs: '78 Rs', th: '8 themes' }
      ],
      lanes: [
        lane('EMOTION', 'How the user feels', [['Curious, intrigue, hope'], ['Curious, nervous, excited'], ['Choice fatigue, confusion'], ['Delight, confusion, boredom'], ['Validated, curious, delight'], ['Frustrated, dejected, premium fatigue']], 'var(--color-accent-100)', 'var(--color-accent-800)', '2px solid var(--color-text)'),
        lane('PHYSICAL EVIDENCE', 'Screens and signals', [['App store listing', 'Word of mouth, social posts', 'Proposition screen'], ['Sign up screens', 'Interest and music picker', 'Privacy and consent prompts'], ['Home page', 'Recording room', 'Companion recommendations'], ['Notifications', 'Private room', 'Text and voice conversation'], ['Shared story threads', 'AI companion', 'Premium options'], ['Settings and safety controls', 'Pause, logout, deactivate', '30-day retrieval notice']], 'var(--color-surface)', 'var(--color-text)', '1px solid var(--color-divider)'),
        lane('USER ACTIONS', 'What the user does', [['Feels the need to talk or connect', 'Hears of Belong', 'Downloads the application'], ['Signs up anonymously', 'Picks interests and songs', 'Sets boundaries and availability'], ['Browses companions', 'Listens to songs and stories', 'Faces too many choices'], ['Initiates a conversation', 'Responds or ignores', 'Gets no response'], ['Shares stories, reciprocates', 'Finds meaningful companionship', 'Buys more options'], ['Pauses or logs out', 'Blocks or reports', 'Deactivates the account']], 'var(--color-text)', 'var(--color-bg)', '2px solid var(--color-accent)'),
        lane('FRONTSTAGE', 'What the service shows', [['Communicates the core proposition', 'Introduces the service'], ['Onboarding and profile building', 'Explains privacy and consent'], ['Discovery and recommendations', 'Music- and story-based entry points'], ['Conversation initiation', 'Private interactions', 'Notifications'], ['Reflection and AI-assisted conversation', 'Premium upgrade offer'], ['Settings and safety controls', 'Re-login and rejoin prompts']], 'var(--color-accent-200)', 'var(--color-text)', '2px dashed var(--color-accent)'),
        lane('BACKSTAGE', 'What supports it', [['Outreach and app store management'], ['Profile and preference management', 'Consent and privacy controls'], ['Recommendation logic', 'Compatibility matching'], ['Interaction and availability management', 'Notification management'], ['AI companion steps in on no response', 'Moderation of conversations'], ['Reporting and moderation processes', 'Data management and account support']], 'var(--color-neutral-200)', 'var(--color-text)', '2px solid var(--color-divider)'),
        lane('SUPPORT SYSTEMS', 'Infrastructure and policy', [['App stores', 'Analytics'], ['Authentication', 'User and preference database'], ['Matching engine', 'Music and story content storage'], ['Messaging and voice infrastructure', 'Push notification service'], ['AI model', 'Payments'], ['Transparent data practices', '30-day data retention policy']], 'var(--color-neutral-300)', 'var(--color-text)', '2px solid var(--color-text)')
      ],
      profileSteps: [
        { n: '01', t: 'Arrive', s: 'Enter profile', u: 'Starts profile setup. A blank profile, basic presence first.', e: 'Activation · Account creation' },
        { n: '02', t: 'Name myself', s: '“How do I want to present myself here?”', u: 'Username, pronouns and a DP / avatar.', e: 'Account management · Image moderation' },
        { n: '03', t: 'How I tend to be', s: 'Personality + language', u: 'MBTI / archetype, country and languages. How you tend to interact, never “who you are”.', e: 'Matching value · Matching optimisation' },
        { n: '04', t: 'What reveals me', s: '“A little something about me…”', u: 'Interests, skills, a voice intro and stories.', e: 'Recommendation · Engagement' },
        { n: '05', t: 'What I share', s: 'Preview, privacy, save', u: 'Preview, choose public / limited / private, save. Nothing forced; complete more on each return.', e: 'Risk management · Conversion · Completion KPI' }
      ],
      prStates: [
        { n: '01', t: 'REQUEST', s: 'Send a PR', d: 'Finds a story or person, sends a PR, waits for the safety check.' },
        { n: '02', t: 'ACCEPT', s: 'Hear the story', d: 'Gets notified, hears the originating story, accepts or declines.' },
        { n: '03', t: 'ACTIVE', s: 'Talk, share, deepen', d: 'Chats, records voice, shares songs and images. Prompts guide the start, then step back.' },
        { n: '04', t: 'INACTIVE', s: 'Silence, then support', d: 'No reply. After 72 hours the AI Companion steps in.' },
        { n: '05', t: 'CLOSED', s: 'Leave or return', d: 'Leaves, blocks or reports. Or comes back to the person.' }
      ],
      ladder: [
        { t: 'ICEBREAKER', q: '“What made you choose this?”' },
        { t: 'DISCOVERY', q: '“Have you experienced something similar?”' },
        { t: 'PERSONAL', q: '“Why was that important?”' },
        { t: 'DEEP', q: '“How did that change you?”' },
        { t: 'NATURAL', q: '→' }
      ],
      funnel: [['Sent', 100], ['Accepted', 70], ['Started', 50], ['Continue', 30], ['Meaningful', 15], ['Recurring', 5]].map(([l, v]) => ({ l, v, w: v + '%' })),
      recSteps: [
        { n: '01', t: 'CREATE', s: 'Enter, choose, record', d: 'Opens the room, picks free record, prompt, response or activity, then records. Pauses and re-records freely.' },
        { n: '02', t: 'SHAPE', s: 'Edit, score, colour', d: 'Trims and cleans the voice, adds music or ambience, reviews the transcript, picks a theme and nickname.' },
        { n: '03', t: 'RELEASE', s: 'Preview, set, publish', d: 'Listens back, chooses who can hear it, publishes.' },
        { n: '04', t: 'DISCOVER', s: 'Listen, share, respond', d: 'Others hear the story, share it and reply with text, voice, music or media.' },
        { n: '05', t: 'CONNECT', s: 'From story to PR', d: 'Sends a PR to the creator, who accepts and moves into the PR Room. A new story often follows.' }
      ]
    };
})();
