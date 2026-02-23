// ─── CANVAS SETUP ──────────────────────────────────────────────────────────
const bgC = document.getElementById('bgCanvas'), bgX = bgC.getContext('2d');
const grC = document.getElementById('graphCanvas'), grX = grC.getContext('2d');

function resize() {
    bgC.width = grC.width = window.innerWidth;
    bgC.height = grC.height = window.innerHeight;
}
resize();

// ─── TWINKLING STAR FIELD ──────────────────────────────────────────────────
let stars = [];
function initStars() {
    stars = [];
    const count = 450;
    for (let i = 0; i < count; i++) stars.push({
        x: Math.random() * bgC.width, y: Math.random() * bgC.height,
        r: Math.random() * 1.8 + .2, o: Math.random() * .8 + .1,
        s: Math.random() * .02 + .005, p: Math.random() * Math.PI * 2,
        layer: Math.floor(Math.random() * 3)
    });
}

let st = 0;
function drawBackground() {
    st += .006;
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    
    // Smooth transition base
    bgX.fillStyle = isDark ? '#030303' : '#f5f5f7';
    bgX.fillRect(0, 0, bgC.width, bgC.height);

    // Cinematic Atmospheric Glows
    if (isDark) {
        const grd1 = bgX.createRadialGradient(bgC.width * .3, bgC.height * .4, 0, bgC.width * .3, bgC.height * .4, bgC.width * .6);
        grd1.addColorStop(0, 'rgba(0, 212, 255, 0.08)');
        grd1.addColorStop(1, 'transparent');
        bgX.fillStyle = grd1; bgX.fillRect(0, 0, bgC.width, bgC.height);

        const grd2 = bgX.createRadialGradient(bgC.width * .8, bgC.height * .6, 0, bgC.width * .8, bgC.height * .6, bgC.width * .5);
        grd2.addColorStop(0, 'rgba(123, 47, 255, 0.06)');
        grd2.addColorStop(1, 'transparent');
        bgX.fillStyle = grd2; bgX.fillRect(0, 0, bgC.width, bgC.height);
    }

    // Stars
    stars.forEach(s => {
        const px = (s.x + (targetTransform.x * (s.layer + 1) * 0.04)) % bgC.width;
        const py = (s.y + (targetTransform.y * (s.layer + 1) * 0.04)) % bgC.height;
        const x = px < 0 ? px + bgC.width : px;
        const y = py < 0 ? py + bgC.height : py;
        const o = s.o * (0.6 + 0.4 * Math.sin(st * s.s * 80 + s.p));
        bgX.beginPath();
        bgX.arc(x, y, s.r, 0, Math.PI * 2);
        bgX.fillStyle = isDark ? `rgba(255, 255, 255, ${o})` : `rgba(0, 0, 0, ${o * 0.4})`;
        bgX.fill();
    });
}
window.addEventListener('resize', () => { resize(); initStars(); });

// ─── GRAPH STATE ───────────────────────────────────────────────────────────
let nodes = {}, edges = [], spr_particles = [], aiGraph = {};
let transform = { x: 0, y: 0, scale: 1 };
let targetTransform = { x: 0, y: 0, scale: 1 };
let selectedNode = null, expandTarget = null, hoveredNode = null;
let draggingNode = null, panning = false, lastMouse = { x: 0, y: 0 }, mousedownPos = { x: 0, y: 0 };
let mouseWorld = { x: 0, y: 0 };
let learnedNodes = new Set(JSON.parse(localStorage.getItem('thinkdots-learned') || '[]'));

const state = {
    get bgC() { return bgC; },
    get nodes() { return nodes; }, set nodes(v) { nodes = v; },
    get edges() { return edges; }, set edges(v) { edges = v; },
    get aiGraph() { return aiGraph; }, set aiGraph(v) { aiGraph = v; },
    addEdge, spawnBurst, updateCounters
};

function spawnBurst(x, y, color) {
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        spr_particles.push({
            x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            r: Math.random() * 2.5 + 1.5, life: 1.0, decay: Math.random() * 0.02 + 0.012, color: color
        });
    }
}

function addNode(key, ox, oy) {
    if (nodes[key]) return;
    const cx = bgC.width / 2, cy = bgC.height / 2;
    const angle = Math.random() * Math.PI * 2, dist = Math.random() * 140 + 80;
    const bx = (ox != null ? ox : cx), by = (oy != null ? oy : cy);
    nodes[key] = {
        key, x: bx + Math.cos(angle) * dist, y: by + Math.sin(angle) * dist,
        vx: 0, vy: 0, r: 0, targetR: 24, color: window.THINKDOTS.getColor(key, aiGraph),
        born: Date.now(), mass: 1.3
    };
}

