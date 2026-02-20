import { CAT_COLOR, KB, getKBData, getColor } from './knowledge.js';
import { callGemini, buildGraphFromAI } from './gemini.js';

// ─── CANVAS SETUP ──────────────────────────────────────────────────────────
const bgC = document.getElementById('bgCanvas'), bgX = bgC.getContext('2d');
const grC = document.getElementById('graphCanvas'), grX = grC.getContext('2d');

function resize() {
    bgC.width = grC.width = window.innerWidth;
    bgC.height = grC.height = window.innerHeight;
}
resize();

// ─── STAR FIELD ────────────────────────────────────────────────────────────
let stars = [];
function initStars() {
    stars = [];
    for (let i = 0; i < 400; i++) stars.push({
        x: Math.random() * bgC.width, y: Math.random() * bgC.height,
        r: Math.random() * 1.5 + .2, o: Math.random() * .8 + .1,
        s: Math.random() * .015 + .004, p: Math.random() * Math.PI * 2,
        layer: Math.floor(Math.random() * 3)
    });
}
window.addEventListener('resize', () => { resize(); initStars(); });

let st = 0;
function drawStars() {
    st += .008;
    bgX.fillStyle = '#040410';
    bgX.fillRect(0, 0, bgC.width, bgC.height);

    const ng = bgX.createRadialGradient(bgC.width * .3, bgC.height * .4, 0, bgC.width * .3, bgC.height * .4, bgC.width * .45);
    ng.addColorStop(0, 'rgba(123,47,255,.05)'); ng.addColorStop(1, 'transparent');
    bgX.fillStyle = ng; bgX.fillRect(0, 0, bgC.width, bgC.height);

    const ng2 = bgX.createRadialGradient(bgC.width * .75, bgC.height * .3, 0, bgC.width * .75, bgC.height * .3, bgC.width * .35);
    ng2.addColorStop(0, 'rgba(0,212,255,.04)'); ng2.addColorStop(1, 'transparent');
    bgX.fillStyle = ng2; bgX.fillRect(0, 0, bgC.width, bgC.height);

    stars.forEach(s => {
        const px = (s.x + (targetTransform.x * (s.layer + 1) * 0.05)) % bgC.width;
        const py = (s.y + (targetTransform.y * (s.layer + 1) * 0.05)) % bgC.height;
        const x = px < 0 ? px + bgC.width : px;
        const y = py < 0 ? py + bgC.height : py;
        const o = s.o * (0.5 + 0.5 * Math.sin(st * s.s * 60 + s.p));
        bgX.beginPath();
        bgX.arc(x, y, s.r, 0, Math.PI * 2);
        bgX.fillStyle = `rgba(255,255,255,${o})`;
        bgX.fill();
    });
}

// ─── GRAPH STATE ───────────────────────────────────────────────────────────
let nodes = {}, edges = [], spr_particles = [], aiGraph = {};
let transform = { x: 0, y: 0, scale: 1 };
let targetTransform = { x: 0, y: 0, scale: 1 };
let selectedNode = null, expandTarget = null, hoveredNode = null;
let draggingNode = null, panning = false, lastMouse = { x: 0, y: 0 }, mousedownPos = { x: 0, y: 0 };

const state = {
    get bgC() { return bgC; },
    get nodes() { return nodes; }, set nodes(v) { nodes = v; },
    get edges() { return edges; }, set edges(v) { edges = v; },
    get aiGraph() { return aiGraph; }, set aiGraph(v) { aiGraph = v; },
    addEdge, spawnBurst, updateCounters
};

function spawnBurst(x, y, color) {
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        spr_particles.push({
            x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            r: Math.random() * 2 + 1, life: 1.0, decay: Math.random() * 0.02 + 0.015, color: color
        });
    }
}

