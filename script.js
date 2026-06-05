/* ===========================
   FLOATIES BACKGROUND
=========================== */
const floatieEmojis = ['💖','🌸','✨','🎀','🍓','🌈','💕','🌻','💫','🎉','🦋','🍭'];

function createFloaties() {
  const container = document.getElementById('floaties');
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.classList.add('floatie');
    el.textContent = floatieEmojis[Math.floor(Math.random() * floatieEmojis.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${6 + Math.random() * 10}s`;
    el.style.animationDelay = `${Math.random() * 8}s`;
    el.style.fontSize = `${0.8 + Math.random() * 1.4}rem`;
    container.appendChild(el);
  }
}

/* ===========================
   FOOTER HEARTS
=========================== */
function createFooterHearts() {
  const container = document.getElementById('footer-hearts');
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.classList.add('footer-heart');
    el.textContent = ['💖','💕','💗','💝'][Math.floor(Math.random() * 4)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${2 + Math.random() * 3}s`;
    el.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(el);
  }
}

/* ===========================
   LIVE COUNTDOWN
=========================== */
function updateCountdown() {
  // Set your relationship start date here! (YYYY, MM-1, DD) — month is 0-indexed
  const startDate = new Date(2024, 8, 5); // September 5, 2024 — change this!
  const now = new Date();
  const diff = now - startDate;

  if (diff < 0) {
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const fmt = n => String(n).padStart(2, '0');
  document.getElementById('days').textContent    = days;
  document.getElementById('hours').textContent   = fmt(hours);
  document.getElementById('minutes').textContent = fmt(minutes);
  document.getElementById('seconds').textContent = fmt(seconds);
}

/* ===========================
   SCROLL REVEAL
=========================== */
function initReveal() {
  const targets = document.querySelectorAll(
    '.counter-card, .timeline-card, .gallery-card, .letter-envelope, .section-title, .section-label, .countdown-note'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

/* ===========================
   CURSOR SPARKLES
=========================== */
function initSparkles() {
  const sparkles = ['✨','💖','🌸','💫','⭐'];
  document.addEventListener('mousemove', e => {
    if (Math.random() > 0.88) {
      const el = document.createElement('div');
      el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      el.style.cssText = `
        position: fixed;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
        font-size: ${0.7 + Math.random() * 0.7}rem;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAway 0.9s ease forwards;
        user-select: none;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 900);
    }
  });

  // Inject sparkle keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkleAway {
      0%   { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-40px) scale(0.4); }
    }
  `;
  document.head.appendChild(style);
}

/* ===========================
   GALLERY CARD WIGGLE ON CLICK
=========================== */
function initGalleryInteraction() {
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      card.style.animation = 'none';
      card.offsetHeight; // reflow
      card.style.animation = 'wiggle 0.5s ease';
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes wiggle {
      0%,100% { transform: rotate(0deg) scale(1.05); }
      25%      { transform: rotate(-5deg) scale(1.08); }
      75%      { transform: rotate(5deg) scale(1.08); }
    }
  `;
  document.head.appendChild(style);
}

/* ===========================
   INIT ALL
=========================== */
document.addEventListener('DOMContentLoaded', () => {
  createFloaties();
  createFooterHearts();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  initReveal();
  initSparkles();
  initGalleryInteraction();
});

/* ===========================
   LIGHTBOX
=========================== */
function openPhoto(card) {
  const img = card.querySelector('img');
  const label = card.querySelector('.photo-label').textContent;
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbLabel = document.getElementById('lightbox-label');
  const lbSparkles = document.getElementById('lightbox-sparkles');

  lbImg.src = img.src;
  lbLabel.textContent = label;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Sparkle burst
  lbSparkles.innerHTML = '';
  const emojis = ['✨','💖','🌸','💫','🎀','🍓'];
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('div');
    s.classList.add('lb-sparkle');
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = `${10 + Math.random() * 80}%`;
    s.style.top  = `${10 + Math.random() * 80}%`;
    s.style.animationDelay = `${Math.random() * 0.4}s`;
    lbSparkles.appendChild(s);
  }
}

function closePhoto() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Close with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePhoto();
});

/* ===========================
   MUSIC
=========================== */
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  const audio = document.getElementById('bg-music');
  const bar = document.getElementById('music-bar');
  audio.volume = 0;
  audio.play().then(() => {
    musicStarted = true;
    bar.classList.add('visible');
    // Fade in volume smoothly
    let vol = 0;
    const fadeIn = setInterval(() => {
      vol = Math.min(vol + 0.05, 0.7);
      audio.volume = vol;
      if (vol >= 0.7) clearInterval(fadeIn);
    }, 80);
  }).catch(() => {
    // Autoplay blocked — still show bar, wait for user click
    bar.classList.add('visible');
    document.getElementById('music-toggle').textContent = '▶';
    document.getElementById('music-waves').classList.add('paused');
  });
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  const waves = document.getElementById('music-waves');

  if (audio.paused) {
    audio.play();
    btn.textContent = '⏸';
    waves.classList.remove('paused');
  } else {
    audio.pause();
    btn.textContent = '▶';
    waves.classList.add('paused');
  }
}

// Trigger on scroll button click
document.querySelector('.scroll-btn').addEventListener('click', () => {
  startMusic();
});
