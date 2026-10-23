// Contact playground: hovering contact objects you grab and throw at her. window.ReevaPlay.mount(el, {her, onHit, onGrab, onDrop}) -> api
(function () {
  const T3 = 'https://unpkg.com/three@0.160.0/build/three.module.js';
  const CN = 'https://unpkg.com/cannon-es@0.20.0/dist/cannon-es.js';
  async function mount(el, o) {
    o = o || {};
    const [THREE, C] = await Promise.all([import(T3), import(CN)]);
    try { await document.fonts.load('600 160px "Familjen Grotesk"'); await document.fonts.load('400 80px "Caveat Brush"'); } catch (e) {}
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setPixelRatio(Math.min(2, devicePixelRatio || 1)); r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
    const cv = r.domElement; cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none'; el.appendChild(cv);
    const labels = document.createElement('div'); labels.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden'; el.appendChild(labels);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(36, 1, .1, 100);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x553333, 1.15));
    const sun = new THREE.DirectionalLight(0xffffff, 1.5); sun.position.set(-5, 12, 8); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -6, near: 1, far: 40 }); scene.add(sun);
    const groundM = new THREE.Mesh(new THREE.PlaneGeometry(80, 20), new THREE.ShadowMaterial({ opacity: .2 })); groundM.rotation.x = -Math.PI / 2; groundM.receiveShadow = true; scene.add(groundM);

    const world = new C.World({ gravity: new C.Vec3(0, -34, 0) }); world.allowSleep = true;
    const pm = new C.Material('p'), hm = new C.Material('her');
    world.addContactMaterial(new C.ContactMaterial(pm, pm, { friction: .4, restitution: .3 }));
    world.addContactMaterial(new C.ContactMaterial(pm, hm, { friction: .05, restitution: .85 }));
    const plane = (pos, axis, ang) => { const b = new C.Body({ mass: 0, material: pm, shape: new C.Plane() }); b.position.set(...pos); b.quaternion.setFromAxisAngle(new C.Vec3(...axis), ang); world.addBody(b); return b; };
    const ground = plane([0, 0, 0], [1, 0, 0], -Math.PI / 2); plane([0, 0, -1.4], [0, 1, 0], 0); plane([0, 0, 1.4], [0, 1, 0], Math.PI);
    const left = plane([-8, 0, 0], [0, 1, 0], Math.PI / 2), right = plane([8, 0, 0], [0, 1, 0], -Math.PI / 2); plane([0, 40, 0], [1, 0, 0], Math.PI / 2);
    const her = new C.Body({ mass: 0, material: hm, shape: new C.Sphere(1) }); world.addBody(her);

    const cnv = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); draw(g, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return new THREE.MeshStandardMaterial({ map: t, roughness: .5 }); };
    const rr = (g, x, y, w, h, rad) => { g.beginPath(); g.moveTo(x + rad, y); g.arcTo(x + w, y, x + w, y + h, rad); g.arcTo(x + w, y + h, x, y + h, rad); g.arcTo(x, y + h, x, y, rad); g.arcTo(x, y, x + w, y, rad); g.closePath(); };
    const txt = (g, s, font, col, x, y) => { g.fillStyle = col; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); };
    const RED = '#D42A2E', CREAM = '#f4f1ea', INK = '#232323';
    const M = (c, ro) => new THREE.MeshStandardMaterial({ color: c, roughness: ro == null ? .5 : ro });
    const ink = new THREE.MeshBasicMaterial({ color: 0x141414, side: THREE.BackSide });
    const items = []; let U = 1;
    function add(kind, label, geo, mats, shape, mass) {
      const m = new THREE.Mesh(geo, mats); m.castShadow = true; const l = new THREE.Mesh(geo, ink); l.scale.setScalar(1.05); m.add(l); scene.add(m);
      const b = new C.Body({ mass, material: pm, shape, linearDamping: .02, angularDamping: .08, sleepSpeedLimit: .2 });
      b.kind = kind; b.lastHit = 0; world.addBody(b);
      const tag = document.createElement('div'); tag.textContent = label;
      tag.style.cssText = 'position:absolute;left:0;top:0;padding:7px 12px 6px;border-radius:999px;background:rgba(20,20,20,.82);border:1px solid rgba(255,255,255,.14);color:#fff;font:500 12px/1 "Familjen Grotesk",sans-serif;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;will-change:transform;transition:opacity .25s';
      labels.appendChild(tag);
      const it = { kind, m, b, tag, hover: true, spot: new THREE.Vector3(), ph: Math.random() * 6, half: geo.parameters.height / 2 }; m.userData.it = it; items.push(it); return it;
    }
    const tile = (bg, draw) => cnv(256, 256, (g, w, h) => { g.fillStyle = typeof bg === 'function' ? bg(g, w, h) : bg; g.fillRect(0, 0, w, h); draw(g, w, h); });
    const rounded = (sz, dep) => { const r0 = sz * .22, h = sz / 2, sh = new THREE.Shape(); sh.moveTo(-h + r0, -h); sh.lineTo(h - r0, -h); sh.quadraticCurveTo(h, -h, h, -h + r0); sh.lineTo(h, h - r0); sh.quadraticCurveTo(h, h, h - r0, h); sh.lineTo(-h + r0, h); sh.quadraticCurveTo(-h, h, -h, h - r0); sh.lineTo(-h, -h + r0); sh.quadraticCurveTo(-h, -h, -h + r0, -h);
      const g = new THREE.ExtrudeGeometry(sh, { depth: dep, bevelEnabled: true, bevelThickness: dep * .2, bevelSize: sz * .02, bevelSegments: 3, curveSegments: 10 }); g.center();
      const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / sz + .5, uv.getY(i) / sz + .5); g.parameters.height = sz; return g; };
    const icon = (kind, label, face, sideC, s, d) => { const sd = M(sideC, .45); add(kind, label, rounded(s, d), [face, sd], new C.Box(new C.Vec3(s / 2, s / 2, d / 2 + d * .2)), .6); };
    function build() {
      items.forEach(it => { scene.remove(it.m); world.removeBody(it.b); it.tag.remove(); }); items.length = 0;
      const s = 1.3 * U, d = .24 * U, box = (w, h, dd) => new THREE.BoxGeometry(w, h, dd);
      { const w = 2.1 * U, h = 1.4 * U, dd = .16 * U;
        const front = cnv(384, 256, (g, W, H) => { g.fillStyle = CREAM; g.fillRect(0, 0, W, H); g.strokeStyle = '#cfc6b4'; g.lineWidth = 6; g.beginPath(); g.moveTo(10, 14); g.lineTo(W / 2, H * .58); g.lineTo(W - 10, 14); g.stroke(); g.fillStyle = RED; g.beginPath(); g.arc(W / 2, H * .58, 40, 0, 7); g.fill(); txt(g, '@', '600 52px "Familjen Grotesk", sans-serif', '#fff', W / 2, H * .58 + 2); });
        const sd = M(CREAM, .7); add('mail', 'Email', box(w, h, dd), [sd, sd, sd, sd, front, sd], new C.Box(new C.Vec3(w / 2, h / 2, dd / 2)), .7); }
      const side = c => M(c, .45);
      { const f = tile('#0a66c2', (g, w, h) => txt(g, 'in', '700 150px "Familjen Grotesk", sans-serif', '#fff', w / 2, h / 2 + 6)); icon('token:LinkedIn', 'LinkedIn', f, '#084e96', s, d); }
      { const f = tile('#1769ff', (g, w, h) => txt(g, 'Bē', '700 128px "Familjen Grotesk", sans-serif', '#fff', w / 2, h / 2 + 4)); icon('token:Behance', 'Behance', f, '#1150c4', s, d); }
      { const f = tile((g, w, h) => { const gr = g.createLinearGradient(0, h, w, 0); gr.addColorStop(0, '#feda75'); gr.addColorStop(.35, '#fa7e1e'); gr.addColorStop(.65, '#d62976'); gr.addColorStop(1, '#4f5bd5'); return gr; }, (g, w, h) => { g.strokeStyle = '#fff'; g.lineWidth = 16; rr(g, 58, 58, 140, 140, 40); g.stroke(); g.beginPath(); g.arc(128, 128, 34, 0, 7); g.stroke(); g.fillStyle = '#fff'; g.beginPath(); g.arc(170, 86, 10, 0, 7); g.fill(); });
        icon('token:Instagram', 'Instagram', f, '#b02a78', s, d); }
      { const w = 1.3 * U, h = 1.75 * U, dd = .06 * U;
        const f = cnv(260, 350, (g, W, H) => { g.fillStyle = '#fbf9f4'; g.fillRect(0, 0, W, H); g.fillStyle = RED; g.fillRect(0, 0, W, 64); txt(g, 'REEVA · CV', '600 26px "Familjen Grotesk", sans-serif', '#fff', W / 2, 34); g.fillStyle = '#d9d3c6'; [100, 128, 156, 200, 228, 256, 300].forEach((y, i) => g.fillRect(24, y, i % 3 === 2 ? 120 : W - 48, 10)); });
        const sd = M('#fbf9f4', .8); add('token:Résumé', 'Résumé', box(w, h, dd), [sd, sd, sd, sd, f, sd], new C.Box(new C.Vec3(w / 2, h / 2, dd / 2)), .4); }
      { const f = tile(INK, (g, w, h) => { txt(g, 'call', "400 92px 'Caveat Brush', cursive", '#fff', w / 2, h / 2 - 8); g.fillStyle = RED; g.beginPath(); g.arc(w / 2, h / 2 + 62, 10, 0, 7); g.fill(); });
        icon('token:Phone', 'Phone', f, '#111111', s, d); }
      layoutSpots(); tidy();
    }
    let W = 0, H = 0, hw = 8, topY = 8;
    function layoutArc() {
      const n = items.length, hx = her.position.x, hy = her.position.y, hr = her.shapes[0].radius, Rx = Math.min(hw - 1.2 * U, hr * 2.9 + 1.6 * U), Ry = Math.max(hr * 1.4, Math.min(topY - hy, hr * 2.6 + 1.6 * U));
      items.forEach((it, i) => { const a = Math.PI * (.93 - .86 * i / (n - 1)); it.spot.set(hx + Math.cos(a) * Rx, hy + Math.sin(a) * Ry - .2 * U, 0); });
    }
    function layoutSpots() {
      const n = items.length, two = hw < 5.2, per = two ? 3 : n, gy = ground.position.y, span = Math.min(hw * .8, 6.5 * U);
      items.forEach((it, i) => {
        const row = two ? Math.floor(i / per) : 0, col = two ? i % per : i, cnt = two ? per : n;
        const x = cnt > 1 ? -span + col * (2 * span / (cnt - 1)) : 0;
        const y = gy + (topY - gy) * (two ? (row ? .34 : .56) : .5);
        it.spot.set(x, y, 0);
      });
    }
    function tidy() { items.forEach(it => { it.hover = true; const b = it.b; b.position.copy(it.spot); b.position.y += 6; b.velocity.set(0, 0, 0); b.angularVelocity.set(0, 0, 0); b.quaternion.set(0, 0, 0, 1); b.wakeUp(); }); }
    function shake() { items.forEach(it => { it.hover = false; it.b.wakeUp(); it.b.applyImpulse(new C.Vec3((Math.random() - .5) * 10 * it.b.mass, (12 + Math.random() * 8) * it.b.mass, 0), it.b.position); it.b.angularVelocity.set((Math.random() - .5) * 10, (Math.random() - .5) * 10, (Math.random() - .5) * 6); }); }

    const ray = new THREE.Raycaster(), nd = new THREE.Vector2(), v3 = new THREE.Vector3(), v4 = new THREE.Vector3();
    const toWorld = (cx, cy, z) => { const b = cv.getBoundingClientRect(); nd.set((cx - b.left) / b.width * 2 - 1, -((cy - b.top) / b.height) * 2 + 1); ray.setFromCamera(nd, cam); const d = ray.ray.direction, oo = ray.ray.origin, t = (z - oo.z) / d.z; return new THREE.Vector3(oo.x + d.x * t, oo.y + d.y * t, z); };
    const toScreen = p => { v3.copy(p).project(cam); return { x: (v3.x + 1) / 2 * W, y: (1 - v3.y) / 2 * H }; };
    function resize() {
      const b = el.getBoundingClientRect(); if (b.width < 2 || (b.width === W && b.height === H)) return; W = b.width; H = b.height;
      r.setSize(W, H, false); cam.aspect = W / H; cam.position.set(0, 4.6, W < 700 ? 22 : 17); cam.lookAt(0, 3.4, 0); cam.updateProjectionMatrix(); cam.updateMatrixWorld(true);
      const gy = toWorld(b.left + W / 2, b.bottom - Math.max(24, H * .06), 1.4).y; ground.position.y = gy; groundM.position.y = gy;
      hw = toWorld(b.right - 2, b.bottom - 2, 0).x; left.position.x = -hw + .1; right.position.x = hw - .1; topY = toWorld(b.left + W / 2, b.top + Math.max(H * .3, 230), 0).y;
      const nU = Math.max(.62, Math.min(1.1, hw / 7.5)); if (Math.abs(nU - U) > .04 || !items.length) { U = nU; build(); } else layoutSpots();
    }

    let grab = null; const joint = new C.Body({ mass: 0 }); joint.collisionFilterGroup = 0; joint.collisionFilterMask = 0; world.addBody(joint);
    const pick = e => { const b = cv.getBoundingClientRect(); nd.set((e.clientX - b.left) / b.width * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); ray.setFromCamera(nd, cam); const h = ray.intersectObjects(items.map(i => i.m), false)[0]; return h ? { it: h.object.userData.it, point: h.point } : null; };
    const down = e => {
      const h = pick(e); if (!h) return; e.preventDefault(); cv.setPointerCapture && cv.setPointerCapture(e.pointerId);
      const it = h.it, b = it.b, p = h.point; it.hover = false; b.wakeUp();
      const lp = b.quaternion.inverse().vmult(new C.Vec3(p.x - b.position.x, p.y - b.position.y, p.z - b.position.z));
      joint.position.set(p.x, p.y, p.z); const c = new C.PointToPointConstraint(b, lp, joint, new C.Vec3(0, 0, 0), 90); world.addConstraint(c);
      grab = { it, c, z: p.z }; cv.style.cursor = 'grabbing'; o.onGrab && o.onGrab(it.kind);
    };
    const move = e => { if (grab) { const p = toWorld(e.clientX, e.clientY, grab.z); joint.position.set(p.x, Math.max(ground.position.y + .3, p.y), p.z); grab.it.b.wakeUp(); } else if (e.target === cv) cv.style.cursor = pick(e) ? 'grab' : ''; };
    const up = () => { if (!grab) return; world.removeConstraint(grab.c); const k = grab.it.kind; grab = null; cv.style.cursor = ''; o.onDrop && o.onDrop(k); };
    cv.addEventListener('pointerdown', down); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);

    her.addEventListener('collide', e => {
      const b = e.body; if (!b.kind) return; const v = Math.abs(e.contact.getImpactVelocityAlongNormal()), t = performance.now();
      if (v < 2.5 || t - b.lastHit < 350) return; b.lastHit = t;
      const cb = cv.getBoundingClientRect(), sp = toScreen(v4.set(b.position.x, b.position.y, b.position.z));
      o.onHit && o.onHit(b.kind, v, { x: cb.left + sp.x, y: cb.top + sp.y, dx: Math.sign(b.velocity.x || (b.position.x - her.position.x)) || 1 });
    });

    let raf, dead = false, last = performance.now();
    function syncHer() { const h = o.her && o.her(); if (!h) return; const b = h.getBoundingClientRect(); if (b.width < 2) return; const c = toWorld(b.left + b.width / 2, b.top + b.height * .45, 0), e2 = toWorld(b.left + b.width * .82, b.top + b.height * .45, 0); her.shapes[0].radius = Math.abs(e2.x - c.x); her.shapes[0].updateBoundingSphereRadius(); her.updateBoundingRadius(); her.position.set(c.x, c.y, 0); }
    function loop() {
      if (dead) return; raf = requestAnimationFrame(loop);
      const b = el.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight) return;
      resize(); syncHer(); layoutArc();
      const t = performance.now(), dt = Math.min(.05, (t - last) / 1000); last = t;
      items.forEach(it => { if (!it.hover) return; const bb = it.b, tg = it.spot, ph = t / 1000 + it.ph; bb.position.x += (tg.x - bb.position.x) * .12; bb.position.y += (tg.y + Math.sin(ph * 1.6) * .12 - bb.position.y) * .12; bb.position.z += (0 - bb.position.z) * .12; bb.velocity.set(0, 0, 0); bb.angularVelocity.set(0, 0, 0); bb.quaternion.setFromEuler(Math.sin(ph) * .06, Math.sin(ph * .8) * .25, Math.sin(ph * 1.2) * .05); });
      world.step(1 / 60, dt, 4);
      items.forEach(it => {
        const p = it.b.position; if (p.y < ground.position.y - 2 || Math.abs(p.x) > hw + 2) { it.hover = true; p.set(it.spot.x, it.spot.y + 6, 0); it.b.velocity.set(0, 0, 0); }
        it.m.position.copy(p); it.m.quaternion.copy(it.b.quaternion);
        const s = toScreen(v4.set(p.x, p.y - it.half * 1.25 - .2 * U, p.z)); it.tag.style.transform = `translate(${s.x}px,${s.y}px) translate(-50%,0)`; it.tag.style.opacity = grab && grab.it === it ? 0 : it.hover ? 1 : .7;
      });
      r.render(scene, cam);
    }
    loop();
    return {
      shake, tidy,
      look() {
        let best = grab ? grab.it : null, bv = 4;
        if (!best) items.forEach(it => { if (it.hover) return; const s = it.b.velocity.length(); if (s > bv) { bv = s; best = it; } });
        if (!best) return null; const s = toScreen(best.m.position), bb = cv.getBoundingClientRect(); return { x: bb.left + s.x, y: bb.top + s.y };
      },
      dispose() { dead = true; cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); r.dispose(); cv.remove(); labels.remove(); },
    };
  }
  window.ReevaPlay = { mount };
})();