function addNode(key, ox, oy) {
    if (nodes[key]) return;
    const cx = bgC.width / 2, cy = bgC.height / 2;
    const angle = Math.random() * Math.PI * 2, dist = Math.random() * 120 + 60;
    const bx = (ox != null ? ox : cx), by = (oy != null ? oy : cy);
    nodes[key] = {
        key, x: bx + Math.cos(angle) * dist, y: by + Math.sin(angle) * dist,
        vx: 0, vy: 0, r: 0, targetR: 22, color: getColor(key, aiGraph),
        born: Date.now(), mass: 1.2
    };
}

function addEdge(a, b) {
    if (edges.find(e => (e.a === a && e.b === b) || (e.a === b && e.b === a))) return;
    if (!nodes[a] || !nodes[b]) return;
    const particles = [];
    for (let i = 0; i < 3; i++) {
        particles.push({ t: Math.random(), speed: .002 + Math.random() * .003 });
    }
    edges.push({ a, b, particles });
}

function loadTopic(topic) {
    const key = topic.trim();
    const data = getKBData(key, aiGraph);
    if (!data) {
        const low = key.toLowerCase();
        const found = Object.keys(KB).find(k => {
            const kl = k.toLowerCase();
            return kl.includes(low) || low.includes(kl);
        });
        if (!found) return false;
        return loadTopic(found);
    }
    const bestKey = Object.keys(KB).find(k => k.toLowerCase() === key.toLowerCase()) || key;
    nodes = {};
    edges = [];
    const cx = bgC.width / 2, cy = bgC.height / 2;
    nodes[bestKey] = { key: bestKey, x: cx, y: cy, vx: 0, vy: 0, r: 0, targetR: 30, color: getColor(bestKey, aiGraph), born: Date.now(), mass: 1.5, seed: true };
    data.conn.forEach(([ck]) => {
        if (getKBData(ck, aiGraph)) {
            addNode(ck, cx, cy);
            addEdge(bestKey, ck);
        }
    });
    spawnBurst(cx, cy, getColor(bestKey, aiGraph));
    updateCounters();
    document.getElementById('emptyState').style.opacity = '0';
    return true;
}

function expandNode(key) {
    const data = getKBData(key, aiGraph);
    if (!data) return;
    const n = nodes[key];
    if (!n) return;
    data.conn.forEach(([ck]) => {
        const ckData = getKBData(ck, aiGraph);
        if (ckData) {
            if (!nodes[ck]) {
                const angle = Math.random() * Math.PI * 2, dist = Math.random() * 120 + 60;
                nodes[ck] = {
                    key: ck, x: n.x + Math.cos(angle) * dist, y: n.y + Math.sin(angle) * dist,
                    vx: 0, vy: 0, r: 0, targetR: 22, color: CAT_COLOR[ckData.cat] || '#aaaaaa',
                    born: Date.now(), mass: 1.2
                };
            }
            addEdge(key, ck);
        }
    });
    spawnBurst(n.x, n.y, n.color);
    updateCounters();
}

function updateCounters() {
    document.getElementById('nodeCount').textContent = Object.keys(nodes).length;
    document.getElementById('edgeCount').textContent = edges.length;
}

// ─── PHYSICS ───────────────────────────────────────────────────────────────
const REPULSE = 7000, SPRING = .045, DAMP = .82, GRAVITY = .018, REST_LEN = 160;

function physics() {
    const keys = Object.keys(nodes);
    const cx = bgC.width / 2, cy = bgC.height / 2;
    for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
            const a = nodes[keys[i]], b = nodes[keys[j]];
            let dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const f = REPULSE / (dist * dist);
            const fx = f * dx / dist, fy = f * dy / dist;
            a.vx -= fx / a.mass; a.vy -= fy / a.mass;
            b.vx += fx / b.mass; b.vy += fy / b.mass;
        }
    }
    edges.forEach(e => {
        const a = nodes[e.a], b = nodes[e.b];
        if (!a || !b) return;
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = SPRING * (dist - REST_LEN);
        const fx = force * dx / dist, fy = force * dy / dist;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
    });
    keys.forEach(k => {
        const n = nodes[k];
        if (draggingNode === n) return;
        const dx = (cx - n.x) * GRAVITY, dy = (cy - n.y) * GRAVITY;
        n.vx = (n.vx + dx) * DAMP;
        n.vy = (n.vy + dy) * DAMP;
        n.x += n.vx; n.y += n.vy;
        n.r += (n.targetR - n.r) * .12;
    });
}

