// "Things I can't stop doing" on the about page: each line acts out its habit once it scrolls into
// view, one after another. Hovering (or tapping, on touch screens) a line plays it again.
(function () {
  function start(h) {
    if (h._hb) return; h._hb = 1;
    if (!window.IntersectionObserver) return;
    const calm = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    const canHover = !!(window.matchMedia && matchMedia('(hover: hover)').matches);
    const count = r => {
      const b = r.querySelector('.hb-c b'), l = r.querySelector('.hb-c i'); if (!b) return;
      const end = +b.getAttribute('data-n'); clearInterval(r._t);
      const show = n => { b.textContent = n; l.textContent = n === 1 ? ' tap' : ' taps'; };
      if (calm) { show(end); return; }
      let n = 1; show(n);
      r._t = setInterval(() => { show(++n); if (n >= end) clearInterval(r._t); }, 120);
    };
    const play = r => { r.classList.add('go', 'seen'); r._at = Date.now(); count(r); };
    const again = r => {
      if (!r.classList.contains('go') || Date.now() - r._at < 1800) return;
      r.classList.remove('go'); void r.offsetWidth; play(r);
    };
    let next = 0;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const now = Date.now(), at = Math.max(now, next); next = at + 320;
      setTimeout(() => play(e.target), at - now);
    }), { threshold: .4, rootMargin: '0px 0px -8% 0px' });
    h.classList.add('on');
    h.querySelectorAll('.hb-r').forEach(r => {
      io.observe(r);
      r.addEventListener('click', () => again(r));
      if (canHover) r.addEventListener('mouseenter', () => again(r));
    });
  }
  // The page can rebuild this block, or reset its classes, while it starts up, so keep checking.
  function keep() {
    const h = document.querySelector('.hb'); if (!h) return;
    if (!h._hb) { start(h); return; }
    if (window.IntersectionObserver && !h.classList.contains('on')) h.classList.add('on');
    h.querySelectorAll('.hb-r').forEach(r => { if (r._at && !r.classList.contains('go')) r.classList.add('go', 'seen'); });
  }
  keep(); setInterval(keep, 300);
})();
