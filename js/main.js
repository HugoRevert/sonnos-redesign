/* ── ANIMATED WAVEFORM (hero) ────────────────────────────────────── */
function buildWaveform() {
  const container = document.getElementById('waveform');
  if (!container) return;

  const count = 90;
  for (let i = 0; i < count; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-bar';
    container.appendChild(bar);

    const minH = 0.03 + Math.random() * 0.10;
    const maxH = 0.20 + Math.random() * 0.80;
    const dur  = 600  + Math.random() * 1400;

    bar.animate(
      [
        { transform: `scaleY(${minH.toFixed(3)})` },
        { transform: `scaleY(${maxH.toFixed(3)})` },
      ],
      {
        duration: dur,
        delay: -Math.random() * dur,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
      }
    );
  }
}

/* ── NAV: scroll border + active link ───────────────────────────── */
function initNav() {
  const nav      = document.getElementById('nav');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);

    let active = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) active = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${active}`);
    });
  }, { passive: true });
}

/* ── MOBILE MENU ─────────────────────────────────────────────────── */
function initMobileMenu() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function setOpen(open) {
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', () => setOpen(!btn.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
}

/* ── CREDIT MODAL ────────────────────────────────────────────────── */
function initModal() {
  const modal    = document.getElementById('creditModal');
  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');

  function openModal(card) {
    const { title, type, studio, year, tags, desc, img } = card.dataset;

    // Populate badge
    const badge = document.getElementById('modalBadge');
    badge.textContent = type || '';
    badge.className   = `credit-badge credit-badge--${(type || '').toLowerCase()}`;

    document.getElementById('modalYear').textContent   = year   || '';
    document.getElementById('modalTitle').textContent  = title  || 'Untitled';
    document.getElementById('modalStudio').textContent = studio || '';
    document.getElementById('modalDesc').textContent   = desc   || '';

    // Tags
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = '';
    if (tags) {
      tags.split(',').forEach(t => {
        const span = document.createElement('span');
        span.className   = 'tag';
        span.textContent = t.trim();
        tagsEl.appendChild(span);
      });
    }

    // Cover image
    const modalImg         = document.getElementById('modalImg');
    const modalPlaceholder = document.getElementById('modalImgPlaceholder');
    if (img) {
      modalImg.src           = img;
      modalImg.alt           = title || '';
      modalImg.style.display = 'block';
      modalPlaceholder.style.display = 'none';
    } else {
      modalImg.style.display         = 'none';
      modalPlaceholder.style.display = 'flex';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open on card click
  document.querySelectorAll('.credit-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    // Keyboard accessibility
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}


/* ── FADE-IN ON SCROLL ───────────────────────────────────────────── */
function initFadeIn() {
  const targets = document.querySelectorAll(
    '.service-card, .team-card, .credit-card, .listen-card, .contact-info, .contact-form'
  );

  targets.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 3) * 0.07}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(el => observer.observe(el));
}

/* ── CONTACT FORM ────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  if (form.action.includes('YOUR_FORM_ID')) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('button[type="submit"]');
      const saved = btn.textContent;
      btn.textContent = '✓ Message sent!';
      btn.disabled    = true;
      setTimeout(() => {
        btn.textContent = saved;
        btn.disabled    = false;
        form.reset();
      }, 3200);
    });
  }
}

/* ── FOOTER YEAR ─────────────────────────────────────────────────── */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── INIT ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildWaveform();
  initNav();
  initMobileMenu();
  initModal();
  initFadeIn();
  initContactForm();
  setYear();
});
