// Reeva character: flat toon-shaded head with ink outlines. window.ReevaFace.mount(el, opts) -> api
(function () {
  const SRC = 'https://unpkg.com/three@0.160.0/build/three.module.js';
  let TP = null;
  const P = { x: innerWidth / 2, y: innerHeight / 2 };
  addEventListener('mousemove', e => { P.x = e.clientX; P.y = e.clientY; }, { passive: true });
  addEventListener('touchmove', e => { const t = e.touches[0]; if (t) { P.x = t.clientX; P.y = t.clientY; } }, { passive: true });
  const L = (a, b, t) => a + (b - a) * t, C = (v, a, b) => Math.max(a, Math.min(b, v)), S = t => t * t * (3 - 2 * t);

  async function mount(el, o) {
    o = o || {};
    const THREE = await (TP || (TP = import(SRC)));
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: !!o.preserve });
    r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(10, 10, false);
    r.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    el.appendChild(r.domElement);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, .1, 50); cam.position.z = o.camZ || 6.4;
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(-2, 3, 4); scene.add(key);
    const gm = new THREE.DataTexture(new Uint8Array([120, 120, 120, 255, 200, 200, 200, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
    gm.minFilter = gm.magFilter = THREE.NearestFilter; gm.needsUpdate = true;
    const T = c => new THREE.MeshToonMaterial({ color: c, gradientMap: gm });
    const B = c => new THREE.MeshBasicMaterial({ color: c });
    const INK = new THREE.MeshBasicMaterial({ color: 0x141414, side: THREE.BackSide });
    const mk = (par, geo, c, p, w) => {
      const m = new THREE.Mesh(geo, T(c)); if (p) m.position.set(p[0], p[1], p[2]);
      if (w !== 0) { geo.computeBoundingSphere(); const l = new THREE.Mesh(geo, INK); l.scale.multiplyScalar(1 + (w || .035) / geo.boundingSphere.radius); m.add(l); }
      par.add(m); return m;
    };
    // a warm skin, near-black hair with just enough lift for the toon bands to read, and finer ink lines than before
    const SK = 0xf4e4d2, HAIR = 0x262120;
    const root = new THREE.Group(); scene.add(root); root.position.y = .2; const FIT = .8;
    const head = new THREE.Group(); root.add(head);
    const skull = mk(head, new THREE.SphereGeometry(1, 48, 36), SK, null, .032); skull.scale.set(1, 1.08, .98);
    const shell = mk(head, new THREE.SphereGeometry(1.05, 48, 32, Math.PI / 2 + 1.25, Math.PI * 2 - 2.5, 0, Math.PI * .8), HAIR, null, .022); shell.scale.set(1, 1.08, .98);
    const crown = mk(head, new THREE.SphereGeometry(1.055, 48, 12, 0, Math.PI * 2, 0, Math.PI * .2), HAIR, null, .022); crown.scale.set(1, 1.08, .98);
    const bangs = mk(head, new THREE.SphereGeometry(1.075, 48, 12, Math.PI / 2 - 1.3, 2.6, Math.PI * .12, Math.PI * .24), HAIR, null, .022); bangs.scale.set(1, 1.08, .98);
    [-1, 1].forEach(s => { const lk = mk(head, new THREE.CapsuleGeometry(.19, 1.6, 6, 14), HAIR, [s * .86, -.66, .3], .022); lk.rotation.z = s * .07; lk.rotation.x = -.1; });
    const back = mk(head, new THREE.CapsuleGeometry(.7, .8, 8, 20), HAIR, [0, -1.05, -.38], .022); back.scale.set(1.12, 1, .42);
    const INKB = B(0x1a1414);
    [-1, 1].forEach(s => {
      const lid = new THREE.Mesh(new THREE.TorusGeometry(.215, .019, 6, 28, Math.PI * .9), INKB); lid.position.set(s * .33, .07, .87); lid.rotation.set(-.3, 0, Math.PI * .05); head.add(lid);
      const l = new THREE.Mesh(new THREE.CapsuleGeometry(.014, .07, 4, 6), INKB); l.position.set(s * .54, .18, .78); l.rotation.z = -s * 1.05; head.add(l);
    });
    const eyes = [-1, 1].map(s => {
      const g = new THREE.Group(); g.position.set(s * .33, .06, .8); head.add(g);
      mk(g, new THREE.SphereGeometry(.21, 28, 20), 0xfffcf7, null, .016);
      const ir = new THREE.Mesh(new THREE.SphereGeometry(.145, 24, 18), B(0x4a2a18)); ir.position.z = .1; g.add(ir);
      const p = new THREE.Mesh(new THREE.SphereGeometry(.08, 16, 12), B(0x140d0a)); p.position.z = .19; g.add(p);
      const gl = new THREE.Mesh(new THREE.SphereGeometry(.04, 10, 10), B(0xffffff)); gl.position.set(.055, .065, .262); g.add(gl);
      const gl2 = new THREE.Mesh(new THREE.SphereGeometry(.018, 8, 8), B(0xffffff)); gl2.position.set(-.045, -.055, .262); g.add(gl2);
      return g;
    });
    const brows = [-1, 1].map(s => {
      const b = new THREE.Group(); b.position.set(s * .33, .42, .9); b.userData.s = s; head.add(b);
      const arc = new THREE.Mesh(new THREE.TorusGeometry(.16, .021, 8, 24, Math.PI * .5), B(0x2f211b)); arc.rotation.z = Math.PI * .25; arc.position.y = -.12; b.add(arc);
      return b;
    });
    const nose = mk(head, new THREE.SphereGeometry(.06, 16, 12), SK, [0, -.15, 1.0], .016); nose.scale.set(.9, .85, 1);
    [-1, 1].forEach(s => { const ch = new THREE.Mesh(new THREE.CircleGeometry(.105, 28), new THREE.MeshBasicMaterial({ color: 0xf2a49a, transparent: true, opacity: .75 })); ch.position.set(s * .54, -.2, .84); ch.lookAt(s * 1.7, -.6, 2.5); ch.scale.set(1.25, .85, 1); head.add(ch); });
    // one clean smile line; the open mouth on a click comes from scaling it, as before
    const mouth = new THREE.Mesh(new THREE.TorusGeometry(.11, .028, 10, 28, Math.PI), B(0xb8202c)); mouth.rotation.z = Math.PI; mouth.position.set(0, -.36, .93); mouth.rotation.x = -.2; head.add(mouth);
    const pencil = new THREE.Group(); pencil.position.set(.98, .45, -.1); pencil.rotation.set(.2, 0, -.95); head.add(pencil);
    mk(pencil, new THREE.CylinderGeometry(.07, .07, 1.1, 6), 0xf5d33f, null, .025);
    mk(pencil, new THREE.ConeGeometry(.07, .2, 6), 0xeadbc0, [0, .65, 0], .02);
    mk(pencil, new THREE.CylinderGeometry(.07, .07, .14, 12), 0xD42A2E, [0, -.62, 0], .02);
    const NC = [0xf5d33f, 0xD42A2E, 0xffffff, 0xEE7A22, 0xf5d33f];
    const NP = [[-.4, .22, .48], [.42, .16, .48], [0, -.4, .48], [-.62, -.32, .26], [.62, -.42, .26]];
    const notes = NP.map(([x, y, sz], i) => {
      const n = mk(head, new THREE.BoxGeometry(sz, sz, .02), NC[i], null, .015);
      const z = -Math.sqrt(Math.max(.05, 1 - x * x - (y / 1.08) * (y / 1.08))) * 1.11;
      n.position.set(x, y, z); n.lookAt(x * 3, y * 3, z * 3); const rz = (i % 2 ? 1 : -1) * (.08 + i * .04); n.rotateZ(rz);
      n.userData.size = sz; n.userData.rz = rz; return n;
    });

    const ray = new THREE.Raycaster(), hray = new THREE.Raycaster(), nd = new THREE.Vector2(), hd = new THREE.Vector2(), tgt = new THREE.Vector3(), v = new THREE.Vector3(), sz2 = new THREE.Vector2();
    let dead = false, nb = 1.5, bt = -9;
    const t0 = performance.now(), now = () => (performance.now() - t0) / 1000;
    const api = {
      el, root, head, notes, pencil, hit: false, look: null,
      t: { flip: 0, glassesOff: 0, squint: 0, rotY: 0, rotX: 0, tilt: 0, wide: 0, scale: 1, wiggle: 0 },
      c: { flip: 0, glassesOff: 0, squint: 0, rotY: 0, rotX: 0, tilt: 0, wide: 0, scale: 0, wiggle: 0 },
      sq: 0, sqv: 0, kv: 0, ly: 0, lx: 0, spinAt: -9,
      kick() { this.sqv = -.22; this.kv = 1; },
      spin() { this.spinAt = now(); },
      noteScreen(i) {
        const n = notes[i], b = el.getBoundingClientRect(); n.getWorldPosition(v); const p = v.clone().project(cam);
        const e = new THREE.Vector3(n.userData.size / 2, 0, 0); n.localToWorld(e); e.project(cam);
        return { x: b.left + (p.x + 1) / 2 * b.width, y: b.top + (1 - p.y) / 2 * b.height, w: Math.hypot((e.x - p.x) * b.width / 2, (e.y - p.y) * b.height / 2), rot: n.userData.rz };
      },
      dispose() { dead = true; r.dispose(); r.domElement.remove(); }
    };
    const step = () => {
      const b = el.getBoundingClientRect();
      if (b.width < 2 || b.bottom < 0 || b.top > innerHeight || b.right < 0 || b.left > innerWidth) { api.hit = false; return; }
      const W = Math.round(b.width), H = Math.round(b.height), s = r.getSize(sz2);
      if (s.x !== W || s.y !== H) { r.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); }
      const t = now(), c = api.c, tt = api.t;
      for (const k in tt) c[k] = L(c[k], tt[k], k === 'flip' ? .07 : k === 'glassesOff' ? .06 : .09);
      hd.set((P.x - b.left) / W * 2 - 1, -((P.y - b.top) / H) * 2 + 1); hray.setFromCamera(hd, cam);
      api.hit = Math.abs(hd.x) <= 1 && Math.abs(hd.y) <= 1 && c.scale > .3 && hray.intersectObject(skull).length > 0;
      const lp = api.look || P;
      nd.set((lp.x - b.left) / W * 2 - 1, -((lp.y - b.top) / H) * 2 + 1); ray.setFromCamera(nd, cam);
      tgt.copy(ray.ray.direction).multiplyScalar(cam.position.z - 1.4).add(ray.ray.origin);
      const rs = root.scale.x || 1;
      api.ly = L(api.ly, C(tgt.x / rs * .2, -.6, .6), .08); api.lx = L(api.lx, C(tgt.y / rs * .16, -.4, .4), .08);
      const fl = S(C(c.flip, 0, 1));
      head.rotation.y = fl * Math.PI + api.ly * (1 - 2 * fl) + c.rotY;
      head.rotation.x = -api.lx + c.rotX;
      head.rotation.z = Math.sin(t * .7) * .04 + c.tilt;
      root.rotation.y = S(C((t - api.spinAt) / 1.3, 0, 1)) * Math.PI * 4;
      if (t > nb) { bt = t; nb = t + 2.5 + Math.random() * 3; }
      const bl = t - bt < .15 ? .1 : 1;
      eyes.forEach(e => { e.lookAt(tgt); e.scale.set(1 + c.wide * .15, bl * (1 - c.squint * .55) * (1 + c.wide * .2), 1); });
      api.sqv += -api.sq * .22 - api.sqv * .14; api.sq += api.sqv;
      head.scale.set(1 - api.sq * .5, 1 + api.sq, 1 - api.sq * .5);
      api.kv = L(api.kv, 0, .05);
      const raise = api.kv * .14 + (api.hit ? .05 : 0) + c.wide * .08 - c.squint * .05;
      brows.forEach(x => { x.position.y = L(x.position.y, .42 + raise, .2); x.rotation.z = -x.userData.s * (.12 - api.kv * .3 + c.squint * .18); });
      mouth.scale.set(1 - api.kv * .2, 1 + api.kv * 2.2 + (api.hit ? .5 : 0), 1);
            pencil.rotation.z = -.95 + Math.sin(t * 16) * .3 * c.wiggle; pencil.position.z = -.1 + c.wiggle * .5;
      root.scale.setScalar(Math.max(.001, c.scale * FIT));
      o.onFrame && o.onFrame(api, t);
      r.render(scene, cam);
    };
    const loop = () => { if (dead) return; requestAnimationFrame(loop); step(); };
    api.step = step;
    loop();
    return api;
  }
  window.ReevaFace = { mount };
})();
