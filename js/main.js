document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const scrollTopBtn = document.querySelector('.scroll-top');

  // Mobile menu
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // Header scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 20);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Scroll to top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Fade in observer
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => obs.observe(el));
  }

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
      const item = h.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(o => {
        if (o !== item) { o.classList.remove('open'); const b = o.querySelector('.accordion-body'); if (b) b.style.maxHeight = null; }
      });
      if (isOpen) { item.classList.remove('open'); body.style.maxHeight = null; }
      else { item.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
  });

  // Typing effect (landing page only)
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const phrases = ['Siber Güvenlik Dünyası', 'Ethical Hacking', 'Penetration Testing', 'Bug Bounty Hunting', 'Digital Forensics', 'Malware Analysis'];
    let pi = 0, ci = 0, del = false, spd = 80;
    (function type() {
      const cur = phrases[pi];
      if (del) { typingEl.textContent = cur.substring(0, --ci); spd = 40; }
      else { typingEl.textContent = cur.substring(0, ++ci); spd = 80; }
      if (!del && ci === cur.length) { spd = 2000; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; spd = 400; }
      setTimeout(type, spd);
    })();
  }

  // Counter animation
  document.querySelectorAll('.counter').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.counted) {
          e.target.dataset.counted = '1';
          const t = parseInt(e.target.dataset.target), s = e.target.dataset.suffix || '';
          let c = 0; const inc = t / 125;
          (function u() { c += inc; if (c >= t) { e.target.textContent = t + s; return; } e.target.textContent = Math.floor(c) + s; requestAnimationFrame(u); })();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // Section cards click
  document.querySelectorAll('.section-card[data-href]').forEach(card => {
    card.addEventListener('click', () => { window.location.href = card.dataset.href; });
  });
});
