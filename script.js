/* ============================================================
   STERLING & VALE ADVISORY — script.js
   ============================================================ */

/* ---- Footer: auto-update copyright year ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- Navbar: add shadow on scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ---- Navbar: hamburger toggle ---- */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navMenu.classList.toggle('open', !isOpen);
});

/* Close mobile menu when any nav link is clicked */
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
  });
});

/* ---- CTA button: smooth scroll to form ---- */
document.getElementById('ctaBtn').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

/* ---- IntersectionObserver: scroll-reveal animations ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Testimonials Carousel ---- */
(function initCarousel() {
  const track   = document.getElementById('carouselTrack');
  const slides  = Array.from(track.querySelectorAll('.carousel__slide'));
  const dots    = Array.from(document.querySelectorAll('.carousel__dot'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const total   = slides.length;
  let current   = 0;
  let autoTimer = null;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(Number(dot.dataset.index));
      startAuto();
    });
  });

  /* Pause on hover/focus within carousel */
  const carousel = track.closest('.carousel');
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  /* Touch swipe support */
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      stopAuto();
      goTo(delta > 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });

  startAuto();
})();

/* ---- WhatsApp Chat Widget ---- */
(function initWhatsAppWidget() {
  const WA_NUMBER = '6597977715';
  const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;

  const widget   = document.getElementById('chatWidget');
  const toggle   = document.getElementById('chatToggle');
  const panel    = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const input    = document.getElementById('chatInput');
  const sendBtn  = document.getElementById('chatSend');
  const chips    = document.querySelectorAll('.chat-chip');

  let isOpen = false;

  function openWidget() {
    isOpen = true;
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('is-open');
    setTimeout(() => input && input.focus(), 280);
  }

  function closeWidget() {
    isOpen = false;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('is-open');
  }

  function sendToWhatsApp(text) {
    window.open(WA_BASE + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
  }

  toggle.addEventListener('click', () => (isOpen ? closeWidget() : openWidget()));
  closeBtn.addEventListener('click', closeWidget);

  chips.forEach(chip => {
    chip.addEventListener('click', () => sendToWhatsApp(chip.dataset.msg));
  });

  function handleSend() {
    const text = input ? input.value.trim() : '';
    if (!text) return;
    sendToWhatsApp(text);
    if (input) input.value = '';
  }

  if (sendBtn)  sendBtn.addEventListener('click', handleSend);
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); handleSend(); }
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeWidget();
  });
})();

/* ---- Post-submission celebration ---- */
function onSubmissionSuccess() {
  /* Voice */
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance('hahaha well done, thank you for your submission');
    utter.rate  = 1;
    utter.pitch = 1.2;
    window.speechSynthesis.speak(utter);
  }

  /* Balloons */
  const EMOJIS = ['🎈', '🎉', '🎊', '🎈', '🎈'];
  const COUNT  = 20;
  for (let i = 0; i < COUNT; i++) {
    setTimeout(() => {
      const b = document.createElement('div');
      b.className  = 'balloon';
      b.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      b.style.cssText = [
        `left:${5 + Math.random() * 90}vw`,
        `font-size:${1.8 + Math.random() * 1.8}rem`,
        `animation-duration:${2.8 + Math.random() * 2.2}s`,
        `animation-delay:${Math.random() * 0.3}s`,
      ].join(';');
      document.body.appendChild(b);
      b.addEventListener('animationend', () => b.remove());
    }, i * 90);
  }
}

/* ---- Enquiry Form with FormSubmit AJAX ---- */
(function initForm() {
  const form        = document.getElementById('enquiryForm');
  const submitBtn   = document.getElementById('submitBtn');
  const formError   = document.getElementById('formError');
  const formSuccess = document.getElementById('formSuccess');

  // REPLACE_WITH_YOUR_EMAIL — swap the placeholder below with your real email address.
  //
  // IMPORTANT: FormSubmit requires one-time activation per email address.
  // On the very first submission to a new address, FormSubmit sends a confirmation
  // email to that address. The form will only deliver messages AFTER you click the
  // activation link in that email. Subsequent submissions will arrive normally.
  const ENDPOINT = 'https://formsubmit.co/ajax/zen.tan@redbeaconam.com';

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(input, message) {
    const errEl = input.closest('.form-group')?.querySelector('.field-error');
    if (errEl) errEl.textContent = message;
    input.classList.toggle('invalid', Boolean(message));
  }

  function clearFieldError(input) {
    setFieldError(input, '');
  }

  /* Clear field errors as the user types / changes selection */
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input',  () => clearFieldError(el));
    el.addEventListener('change', () => clearFieldError(el));
  });

  function validate() {
    const name     = form.querySelector('#fullName');
    const email    = form.querySelector('#email');
    const interest = form.querySelector('#interest');
    const message  = form.querySelector('#message');
    let valid = true;

    if (!name.value.trim()) {
      setFieldError(name, 'Please enter your full name.');
      valid = false;
    }
    if (!email.value.trim()) {
      setFieldError(email, 'Please enter your email address.');
      valid = false;
    } else if (!EMAIL_RE.test(email.value.trim())) {
      setFieldError(email, 'Please enter a valid email address.');
      valid = false;
    }
    if (!interest.value) {
      setFieldError(interest, 'Please select an area of interest.');
      valid = false;
    }
    if (!message.value.trim()) {
      setFieldError(message, 'Please tell us a little about your enquiry.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    formError.hidden = true;

    if (!validate()) return;

    /* Loading state */
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    const payload = {
      'Full Name':           form.querySelector('#fullName').value.trim(),
      'Email':               form.querySelector('#email').value.trim(),
      'Phone':               form.querySelector('#phone').value.trim() || '—',
      'Investment Interest': form.querySelector('#interest').value,
      'Message':             form.querySelector('#message').value.trim(),
      _subject:              'New enquiry from Sterling & Vale website',
      _template:             'table',
      _captcha:              'false',
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':        'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.success !== 'true' && data.success !== true) {
        throw new Error('FormSubmit returned a failure response');
      }

      /* Success: hide form, show confirmation */
      form.hidden        = true;
      formSuccess.hidden = false;
      onSubmissionSuccess();

    } catch {
      /* Error: show inline error, restore button */
      formError.hidden      = false;
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Enquiry';
    }
  });
})();
