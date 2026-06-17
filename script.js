/* ============================================
   FIKS KITCHEN — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initStickyNav();
  initMobileNav();
  initMenuTabs();
  initTestimonialNav();
  initScrollReveal();
  initContactForm();
});

/* Smooth Scroll */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });

      const navLinks = document.querySelector('.nav-links');
      const navToggle = document.querySelector('.nav-toggle');
      if (navLinks?.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle?.classList.remove('active');
      }
    });
  });
}

/* Sticky Nav */
function initStickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Mobile Hamburger Menu */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });
}

/* Menu Tabs */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`panel-${target}`)?.classList.add('active');
    });
  });
}

/* Testimonial Navigation */
function initTestimonialNav() {
  const track = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  if (!track) return;

  const scrollAmount = 400;

  prevBtn?.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

/* Scroll Reveal */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* Contact Form — WhatsApp */
const WHATSAPP_NUMBER = '27835587660';

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const phone = form.querySelector('#phone')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const eventType = form.querySelector('#event-type')?.value;
    const eventDate = form.querySelector('#event-date')?.value;
    const guests = form.querySelector('#guests')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !phone || !email || !eventType || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const enquiry = buildWhatsAppEnquiry({
      name,
      phone,
      email,
      eventType,
      eventDate,
      guests,
      message,
    });

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiry)}`;
    window.open(url, '_blank');

    showToast('✦ Opening WhatsApp to send your enquiry...', 'success');
    form.reset();
  });
}

function buildWhatsAppEnquiry({ name, phone, email, eventType, eventDate, guests, message }) {
  return [
    "Hi Fiks Kitchen! I'd like to enquire about catering.",
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Event Type: ${eventType}`,
    `Event Date: ${eventDate || 'Not specified'}`,
    `Guest Count: ${guests || 'Not specified'}`,
    '',
    'Message:',
    message,
  ].join('\n');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, type) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast toast-${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
