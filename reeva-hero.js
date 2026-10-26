// Shared hero interactions.
// The diagram is a three-stop dial for how strategy (the why) and design (the how) relate:
// apart -> overlap (where why meets how) -> one (one practice).
// Merging them turns the headline to "Thinking and making, in one practice."
(function () {
  const L = (a, b, t) => a + (b - a) * t, C = (v, a, b) => Math.max(a, Math.min(b, v));
  const G = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#&%';
  const NONE = 'linear-gradient(transparent,transparent)';
  const circ = (r, x, y) => `radial-gradient(circle ${r.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px,#000 97%,transparent 100%)`;
  const STOPS = [{ k: 'apart', s: 186 }, { k: 'overlap', s: 106.4 }, { k: 'one', s: 0 }];
  const CAP = { apart: 'a why with no how stays on paper. a how with no why is a guess', overlap: 'most of my work lives here, in the middle', one: 'in the end, both ask one thing: does it help someone?' };

  function scramble(el, to) {
    let f = 0; clearInterval(el._s);
    el._s = setInterval(() => {
      f++; el.textContent = f >= 18 ? to : to.split('').map((c, i) => c === ' ' || i < f / 1.4 ? c : G[(Math.random() * G.length) | 0]).join('');
      if (f >= 18) clearInterval(el._s);
    }, 40);
  }

  function mount(root, o) {
    o = o || {};
    let dead = false, full = null, FR = 0;
    const q = s => root.querySelector(s), qa = s => [...root.querySelectorAll(s)];
    const M = { x: -9999, y: -9999 };
    const mv = e => { const p = e.touches ? e.touches[0] : e; if (p) { M.x = p.clientX; M.y = p.clientY; } };
    addEventListener('pointermove', mv, { passive: true });
    const venn = q('[data-venn]'), vq = s => venn ? venn.querySelector(s) : null, cA = vq('[data-ca]'), cB = vq('[data-cb]'), ghost = vq('[data-ghost]');
    const la = vq('[data-la]'), lb = vq('[data-lb]'), lc = vq('[data-lc]'), vline = vq('[data-vline]'), rv = q('[data-reveal-layer]'), dots = q('[data-dots]');
    const stops = venn ? [...venn.querySelectorAll('[data-stop]')] : [];
    const nl = qa('[data-nl]'), nl2 = qa('[data-nl2]'), mags = qa('[data-mag]'), fw = qa('[data-fw]'), cyc = q('[data-cycle]');
    if (ghost) ghost.style.display = 'none';

    const V = { sep: 420, v: 0, target: 106.4, D: null, state: 'overlap' };
    const toV = (cx, cy) => { const b = venn.getBoundingClientRect(); return { x: (cx - b.left) * 560 / b.width, y: (cy - b.top) * 560 / b.width, s: b.width / 560 }; };
    const nearest = s => STOPS.reduce((a, b) => Math.abs(b.s - s) < Math.abs(a.s - s) ? b : a);

    const api = {
      get lens() { return false; }, setLens() {},
      setFull(on, x, y) { full = on ? { x, y } : null; },
      dispose() { dead = true; removeEventListener('pointermove', mv); removeEventListener('pointerup', up); clearInterval(cyc && cyc._iv); }
    };

    const down = e => {
      const p = toV(e.clientX, e.clientY), r = 173.6;
      const inA = Math.hypot(p.x - (280 - V.sep), p.y - 201) < r, inB = Math.hypot(p.x - (280 + V.sep), p.y - 201) < r;
      if (!inA && !inB) return;
      M.x = e.clientX; M.y = e.clientY;
      V.D = { x: e.clientX, y: e.clientY, off: Math.abs(p.x - 280) - V.sep, moved: false };
      try { venn.setPointerCapture(e.pointerId); } catch (x) {}
      e.preventDefault();
    };
    const up = () => {
      const D = V.D; V.D = null; if (!D) return;
      if (D.moved) { V.target = nearest(V.sep).s; return; }
      const i = STOPS.findIndex(s => s.k === V.state); V.target = STOPS[(i + 1) % STOPS.length].s;
    };
    if (venn) { venn.addEventListener('pointerdown', down); venn.addEventListener('pointermove', mv); venn.addEventListener('dragstart', e => e.preventDefault()); }
    addEventListener('pointerup', up); addEventListener('pointercancel', up);
    stops.forEach(b => b.addEventListener('click', () => { V.target = +b.dataset.stop; }));

    // name letters: click to bounce
    const lo = nl.map((n, i) => ({ x: 0, y: 60, vx: 0, vy: 0, born: .3 + i * .09 }));
    nl.forEach((n, i) => n.addEventListener('pointerdown', () => { lo[i].vy -= 26; lo[i].vx += (Math.random() - .5) * 10; }));

    // headline phrases: each turns over to its other side
    const words = fw.map((w, i) => {
      const A = w.dataset.a, B = w.dataset.b, ca = w.dataset.colA || '', cb = w.dataset.colB || '#D42A2E';
      const st = { side: 0, hover: 0, hold: 0, busy: false };
      w.style.transform = 'rotateX(-90deg)'; w.style.opacity = '0';
      setTimeout(() => { w.style.transition = 'transform .55s cubic-bezier(.3,1.6,.5,1), opacity .3s'; w.style.transform = 'none'; w.style.opacity = '1'; }, 650 + i * 140);
      const sync = () => {
        const want = st.hover || st.hold ? 1 : 0;
        if (st.busy || st.side === want) return; st.busy = true;
        w.style.transition = 'transform .16s ease-in'; w.style.transform = 'rotateX(90deg)';
        setTimeout(() => {
          st.side = want; w.textContent = want ? B : A; w.style.color = want ? cb : ca;
          w.style.transition = 'transform .45s cubic-bezier(.3,1.6,.5,1)'; w.style.transform = 'none';
          setTimeout(() => { st.busy = false; sync(); }, 450);
        }, 160);
      };
      w.addEventListener('pointerenter', () => { st.hover = 1; sync(); clearTimeout(w._t); w._t = setTimeout(() => { st.hover = 0; sync(); }, 2200); });
      return { st, sync };
    });
    const holdWords = on => words.forEach((w, i) => { if (w.st.hold === (on ? 1 : 0)) return; setTimeout(() => { w.st.hold = on ? 1 : 0; w.sync(); }, i * 110); });

    if (cyc) { const ws = cyc.dataset.cycle.split('|'); let i = 0; cyc._iv = setInterval(() => { i = (i + 1) % ws.length; scramble(cyc, ws[i]); }, 3400); }

    const mag = mags.map(() => ({ x: 0, y: 0 }));
    const ctx = dots && dots.getContext('2d');
    const t0 = performance.now();

    const loop = () => {
      if (dead) return; requestAnimationFrame(loop);
      const t = (performance.now() - t0) / 1000, hb = root.getBoundingClientRect();
      const onScreen = hb.bottom > 0 && hb.top < innerHeight;
      const inHero = M.y > hb.top && M.y < hb.bottom && M.x > hb.left && M.x < hb.right;
      const mx = M.x - hb.left, my = M.y - hb.top;

      FR = L(FR, full ? Math.hypot(hb.width, hb.height) : 0, .06);
      if (rv) rv.style.webkitMaskImage = rv.style.maskImage = FR > .5 && full ? circ(FR, full.x - hb.left, full.y - hb.top) : NONE;
      if (!onScreen) return;

      if (venn) {
        const P = toV(M.x, M.y), D = V.D;
        if (D && !D.moved && Math.hypot(M.x - D.x, M.y - D.y) > 4) D.moved = true;
        if (D && D.moved) V.target = C(Math.abs(P.x - 280) - D.off, 0, 196);
        V.v += (V.target - V.sep) * (D ? .35 : .12); V.v *= D ? .5 : .72; V.sep += V.v;
        const sep = V.sep, ax = 280 - sep, bx = 280 + sep;
        const set = (n, x) => { if (n) n.setAttribute('cx', x.toFixed(1)); };
        set(cA, ax); set(cB, bx);
        const state = nearest(sep).k;
        if (state !== V.state) { V.state = state; holdWords(state === 'one'); }
        const r = 173.6, inA = Math.hypot(P.x - ax, P.y - 201) < r, inB = Math.hypot(P.x - bx, P.y - 201) < r;
        const lo2 = C((sep - 50) / 45, 0, 1).toFixed(2);
        if (la) { la.style.transform = `translate(calc(${(ax - r * .62) * P.s}px - 50%),${184 * P.s}px)`; la.style.opacity = lo2; }
        if (lb) { lb.style.transform = `translate(calc(${(bx + r * .62) * P.s}px - 50%),${184 * P.s}px)`; lb.style.opacity = lo2; }
        if (lc) {
          const html = sep < 40 ? 'one<br>practice' : 'where why<br>meets how';
          if (lc.innerHTML !== html) lc.innerHTML = html;
          lc.style.opacity = C((176 - sep) / 30, 0, 1).toFixed(2);
          lc.style.transform = `translate(${280 * P.s}px,${201 * P.s}px) translate(-50%,-50%) scale(${sep < 40 ? 1.3 : 1})`;
        }
        if (vline) { const txt = D && D.moved ? 'let go to snap' : CAP[state]; if (vline.textContent !== txt) vline.textContent = txt; vline.style.color = state === 'one' ? '#D42A2E' : '#CAC3B8'; }
        stops.forEach(b => { const on = nearest(+b.dataset.stop).k === state; b.style.background = on ? '#D42A2E' : 'transparent'; b.style.color = on ? '#F4EFE6' : '#CAC3B8'; });
        venn.style.cursor = D && D.moved ? 'grabbing' : inA || inB ? 'grab' : 'default';
      }

      nl.forEach((n, i) => {
        const s = lo[i], bb = n.getBoundingClientRect(), cx = bb.left + bb.width / 2 - s.x, cy = bb.top + bb.height / 2 - s.y;
        const dx = cx - M.x, dy = cy - M.y, dd = Math.hypot(dx, dy) || 1, R = bb.height * 1.5;
        let tx = 0, ty = 0;
        if (t < s.born) ty = 60; else if (dd < R) { const f = Math.pow(1 - dd / R, 2) * bb.height * .55; tx = dx / dd * f; ty = dy / dd * f; }
        s.vx += (tx - s.x) * .1; s.vy += (ty - s.y) * .1; s.vx *= .78; s.vy *= .78; s.x += s.vx; s.y += s.vy;
        const tr = `translate(${s.x.toFixed(1)}px,${s.y.toFixed(1)}px) rotate(${(s.vx * 1.6).toFixed(1)}deg)`;
        n.style.transform = tr; n.style.opacity = t < s.born ? 0 : 1; if (nl2[i]) nl2[i].style.transform = tr;
      });

      mags.forEach((el, i) => {
        const g = mag[i], bb = el.getBoundingClientRect(), dx = M.x - (bb.left + bb.width / 2 - g.x), dy = M.y - (bb.top + bb.height / 2 - g.y);
        const k = Math.hypot(dx, dy) < Math.max(bb.width, bb.height) * .8 + 20 ? .3 : 0;
        g.x = L(g.x, dx * k, .15); g.y = L(g.y, dy * k, .15); el.style.transform = `translate(${g.x.toFixed(1)}px,${g.y.toFixed(1)}px)`;
      });

      if (ctx) {
        const dpr = Math.min(devicePixelRatio, 1.5), W = Math.round(hb.width), H = Math.round(hb.height);
        if (dots.width !== Math.round(W * dpr) || dots.height !== Math.round(H * dpr)) { dots.width = Math.round(W * dpr); dots.height = Math.round(H * dpr); }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
        const S = 30, RR = 150;
        for (let y = S / 2; y < H; y += S) for (let x = S / 2; x < W; x += S) {
          const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy);
          let px = x, py = y, rad = 1, col = 'rgba(255,255,255,.1)';
          if (d < RR && inHero) { const k = Math.pow(1 - d / RR, 2); px += dx / (d || 1) * k * 18; py += dy / (d || 1) * k * 18; rad = 1 + k * 1.2; col = `rgba(255,255,255,${(.1 + k * .35).toFixed(3)})`; }
          ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, rad, 0, 6.283); ctx.fill();
        }
      }
    };
    loop();
    return api;
  }
  window.ReevaHero = { mount };
})();