function tickParticles() {
    edges.forEach(e => e.particles.forEach(p => p.t = (p.t + p.speed) % 1));
    for (let i = spr_particles.length - 1; i >= 0; i--) {
        const p = spr_particles[i];
        p.x += p.vx; p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) spr_particles.splice(i, 1);
    }
}

// ─── RENDERING ─────────────────────────────────────────────────────────────
function worldToScreen(wx, wy) {
    return { x: wx * transform.scale + transform.x, y: wy * transform.scale + transform.y };
}

function smoothCamera() {
    transform.x += (targetTransform.x - transform.x) * 0.12;
    transform.y += (targetTransform.y - transform.y) * 0.12;
    transform.scale += (targetTransform.scale - transform.scale) * 0.12;
}

function drawGraph() {
    grX.clearRect(0, 0, grC.width, grC.height);
    const now = Date.now();
    const globalPulse = 0.5 + 0.5 * Math.sin(now * 0.002);
    grX.save();
    grX.translate(transform.x, transform.y);
    grX.scale(transform.scale, transform.scale);

    edges.forEach(e => {
        const a = nodes[e.a], b = nodes[e.b];
        if (!a || !b || a.r < 1 || b.r < 1) return;
        const ca = a.color, cb = b.color;
        const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
        const cpx = cx + (- (b.y - a.y) * .25), cpy = cy + ((b.x - a.x) * .25);
        const sel = (selectedNode && (selectedNode.key === e.a || selectedNode.key === e.b));
        const hov = (hoveredNode && (hoveredNode.key === e.a || hoveredNode.key === e.b));
        const gr = grX.createLinearGradient(a.x, a.y, b.x, b.y);
        gr.addColorStop(0, ca + (sel ? 'bb' : hov ? '77' : '44'));
        gr.addColorStop(1, cb + (sel ? 'bb' : hov ? '77' : '44'));
        grX.strokeStyle = gr;
        grX.lineWidth = (sel ? 2.5 : hov ? 1.8 : 1.2) / transform.scale;
        grX.beginPath(); grX.moveTo(a.x, a.y); grX.quadraticCurveTo(cpx, cpy, b.x, b.y); grX.stroke();
        e.particles.forEach(p => {
            const t = p.t;
            const px = Math.pow(1 - t, 2) * a.x + 2 * (1 - t) * t * cpx + t * t * b.x;
            const py = Math.pow(1 - t, 2) * a.y + 2 * (1 - t) * t * cpy + t * t * b.y;
            grX.beginPath();
            grX.arc(px, py, (1.8 + globalPulse * 0.5) / transform.scale, 0, Math.PI * 2);
            grX.fillStyle = ca + 'aa'; grX.shadowBlur = 4 / transform.scale; grX.shadowColor = ca; grX.fill(); grX.shadowBlur = 0;
        });
    });

    spr_particles.forEach(p => {
        grX.globalAlpha = p.life; grX.fillStyle = p.color;
        grX.beginPath(); grX.arc(p.x, p.y, p.r / transform.scale, 0, Math.PI * 2); grX.fill();
    });
    grX.globalAlpha = 1;

    Object.values(nodes).forEach(n => {
        if (n.r < 1) return;
        const age = (now - n.born) / 600, alpha = Math.min(1, age);
        const hov = (n === hoveredNode), sel = (n === selectedNode);
        const pulse = sel ? 1 + .08 * Math.sin(now * .004) : 1 + (globalPulse * 0.03), dr = n.r * pulse;
        const glowR = dr * (hov ? 3.5 : sel ? 3.2 : 2.5 + globalPulse * 0.3);
        const grd = grX.createRadialGradient(n.x, n.y, dr * .3, n.x, n.y, glowR);
        grd.addColorStop(0, n.color + (sel ? '55' : hov ? '44' : '28')); grd.addColorStop(1, 'transparent');
        grX.fillStyle = grd; grX.beginPath(); grX.arc(n.x, n.y, glowR, 0, Math.PI * 2); grX.fill();
        grX.beginPath(); grX.arc(n.x, n.y, dr, 0, Math.PI * 2);
        const fill = grX.createRadialGradient(n.x - dr * .3, n.y - dr * .3, 0, n.x, n.y, dr);
        fill.addColorStop(0, n.color + 'ff'); fill.addColorStop(1, n.color + '88');
        grX.fillStyle = fill; grX.globalAlpha = alpha; grX.fill(); grX.globalAlpha = 1;
        if (sel) {
            grX.beginPath(); grX.arc(n.x, n.y, dr + 4, 0, Math.PI * 2);
            grX.strokeStyle = n.color + '88'; grX.lineWidth = 1.5; grX.stroke();
        }
        const seed = n.seed, fs = (seed ? 13 : 11) / transform.scale;
        grX.font = `${seed ? 700 : 500} ${fs}px 'Space Grotesk', sans-serif`;
        grX.fillStyle = `rgba(224,224,255,${alpha * (hov || sel ? .95 : .7)})`;
        grX.textAlign = 'center'; grX.fillText(n.key, n.key === 'Prophet Muhammad' ? n.x : n.x, n.y + dr + 13 / transform.scale);
    });
    grX.restore();
}