function addEdge(a, b) {
    if (edges.find(e => (e.a === a && e.b === b) || (e.a === b && e.b === a))) return;
    if (!nodes[a] || !nodes[b]) return;
    const particles = [];
    for (let i = 0; i < 5; i++) {
        particles.push({ t: Math.random(), speed: .002 + Math.random() * .004 });
    }
    edges.push({ a, b, particles });
}

function loadTopic(topic) {
    const key = topic.trim();
    const data = window.THINKDOTS.getKBData(key, aiGraph);
    if (!data) {
        const low = key.toLowerCase();
        const found = Object.keys(window.THINKDOTS.KB).find(k => {
            const kl = k.toLowerCase();
            return kl.includes(low) || low.includes(kl);
        });
        if (!found) return false;
        return loadTopic(found);
    }
    const bestKey = Object.keys(window.THINKDOTS.KB).find(k => k.toLowerCase() === key.toLowerCase()) || key;
    nodes = {};
    edges = [];
    const cx = bgC.width / 2, cy = bgC.height / 2;
    nodes[bestKey] = { key: bestKey, x: cx, y: cy, vx: 0, vy: 0, r: 0, targetR: 35, color: window.THINKDOTS.getColor(bestKey, aiGraph), born: Date.now(), mass: 1.8, seed: true };
    data.conn.forEach(([ck]) => {
        if (window.THINKDOTS.getKBData(ck, aiGraph)) {
            addNode(ck, cx, cy);
            addEdge(bestKey, ck);
        }
    });
    spawnBurst(cx, cy, window.THINKDOTS.getColor(bestKey, aiGraph));
    updateCounters();
    const es = document.getElementById('emptyState');
    if (es) es.style.opacity = '0';
    return true;
}

function expandNode(key) {
    const data = window.THINKDOTS.getKBData(key, aiGraph);
    if (!data) return;
    const n = nodes[key];
    if (!n) return;
    data.conn.forEach(([ck]) => {
        const ckData = window.THINKDOTS.getKBData(ck, aiGraph);
        if (ckData) {
            if (!nodes[ck]) {
                const angle = Math.random() * Math.PI * 2, dist = Math.random() * 140 + 80;
                nodes[ck] = {
                    key: ck, x: n.x + Math.cos(angle) * dist, y: n.y + Math.sin(angle) * dist,
                    vx: 0, vy: 0, r: 0, targetR: 24, color: window.THINKDOTS.CAT_COLOR[ckData.cat] || '#86868b',
                    born: Date.now(), mass: 1.3
                };
            }
            addEdge(key, ck);
        }
    });
    spawnBurst(n.x, n.y, n.color);
    updateCounters();
}

function updateCounters() {
    const nc = document.getElementById('nodeCount');
    const lc = document.getElementById('learnedCount');
    if (nc) nc.textContent = Object.keys(nodes).length;
    if (lc) lc.textContent = learnedNodes.size;
    
    // Update node states based on learned set
    Object.keys(nodes).forEach(k => {
        nodes[k].learned = learnedNodes.has(k);
    });
}

