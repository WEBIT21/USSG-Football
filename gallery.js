/* ═══════════════════════════════════
   USSG — Galerie (photos + vidéos)
   gallery.js
═══════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Tabs ──────────────────────────
  document.querySelectorAll('.tb').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tb').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const panel = document.getElementById(btn.dataset.tab);
      if (panel) panel.style.display = 'block';
    });
  });

  // ── Photos ────────────────────────
  const photoInput = document.getElementById('photoInput');
  const photoGrid  = document.getElementById('photoGrid');
  const photoEmpty = document.getElementById('photoEmpty');
  const photoZone  = document.getElementById('photoZone');

  function refreshPhoto() {
    if (!photoEmpty || !photoGrid) return;
    photoEmpty.style.display = photoGrid.children.length === 0 ? 'block' : 'none';
  }

  function addPhoto(file) {
    if (!photoGrid || !file.type.startsWith('image/')) return;
    const url  = URL.createObjectURL(file);
    const card = document.createElement('div');
    card.className = 'pcard';

    const img = document.createElement('img');
    img.src = url; img.alt = file.name; img.loading = 'lazy';
    img.addEventListener('click', () => openLightbox(url));

    const ov  = document.createElement('div'); ov.className = 'pcard-over';
    ov.innerHTML = '<span>🔍 Agrandir</span>';

    const del = document.createElement('button'); del.className = 'pcard-del'; del.title = 'Supprimer'; del.textContent = '✕';
    del.addEventListener('click', e => { e.stopPropagation(); card.remove(); URL.revokeObjectURL(url); refreshPhoto(); });

    card.appendChild(img); card.appendChild(ov); card.appendChild(del);
    photoGrid.appendChild(card);
    refreshPhoto();
  }

  if (photoInput) photoInput.addEventListener('change', e => { [...e.target.files].forEach(addPhoto); e.target.value = ''; });

  if (photoZone) {
    photoZone.addEventListener('dragover',  e => { e.preventDefault(); photoZone.classList.add('drag-over'); });
    photoZone.addEventListener('dragleave', ()  => photoZone.classList.remove('drag-over'));
    photoZone.addEventListener('drop', e => {
      e.preventDefault(); photoZone.classList.remove('drag-over');
      [...e.dataTransfer.files].forEach(addPhoto);
    });
  }

  // ── Vidéos ────────────────────────
  const videoInput = document.getElementById('videoInput');
  const videoGrid  = document.getElementById('videoGrid');
  const videoEmpty = document.getElementById('videoEmpty');
  const videoZone  = document.getElementById('videoZone');

  function refreshVideo() {
    if (!videoEmpty || !videoGrid) return;
    videoEmpty.style.display = videoGrid.children.length === 0 ? 'block' : 'none';
  }

  function addVideo(file) {
    if (!videoGrid || !file.type.startsWith('video/')) return;
    const url  = URL.createObjectURL(file);
    const card = document.createElement('div');
    card.className = 'vcard';

    const vid = document.createElement('video');
    vid.src = url; vid.controls = true; vid.preload = 'metadata';

    const info = document.createElement('div'); info.className = 'vcard-info';
    const name = document.createElement('div'); name.className = 'vcard-name';
    name.textContent = file.name.replace(/\.[^/.]+$/, '');
    const del = document.createElement('button'); del.className = 'vcard-del'; del.title = 'Supprimer'; del.textContent = '🗑️';
    del.addEventListener('click', () => { card.remove(); URL.revokeObjectURL(url); refreshVideo(); });

    info.appendChild(name); info.appendChild(del);
    card.appendChild(vid); card.appendChild(info);
    videoGrid.appendChild(card);
    refreshVideo();
  }

  if (videoInput) videoInput.addEventListener('change', e => { [...e.target.files].forEach(addVideo); e.target.value = ''; });

  if (videoZone) {
    videoZone.addEventListener('dragover',  e => { e.preventDefault(); videoZone.classList.add('drag-over'); });
    videoZone.addEventListener('dragleave', ()  => videoZone.classList.remove('drag-over'));
    videoZone.addEventListener('drop', e => {
      e.preventDefault(); videoZone.classList.remove('drag-over');
      [...e.dataTransfer.files].forEach(addVideo);
    });
  }

  // Init empty states
  refreshPhoto();
  refreshVideo();
});

// ── Lightbox ──────────────────────
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lb-img').src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lightbox')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeLightbox(); });
});
