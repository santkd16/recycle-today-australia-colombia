'use strict';

/* The original student campaign video is now hosted at assets/campaign-video.mp4 and displayed by video.html. */

const slides = Array.from(document.querySelectorAll('[data-slide]'));
const toolbar = document.getElementById('presentation-toolbar');
const body = document.body;
const startButtons = [document.getElementById('present-button'), document.getElementById('start-presentation')];
const navLinks = Array.from(document.querySelectorAll('.desktop-nav a'));
let slideIndex = 0;
let presentation = false;

function goToSlide(index) {
  slideIndex = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === slideIndex));
  navLinks.forEach((link, i) => link.classList.toggle('active', i === slideIndex));
  document.getElementById('current-slide').textContent = `${String(slideIndex + 1).padStart(2, '0')} / 05`;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function setPresentation(shouldPresent) {
  presentation = shouldPresent;
  body.classList.toggle('is-presenting', presentation);
  toolbar.hidden = !presentation;
  document.getElementById('present-button').textContent = presentation ? '✕ Exit' : '▶ Present';
  if (presentation) goToSlide(slideIndex);
  else slides[slideIndex].scrollIntoView({ behavior: 'smooth' });
}

startButtons.forEach(button => button.addEventListener('click', () => setPresentation(!presentation)));
document.getElementById('exit-presentation').addEventListener('click', () => setPresentation(false));
document.getElementById('prev-slide').addEventListener('click', () => goToSlide(slideIndex - 1));
document.getElementById('next-slide').addEventListener('click', () => goToSlide(slideIndex + 1));
navLinks.forEach((link, index) => link.addEventListener('click', e => {
  if (presentation) { e.preventDefault(); goToSlide(index); }
}));

document.addEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
  if (e.key === 'Escape' && presentation) { setPresentation(false); return; }
  if (!presentation) return;
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
    e.preventDefault(); goToSlide(slideIndex + 1);
  } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
    e.preventDefault(); goToSlide(slideIndex - 1);
  } else if (e.key === 'Home') { e.preventDefault(); goToSlide(0); }
  else if (e.key === 'End') { e.preventDefault(); goToSlide(slides.length - 1); }
});


// Live pictures using Wikimedia's public MediaWiki API. Images link to their source/attribution pages.
async function populateGallery(id, query) {
  const gallery = document.getElementById(id);
  if (!gallery) return;
  const api = 'https://commons.wikimedia.org/w/api.php';
  const params = new URLSearchParams({
    action: 'query', format: 'json', origin: '*', generator: 'search',
    gsrnamespace: '6', gsrlimit: '9', gsrsearch: query,
    prop: 'imageinfo', iiprop: 'url|mime', iiurlwidth: '440'
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7500);
  try {
    const response = await fetch(`${api}?${params}`, { signal: controller.signal });
    if (!response.ok) throw new Error('MediaWiki API unavailable');
    const json = await response.json();
    const pages = Object.values(json.query?.pages || {})
      .filter(p => p.imageinfo?.[0]?.thumburl && /^image\/(jpeg|png|webp)$/i.test(p.imageinfo[0].mime || ''))
      .slice(0, 6);
    if (!pages.length) throw new Error('No images returned');
    const fragment = document.createDocumentFragment();
    pages.forEach(p => {
      const info = p.imageinfo[0];
      const item = document.createElement('div'); item.className = 'gallery-photo';
      const img = document.createElement('img'); img.src = info.thumburl; img.loading = 'lazy';
      img.alt = p.title.replace(/^File:/i, '').replace(/\.[A-Za-z0-9]+$/, '').replace(/_/g, ' ');
      const link = document.createElement('a'); link.href = info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`;
      link.textContent = img.alt + ' · photo credits ↗';
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      item.append(img, link); fragment.append(item);
    });
    gallery.replaceChildren(fragment);
  } catch (e) {
    gallery.textContent = 'The live gallery is unavailable right now. Use the main photographs and their source links above.';
    gallery.style.color = '#b9d8c9'; gallery.style.fontSize = '13px';
  } finally { clearTimeout(timeout); }
}
populateGallery('gallery-au', 'Australia Sydney Opera House Canberra photo');
populateGallery('gallery-co', 'Colombia Bogota skyline Monserrate photo');

const scriptPanel = document.getElementById('speaker-script');
function showScript() {
  if (presentation) setPresentation(false);
  scriptPanel.hidden = false;
  document.getElementById('podcast').hidden = false;
}
document.getElementById('notes-button').addEventListener('click', showScript);
document.getElementById('close-speaker-notes').addEventListener('click',()=>{document.getElementById('podcast').hidden=true;});
document.getElementById('toggle-script').addEventListener('click', () => {
  scriptPanel.hidden = !scriptPanel.hidden;
  if (!scriptPanel.hidden) scriptPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

let recorder = null, recordingStream = null, chunks = [];
const recordButton = document.getElementById('record-podcast');
const recordFeedback = document.getElementById('record-feedback');
recordButton.addEventListener('click', async () => {
  if (recorder?.state === 'recording') { recorder.stop(); return; }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    recordFeedback.textContent = 'This browser cannot record microphone audio. Try Chrome over HTTPS.';
    return;
  }
  try {
    recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks = [];
    recorder = new MediaRecorder(recordingStream);
    recorder.ondataavailable = e => { if (e.data?.size) chunks.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
      const fileUrl = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = fileUrl;
      a.download = 'recycle-today-podcast-' + new Date().toISOString().slice(0, 10) + '.webm';
      a.click();
      setTimeout(() => URL.revokeObjectURL(fileUrl), 15000);
      recordingStream?.getTracks().forEach(t => t.stop());
      recordButton.textContent = '● Record locally';
      recordFeedback.textContent = 'Recording downloaded to this device; no audio was uploaded.';
    };
    recorder.start(); recordButton.textContent = '■ Stop and download';
    recordFeedback.textContent = 'Recording microphone locally…';
  } catch (e) { recordFeedback.textContent = 'Microphone permission was not granted.'; }
});

document.getElementById('print-poster').addEventListener('click', () => {
  if (presentation) setPresentation(false);
  body.classList.add('print-poster-only');
  window.print();
});
window.addEventListener('afterprint', () => body.classList.remove('print-poster-only'));

// Update the navigation highlight for normal scrolling.
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    if (presentation) return;
    entries.forEach(e => {
      if (e.isIntersecting) navLinks.forEach((link, i) => link.classList.toggle('active', slides[i] === e.target));
    });
  }, { rootMargin: '-20% 0px -68% 0px' });
  slides.forEach(slide => navObserver.observe(slide));
}