// ─── PHYSICS (HIGH ENERGY CINEMATIC) ──────────────────────────────────────────
const REPULSE = 8500, SPRING = .05, DAMP = .84, GRAVITY = .025, REST_LEN = 160;

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
        n.r += (n.targetR - n.r) * .14;
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
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const globalPulse = 0.5 + 0.5 * Math.sin(now * 0.003);
    
    grX.save();
    grX.translate(transform.x, transform.y);
    grX.scale(transform.scale, transform.scale);

    // EDGES
    edges.forEach(e => {
        const a = nodes[e.a], b = nodes[e.b];
        if (!a || !b || a.r < 1 || b.r < 1) return;
        
        const sel = (selectedNode && (selectedNode.key === e.a || selectedNode.key === e.b));
        const hov = (hoveredNode && (hoveredNode.key === e.a || hoveredNode.key === e.b));
        
        const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
        const cpx = cx + (- (b.y - a.y) * .25), cpy = cy + ((b.x - a.x) * .25);
        
        const grad = grX.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, a.color + (sel || hov ? 'aa' : '33'));
        grad.addColorStop(1, b.color + (sel || hov ? 'aa' : '33'));
        
        grX.strokeStyle = grad;
        grX.lineWidth = (sel || hov ? 2.5 : 1.2) / transform.scale;
        
        grX.beginPath(); grX.moveTo(a.x, a.y); grX.quadraticCurveTo(cpx, cpy, b.x, b.y); grX.stroke();

        // Particles (Energy Streams)
        e.particles.forEach(p => {
            const t = p.t;
            const px = Math.pow(1 - t, 2) * a.x + 2 * (1 - t) * t * cpx + t * t * b.x;
            const py = Math.pow(1 - t, 2) * a.y + 2 * (1 - t) * t * cpy + t * t * b.y;
            grX.beginPath();
            grX.arc(px, py, (2 + globalPulse) / transform.scale, 0, Math.PI * 2);
            grX.fillStyle = a.color + '88';
            grX.shadowBlur = 10 / transform.scale; grX.shadowColor = a.color;
            grX.fill();
            grX.shadowBlur = 0;
        });
    });

    // SPR PARTICLES
    spr_particles.forEach(p => {
        grX.globalAlpha = p.life; grX.fillStyle = p.color;
        grX.beginPath(); grX.arc(p.x, p.y, p.r / transform.scale, 0, Math.PI * 2); grX.fill();
    });
    grX.globalAlpha = 1;

    // NODES
    Object.values(nodes).forEach(n => {
        if (n.r < 1) return;
        const hov = (n === hoveredNode), sel = (n === selectedNode);
        const dr = n.r * (sel ? 1.1 + Math.sin(now * 0.005) * 0.05 : hov ? 1.1 : 1);
        
        // Bloom
        const glowR = dr * (hov || sel ? 4 : 2.5 + globalPulse * 0.5);
        const grd = grX.createRadialGradient(n.x, n.y, dr * 0.2, n.x, n.y, glowR);
        grd.addColorStop(0, n.color + (sel ? '77' : hov ? '55' : '22'));
        grd.addColorStop(1, 'transparent');
        grX.fillStyle = grd; grX.beginPath(); grX.arc(n.x, n.y, glowR, 0, Math.PI * 2); grX.fill();
        
        // Main Body
        grX.beginPath(); grX.arc(n.x, n.y, dr, 0, Math.PI * 2);
        const fill = grX.createRadialGradient(n.x - dr * .3, n.y - dr * .3, 0, n.x, n.y, dr);
        fill.addColorStop(0, n.color); fill.addColorStop(1, n.color + '88');
        grX.fillStyle = fill;
        grX.fill();

        // High-end inner rim
        grX.strokeStyle = 'rgba(255,255,255,0.4)';
        grX.lineWidth = 1 / transform.scale;
        grX.stroke();

        if (sel) {
            grX.beginPath(); grX.arc(n.x, n.y, dr + 6 / transform.scale, 0, Math.PI * 2);
            grX.strokeStyle = n.color + 'aa';
            grX.lineWidth = 2 / transform.scale;
            grX.stroke();
        }

        // Label
        const fs = (n.seed ? 15 : 13) / transform.scale;
        grX.font = `${n.seed ? 700 : 500} ${fs}px "Outfit", sans-serif`;
        grX.fillStyle = isDark ? `rgba(245, 245, 247, ${hov || sel ? 1 : 0.8})` : `rgba(29, 29, 31, ${hov || sel ? 1 : 0.8})`;
        grX.textAlign = 'center';
        grX.fillText(n.key + (n.learned ? ' ✓' : ''), n.x, n.y + dr + (18 / transform.scale));

        if (n.learned) {
            grX.beginPath(); grX.arc(n.x, n.y, dr + 4 / transform.scale, 0, Math.PI * 2);
            grX.strokeStyle = '#00ff88'; grX.lineWidth = 2 / transform.scale; grX.stroke();
        }
    });

    grX.restore();
}

// ─── INTERACTION ───────────────────────────────────────────────────────────
function hitTest(mx, my) {
    let hit = null, bestD = Infinity;
    Object.values(nodes).forEach(n => {
        const s = worldToScreen(n.x, n.y);
        const d = Math.hypot(mx - s.x, my - s.y);
        const r = n.r * transform.scale + 16;
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
    // Ripple Effect
    const rip = document.createElement('div');
    rip.className = 'ripple';
    rip.style.left = e.clientX + 'px';
    rip.style.top = e.clientY + 'px';
    document.getElementById('ui').appendChild(rip);
    setTimeout(() => rip.remove(), 800);

    const hit = hitTest(e.clientX, e.clientY);
    if (hit) draggingNode = hit;
    else { panning = true; grC.classList.add('panning'); }
    lastMouse = { x: e.clientX, y: e.clientY };
    mousedownPos = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mousemove', e => {
    mouseWorld = toWorld(e.clientX, e.clientY);
    if (draggingNode) {
        draggingNode.x = mouseWorld.x; draggingNode.y = mouseWorld.y; draggingNode.vx = draggingNode.vy = 0;
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
    const zf = e.deltaY < 0 ? 1.12 : 0.88;
    const mx = e.clientX, my = e.clientY;
    const before = toWorld(mx, my);
    targetTransform.scale = Math.max(.15, Math.min(4, targetTransform.scale * zf));
    const after = toWorld(mx, my);
    targetTransform.x += (after.x - before.x) * targetTransform.scale;
    targetTransform.y += (after.y - before.y) * targetTransform.scale;
}, { passive: false });

function selectNode(n) {
    selectedNode = n; expandTarget = n.key;
    const d = window.THINKDOTS.getKBData(n.key, aiGraph);
    const panel = document.getElementById('infoPanel');
    if (panel) panel.classList.add('open');
    const ic = document.getElementById('infoCat');
    if (ic) { ic.textContent = (d?.cat || 'concept').toUpperCase(); ic.style.color = n.color; }
    const it = document.getElementById('infoTitle');
    if (it) it.textContent = n.key;
    const id = document.getElementById('infoDesc');
    if (id) id.textContent = d?.desc || 'Select expand to reveal constellation links.';
    const cc = document.getElementById('infoConns'); 
    if (cc) {
        cc.innerHTML = '';
        d?.conn.slice(0, 6).forEach(([ck]) => {
            const col = window.THINKDOTS.getColor(ck, aiGraph) || n.color;
            cc.innerHTML += `<div class="conn-item"><div class="conn-dot" style="background:${col}"></div><span>${ck}</span></div>`;
        });
    }
    focusOnNode(n);
    
    // Update Learn Button State
    const lb = document.getElementById('learnBtn');
    if (lb) {
        const isLearned = learnedNodes.has(n.key);
        lb.textContent = isLearned ? '✓ MASTERED' : 'MARK AS LEARNED';
        lb.style.background = isLearned ? '#00ff88' : 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))';
        lb.style.color = isLearned ? '#000' : '#fff';
    }
}

