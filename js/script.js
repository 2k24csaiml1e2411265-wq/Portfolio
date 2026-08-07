// Mark JS as active so CSS can progressively enhance (see .js .reveal in style.css).
// If this script fails to load, content stays visible by default — nothing depends on JS to *appear*.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Mobile nav toggle ---------- */
  const navEl = document.querySelector('nav');
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle && navEl) {
    navToggle.addEventListener('click', () => {
      const isOpen = navEl.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu after tapping a link (mobile)
    navEl.querySelectorAll('ul a').forEach(link => {
      link.addEventListener('click', () => {
        navEl.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Contact form ---------- */
  // Uses Formspree (https://formspree.io) — a free static-site form backend.
  // Replace YOUR_FORM_ID in index.html's <form action="..."> with your real
  // Formspree endpoint ID for this to actually deliver email. See README.md.
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      // Honeypot spam check — bots fill hidden fields, humans don't.
      const honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        e.preventDefault();
        return;
      }

      // Progressive enhancement: try fetch first; fall back to a normal
      // form POST (page redirect) if fetch fails for any reason.
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      statusEl.textContent = '';
      statusEl.className = 'form-status';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          statusEl.textContent = 'Message sent — thanks! I\'ll get back to you soon.';
          statusEl.className = 'form-status ok';
          form.reset();
        } else {
          const data = await response.json().catch(() => null);
          const msg = data && data.errors
            ? data.errors.map(err => err.message).join(', ')
            : 'Something went wrong — please try again or email me directly.';
          statusEl.textContent = msg;
          statusEl.className = 'form-status err';
        }
      } catch (err) {
        statusEl.textContent = 'Could not send right now — please email me directly.';
        statusEl.className = 'form-status err';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }
});