// ─── INTERACTION ───────────────────────────────────────────────────────────
function hitTest(mx, my) {
    let hit = null, bestD = Infinity;
    Object.values(nodes).forEach(n => {
        const s = worldToScreen(n.x, n.y);
        const d = Math.hypot(mx - s.x, my - s.y);
        const r = n.r * transform.scale + 8;
        if (d < r && d < bestD) { bestD = d; hit = n; }
    });
    return hit;
}
function toWorld(sx, sy) { return { x: (sx - transform.x) / transform.scale, y: (sy - transform.y) / transform.scale }; }
function focusOnNode(n) {
    const cx = bgC.width / 2, cy = bgC.height / 2;
    targetTransform.x = cx - n.x * targetTransform.scale;
    targetTransform.y = cy - n.y * targetTransform.scale;
}

grC.addEventListener('mousedown', e => {
    const hit = hitTest(e.clientX, e.clientY);
    if (hit) draggingNode = hit;
    else { panning = true; grC.classList.add('panning'); }
    lastMouse = { x: e.clientX, y: e.clientY };
    mousedownPos = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mousemove', e => {
    if (draggingNode) {
        const w = toWorld(e.clientX, e.clientY);
        draggingNode.x = w.x; draggingNode.y = w.y; draggingNode.vx = draggingNode.vy = 0;
    } else if (panning) {
        targetTransform.x += e.clientX - lastMouse.x;
        targetTransform.y += e.clientY - lastMouse.y;
    } else {
        hoveredNode = hitTest(e.clientX, e.clientY);
        const tip = document.getElementById('tooltip');
        if (hoveredNode) {
            tip.style.opacity = '1'; tip.style.left = (e.clientX + 14) + 'px'; tip.style.top = (e.clientY - 10) + 'px';
            tip.textContent = hoveredNode.key; grC.style.cursor = 'pointer';
        } else { tip.style.opacity = '0'; grC.style.cursor = 'grab'; }
    }
    lastMouse = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mouseup', e => {
    if (draggingNode && Math.hypot(e.clientX - mousedownPos.x, e.clientY - mousedownPos.y) < 4) selectNode(draggingNode);
    draggingNode = null; panning = false; grC.classList.remove('panning');
});