function toggleLearned() {
    if (!selectedNode) return;
    const k = selectedNode.key;
    if (learnedNodes.has(k)) learnedNodes.delete(k);
    else {
        learnedNodes.add(k);
        spawnBurst(selectedNode.x, selectedNode.y, '#00ff88');
    }
    localStorage.setItem('thinkdots-learned', JSON.stringify([...learnedNodes]));
    selectNode(selectedNode); // Refresh panel
    updateCounters();
}

document.getElementById('learnBtn').onclick = toggleLearned;
document.getElementById('closeBtn').onclick = () => { document.getElementById('infoPanel').classList.remove('open'); selectedNode = null; };
document.getElementById('expandBtn').onclick = () => { if (expandTarget) expandNode(expandTarget); };
document.getElementById('exploreBtn').onclick = explore;
document.getElementById('surpriseBtn').onclick = surprise;

const si = document.getElementById('seedInput'), sh = document.getElementById('searchHint');
if (si) {
    si.addEventListener('input', () => {
        const v = si.value.trim().toLowerCase();
        if (!v) { if (sh) sh.textContent = ''; return; }
        const match = Object.keys(window.THINKDOTS.KB).find(k => k.toLowerCase().startsWith(v));
        if (sh) sh.textContent = (match && match.toLowerCase() !== v) ? si.value + match.slice(v.length) : '';
    });
    si.addEventListener('keydown', e => {
        if (e.key === 'Enter') explore();
        if (e.key === 'Tab' && sh && sh.textContent) { e.preventDefault(); si.value = sh.textContent; sh.textContent = ''; }
    });
}

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') { document.getElementById('infoPanel').classList.remove('open'); selectedNode = null; }
});

function surprise() {
    const keys = Object.keys(window.THINKDOTS.KB);
    if (si) { si.value = keys[Math.floor(Math.random() * keys.length)]; explore(); }
}

async function explore() {
    const v = si ? si.value.trim() : ''; 
    if (!v) return;
    const btn = document.getElementById('exploreBtn');
    btn.disabled = true; btn.textContent = 'EXPLODING...';
    document.getElementById('aiStatus').classList.remove('off');
    document.getElementById('infoPanel').classList.remove('open');
    selectedNode = null; targetTransform.x = targetTransform.y = 0; targetTransform.scale = 1;
    try {
        const ai = await window.THINKDOTS.callGemini(v);
        window.THINKDOTS.buildGraphFromAI(ai, v, state);
    } catch (err) {
        if (!loadTopic(v)) alert('Concept not found.');
    } finally {
        btn.disabled = false; btn.textContent = 'EXPLORE';
        document.getElementById('aiStatus').classList.add('off');
    }
}

document.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => { if (si) { si.value = c.dataset.t; explore(); } });
});


function loop() { 
    drawBackground(); physics(); smoothCamera(); tickParticles(); drawGraph(); 
    requestAnimationFrame(loop); 
}

// Kickoff
initStars();
loop();

setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 1000);
    if (!localStorage.getItem('thinkdots-onboarded')) {
        const ob = document.getElementById('onboarding');
        if (ob) {
            ob.classList.add('active');
            document.getElementById('startBtn').onclick = () => {
                ob.classList.remove('active');
                localStorage.setItem('thinkdots-onboarded', 'true');
            };
        }
    }
}, 1600);
