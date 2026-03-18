/* ═══════════════════════════════════
   USSG — Carrousel accueil
   carousel.js
═══════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const track  = document.getElementById('caro-track');
  const dotsEl = document.getElementById('caro-dots');
  if (!track) return;

  const slides = track.querySelectorAll('.slide');
  let cur = 0;
  let timer;

  const vis = () => window.innerWidth <= 640 ? 1 : 3;

  // Créer les dots
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(i) {
    const max = slides.length - vis();
    cur = Math.max(0, Math.min(i, max));
    const sw = slides[0].offsetWidth + 12;
    track.style.transform = `translateX(-${cur * sw}px)`;
    dotsEl.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === cur));
  }

  function next() { goTo(cur >= slides.length - vis() ? 0 : cur + 1); }
  function prev() { goTo(cur <= 0 ? slides.length - vis() : cur - 1); }

  function startAuto() { timer = setInterval(next, 3500); }
  function stopAuto()  { clearInterval(timer); }

  // Boutons
  document.getElementById('caro-prev')?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  document.getElementById('caro-next')?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  // Swipe mobile
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) { stopAuto(); dx < 0 ? next() : prev(); startAuto(); }
  });

  window.addEventListener('resize', () => goTo(cur));
  startAuto();
});
