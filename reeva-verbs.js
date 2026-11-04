// The seven-verb sentence on the about page: once it scrolls into view each verb acts out its skill,
// left to right. Hovering (or tapping) a verb plays it again, and the eyes on "watch" follow the cursor.
(function () {
  const has = q => !!(window.matchMedia && matchMedia(q).matches);
  const calm = has('(prefers-reduced-motion: reduce)'), canHover = has('(hover: hover)');
  const look = (x, y) => {
    const e = document.querySelector('.sv-eyes'); if (!e) return;
    e.style.setProperty('--ex', x.toFixed(3) + 'em'); e.style.setProperty('--ey', y.toFixed(3) + 'em');
  };
  function start(l) {
    if (l._sv) return; l._sv = 1;
    if (!window.IntersectionObserver) return;
    const words = [...l.querySelectorAll('.sv')];
    const play = w => { w.classList.add('go'); w._at = Date.now(); };
    const again = w => {
      if (!w.classList.contains('go') || Date.now() - w._at < 1800) return;
      w.classList.remove('go'); void w.offsetWidth; play(w);
    };
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.disconnect();
      words.forEach((w, i) => setTimeout(() => play(w), i * 260));
    }), { threshold: .3 });
    l.classList.add('sv-on');
    io.observe(l);
    words.forEach(w => {
      w.addEventListener('click', () => again(w));
      if (canHover) w.addEventListener('mouseenter', () => again(w));
    });
  }
  // The page can rebuild this block, or reset its classes, while it starts up, so keep checking.
  function keep() {
    const l = document.querySelector('.sv-line'); if (!l) return;
    if (!l._sv) { start(l); return; }
    if (window.IntersectionObserver && !l.classList.contains('sv-on')) l.classList.add('sv-on');
    l.querySelectorAll('.sv').forEach(w => { if (w._at && !w.classList.contains('go')) w.classList.add('go'); });
  }
  keep(); setInterval(keep, 300);
  if (calm) return;
  if (canHover) {
    let px = 0, py = 0, busy = false;
    addEventListener('pointermove', ev => {
      px = ev.clientX; py = ev.clientY; if (busy) return; busy = true;
      requestAnimationFrame(() => {
        busy = false;
        const e = document.querySelector('.sv-eyes'); if (!e) return;
        const b = e.getBoundingClientRect(); if (b.bottom < -200 || b.top > innerHeight + 200) return;
        const a = Math.atan2(py - (b.top + b.height / 2), px - (b.left + b.width / 2));
        look(Math.cos(a) * .05, Math.sin(a) * .05);
      });
    }, { passive: true });
  } else {
    setInterval(() => { const a = Math.random() * Math.PI * 2; look(Math.cos(a) * .05, Math.sin(a) * .05); }, 1500);
  }
})();
