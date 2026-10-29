// Tools orbit on the about page: round icons circling a tilted ellipse, placed each frame so the
// nearer ones sit larger, brighter and in front. The centre names whichever is in front; pointing
// at (or tapping) an icon stops the orbit on it.
(function () {
  function start(orb) {
    if (orb._orb) return; orb._orb = 1;
    const items = [...orb.querySelectorAll('.orb-i')], core = orb.querySelector('.orb-core');
    const [nm, kd, nt] = ['.orb-nm', '.orb-k', '.orb-nt'].map(s => core.querySelector(s));
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let a = 0, hold = null, cur = -1, last = performance.now();
    const show = i => {
      if (i === cur) return; cur = i; const d = items[i].dataset;
      nm.textContent = d.name; kd.textContent = d.kind; nt.textContent = d.note;
      core.classList.remove('swap'); void core.offsetWidth; core.classList.add('swap');
      items.forEach((b, j) => b.classList.toggle('on', j === i));
    };
    items.forEach((b, i) => {
      b.addEventListener('mouseenter', () => { hold = i; show(i); });
      b.addEventListener('mouseleave', () => { hold = null; });
      b.addEventListener('click', () => { hold = hold === i ? null : i; show(i); });
    });
    (function tick(t) {
      requestAnimationFrame(tick);
      const dt = Math.min(64, t - last); last = t;
      if (hold === null && !still) a += dt * .00016;
      const W = orb.clientWidth, H = orb.clientHeight, rx = W * .46, ry = H * .36;
      let front = 0, best = -9;
      items.forEach((b, i) => {
        const th = a + i / items.length * Math.PI * 2, s = Math.sin(th), dep = (s + 1) / 2;
        const sc = hold === i ? 1.25 : .62 + dep * .5;
        b.style.transform = `translate(${(W / 2 + Math.cos(th) * rx).toFixed(1)}px,${(H / 2 + s * ry).toFixed(1)}px) scale(${sc.toFixed(3)})`;
        b.style.opacity = (.4 + dep * .6).toFixed(2); b.style.zIndex = Math.round(dep * 100);
        if (s > best) { best = s; front = i; }
      });
      show(hold === null ? front : hold);
    })(last);
  }
  (function look() { const o = document.querySelector('.orb'); if (o) start(o); else setTimeout(look, 200); })();
})();
