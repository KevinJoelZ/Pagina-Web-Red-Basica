document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initLightbox();
  highlightActiveNav();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-parent').forEach(parent => {
    parent.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        parent.closest('li').classList.toggle('dropdown-open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('open');
    }
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const img = lightbox.querySelector('img');
  const items = document.querySelectorAll('.gallery-item');
  let current = 0;

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      current = i;
      showImage(current);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  const prev = lightbox.querySelector('.lightbox-prev');
  const next = lightbox.querySelector('.lightbox-next');
  if (prev) prev.addEventListener('click', () => { current = (current - 1 + items.length) % items.length; showImage(current); });
  if (next) next.addEventListener('click', () => { current = (current + 1) % items.length; showImage(current); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && prev) { current = (current - 1 + items.length) % items.length; showImage(current); }
    if (e.key === 'ArrowRight' && next) { current = (current + 1) % items.length; showImage(current); }
  });

  function showImage(index) {
    const src = items[index].querySelector('img').src;
    const alt = items[index].querySelector('img').alt;
    img.src = src;
    img.alt = alt;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function highlightActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop();
    if (linkPath === path || (path === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
}
