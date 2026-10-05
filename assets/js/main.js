/* ==========================================================================
   SAROJ MEHTA INTERNATIONAL SCHOOL (SMISK)
   Interactive Scripts: Sliders, Modals, Filters, Counters & Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. HERO SLIDER
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  function startSlideShow() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideShow();
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      resetSlideInterval();
    });
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      resetSlideInterval();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetSlideInterval();
    });
  });

  if (slides.length > 0) {
    startSlideShow();
  }

  // 2. STICKY NAVBAR & SCROLL-TO-TOP
  const navbar = document.querySelector('.main-navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      if (navbar) navbar.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. MOBILE NAVIGATION ACCORDION
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('show');
      if (toggleIcon) {
        if (isOpen) {
          toggleIcon.classList.remove('fa-bars');
          toggleIcon.classList.add('fa-times');
        } else {
          toggleIcon.classList.remove('fa-times');
          toggleIcon.classList.add('fa-bars');
        }
      }
    });

    // Handle dropdown toggling on mobile
    const navItemsWithDropdown = document.querySelectorAll('.nav-item');
    navItemsWithDropdown.forEach((item) => {
      const dropdown = item.querySelector('.dropdown-menu');
      const link = item.querySelector('.nav-link');
      if (dropdown && link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 992) {
            e.preventDefault();
            // Toggle active state for current dropdown
            const isCurrentlyOpen = dropdown.classList.contains('mobile-open');
            // Close any other open dropdowns on mobile for clean accordion
            document.querySelectorAll('.dropdown-menu.mobile-open').forEach((d) => {
              d.classList.remove('mobile-open');
            });
            if (!isCurrentlyOpen) {
              dropdown.classList.add('mobile-open');
            }
          }
        });
      }
    });

    // Auto-close menu when clicking a regular anchor link (like #about, #admissions)
    document.querySelectorAll('.dropdown-link, .nav-links > .nav-item:not(:has(.dropdown-menu)) .nav-link').forEach((anchor) => {
      anchor.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          navLinks.classList.remove('show');
          if (toggleIcon) {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  // 4. MODALS SYSTEM (Admissions, Virtual Tour, Circulars)
  const admissionModal = document.getElementById('admissionModal');
  const tourModal = document.getElementById('tourModal');
  const circularModal = document.getElementById('circularModal');

  // Trigger buttons
  const openAdmissionBtns = document.querySelectorAll('.open-admission-modal');
  const openTourBtns = document.querySelectorAll('.open-tour-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openAdmissionBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(admissionModal);
    });
  });

  openTourBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(tourModal);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(admissionModal);
      closeModal(tourModal);
      closeModal(circularModal);
    });
  });

  // Close modal when clicking outside backdrop
  [admissionModal, tourModal, circularModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // 5. CIRCULARS MODAL DETAILS POPULATOR
  const circularItems = document.querySelectorAll('.circular-item');
  circularItems.forEach((item) => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title') || item.querySelector('h4')?.textContent;
      const date = item.getAttribute('data-date') || 'Recent Notification';
      const desc = item.getAttribute('data-desc') || 'Official notice released by the School Administration Office.';

      const modalTitle = document.getElementById('circularModalTitle');
      const modalDate = document.getElementById('circularModalDate');
      const modalBody = document.getElementById('circularModalContent');

      if (modalTitle) modalTitle.textContent = title;
      if (modalDate) modalDate.textContent = `Published on: ${date} | Reference: SMISK/CIR/2026-27`;
      if (modalBody) modalBody.textContent = desc;

      openModal(circularModal);
    });
  });

  // 6. GALLERY FILTERS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 7. INQUIRY FORM SUBMISSION (WITH PRETTY FEEDBACK)
  const inquiryForms = document.querySelectorAll('.admission-inquiry-form');
  inquiryForms.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Enquiry...';

      setTimeout(() => {
        submitBtn.textContent = '✓ Enquiry Registered Successfully!';
        submitBtn.style.background = '#117a55';
        submitBtn.style.color = '#ffffff';

        // Show prompt to user
        alert('Thank you for expressing interest in Saroj Mehta International School (SMISK), Karanjani, Dapoli! Our Admissions Counselor will contact you within 24 hours with the prospectus and fee schedule.');

        setTimeout(() => {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          closeModal(admissionModal);
        }, 1200);
      }, 1000);
    });
  });

  // 8. STATS COUNTER ANIMATION (ON SCROLL)
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function countUp() {
    statNumbers.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 35;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count) + (counter.getAttribute('data-suffix') || '');
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + (counter.getAttribute('data-suffix') || '');
        }
      };
      updateCount();
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        countUp();
        animated = true;
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
