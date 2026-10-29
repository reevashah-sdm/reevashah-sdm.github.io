// Tools washing line on the about page: the doodles draw themselves once the line scrolls into
// view, and a tap (for touch screens) holds one doodle open with its note.
(function () {
  function start(line) {
    if (line._ln) return; line._ln = 1;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { line.classList.add('drawn'); io.disconnect(); } }), { threshold: .35 });
    io.observe(line);
    line.querySelectorAll('.dd').forEach(b => b.addEventListener('click', () => {
      const on = !b.classList.contains('on');
      line.querySelectorAll('.dd.on').forEach(x => x.classList.remove('on'));
      b.classList.toggle('on', on);
    }));
  }
  (function look() { const l = document.querySelector('.line'); if (l) start(l); else setTimeout(look, 200); })();
})();
