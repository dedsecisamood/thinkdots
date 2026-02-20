import { CAT_COLOR } from './knowledge.js';

const GEMINI_KEY = 'AIzaSyDUdEHMn9OCVP9pNsqfn3FBZ7qJ2qTUJM0';

export async function callGemini(topic) {
    const prompt = `You are a knowledge graph generator. For the topic "${topic}", return ONLY valid JSON (no markdown, no code fences, no explanation):
{"nodes":[{"id":"concept name","category":"technology|science|philosophy|arts|cosmos|mind","description":"1-2 sentence description"}],"edges":[{"from":"A","to":"B"}]}
Strict rules: 10-14 nodes total. "${topic}" MUST be the first node exactly as typed. 12-20 edges. Valid categories only. Return ONLY the raw JSON object.`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}(?=[^}]*$)/m) || text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON');
    return JSON.parse(match[0]);
}

export function buildGraphFromAI(aiData, seedTopic, state) {
    state.aiGraph = {};
    (aiData.nodes || []).forEach(n => {
        state.aiGraph[n.id] = { cat: n.category || 'science', desc: n.description || '', conn: [] };
    });

    (aiData.edges || []).forEach(e => {
        if (state.aiGraph[e.from] && !state.aiGraph[e.from].conn.find(c => c[0] === e.to)) {
            state.aiGraph[e.from].conn.push([e.to, .8]);
        }
        if (state.aiGraph[e.to] && !state.aiGraph[e.to].conn.find(c => c[0] === e.from)) {
            state.aiGraph[e.to].conn.push([e.from, .7]);
        }
    });

    state.nodes = {};
    state.edges = [];

    const cx = state.bgC.width / 2, cy = state.bgC.height / 2;
    const seedId = (aiData.nodes[0]?.id) || seedTopic;
    const seedCat = state.aiGraph[seedId]?.cat || 'technology';

    state.nodes[seedId] = {
        key: seedId, x: cx, y: cy, vx: 0, vy: 0, r: 0, targetR: 30,
        color: CAT_COLOR[seedCat] || '#00d4ff', born: Date.now(), mass: 1.5, seed: true
    };

    (aiData.nodes || []).slice(1).forEach(n => {
        if (!n.id) return;
        const col = CAT_COLOR[n.category] || '#aaaaaa';
        const angle = Math.random() * Math.PI * 2, dist = Math.random() * 120 + 60;
        if (!state.nodes[n.id]) {
            state.nodes[n.id] = {
                key: n.id, x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist,
                vx: 0, vy: 0, r: 0, targetR: 22, color: col, born: Date.now(), mass: 1.2
            };
        }
    });

    (aiData.edges || []).forEach(e => {
        if (state.nodes[e.from] && state.nodes[e.to]) {
            state.addEdge(e.from, e.to);
        }
    });

    state.spawnBurst(cx, cy, CAT_COLOR[seedCat] || '#00d4ff');
    state.updateCounters();
    document.getElementById('emptyState').style.opacity = '0';
}