grC.addEventListener('wheel', e => {
    e.preventDefault();
    const zf = e.deltaY < 0 ? 1.1 : 0.91;
    const mx = e.clientX, my = e.clientY;
    const before = toWorld(mx, my);
    targetTransform.scale = Math.max(.15, Math.min(4, targetTransform.scale * zf));
    const after = toWorld(mx, my);
    targetTransform.x += (after.x - before.x) * targetTransform.scale;
    targetTransform.y += (after.y - before.y) * targetTransform.scale;
}, { passive: false });

function selectNode(n) {
    selectedNode = n; expandTarget = n.key;
    const d = getKBData(n.key, aiGraph);
    const panel = document.getElementById('infoPanel');
    panel.classList.add('open');
    document.getElementById('infoCat').textContent = (d?.cat || 'concept').toUpperCase();
    document.getElementById('infoCat').style.color = n.color;
    document.getElementById('infoTitle').textContent = n.key;
    document.getElementById('infoTitle').style.color = n.color;
    document.getElementById('infoDesc').textContent = d?.desc || 'Expand to explore connections.';
    const cc = document.getElementById('infoConns'); cc.innerHTML = '';
    d?.conn.slice(0, 6).forEach(([ck]) => {
        const col = getColor(ck, aiGraph) || n.color;
        cc.innerHTML += `<div class="conn-item"><div class="conn-dot" style="background:${col}"></div><span>${ck}</span></div>`;
    });
    focusOnNode(n);
}

document.getElementById('closeBtn').onclick = () => { document.getElementById('infoPanel').classList.remove('open'); selectedNode = null; };
document.getElementById('expandBtn').onclick = () => { if (expandTarget) expandNode(expandTarget); };
document.getElementById('exploreBtn').onclick = explore;
document.getElementById('surpriseBtn').onclick = surprise;

const si = document.getElementById('seedInput'), sh = document.getElementById('searchHint');
si.addEventListener('input', () => {
    const v = si.value.trim().toLowerCase();
    if (!v) { sh.textContent = ''; return; }
    const match = Object.keys(KB).find(k => k.toLowerCase().startsWith(v));
    sh.textContent = (match && match.toLowerCase() !== v) ? si.value + match.slice(v.length) : '';
});
si.addEventListener('keydown', e => {
    if (e.key === 'Enter') explore();
    if (e.key === 'Tab' && sh.textContent) { e.preventDefault(); si.value = sh.textContent; sh.textContent = ''; }
});
window.addEventListener('keydown', e => {
    if (e.key === 'Escape') { document.getElementById('infoPanel').classList.remove('open'); selectedNode = null; }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); si.focus(); }
});

function surprise() {
    const keys = Object.keys(KB);
    si.value = keys[Math.floor(Math.random() * keys.length)];
    explore();
}

async function explore() {
    const v = si.value.trim(); if (!v) return;
    const btn = document.getElementById('exploreBtn');
    btn.disabled = true; btn.textContent = '...';
    document.getElementById('aiStatus').classList.remove('off');
    document.getElementById('infoPanel').classList.remove('open');
    selectedNode = null; targetTransform.x = targetTransform.y = 0; targetTransform.scale = 1;
    try {
        const ai = await callGemini(v);
        buildGraphFromAI(ai, v, state);
    } catch (err) {
        console.warn('Thinkdots AI failed, using static KB:', err);
    if (!loadTopic(v)) alert('Concept not found. Try: AI, universe, music, quantum physics…');
    } finally {
        btn.disabled = false; btn.textContent = 'EXPLORE';
        document.getElementById('aiStatus').classList.add('off');
    }
}

document.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => { si.value = c.dataset.t; explore(); });
});

function loop() { drawStars(); physics(); smoothCamera(); tickParticles(); drawGraph(); requestAnimationFrame(loop); }
initStars();
setTimeout(async () => {
    document.getElementById('loader').classList.add('gone');
    si.value = 'artificial intelligence'; explore();
}, 1400);
loop();
