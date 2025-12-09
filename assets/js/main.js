/* ============================================
   DRAFTNEX SOLUTIONS - MAIN JAVASCRIPT
   ============================================ */

(function() {
  'use strict';

  /* ============================================
     1. NAVIGATION HANDLING
     ============================================ */
  function initNavigation() {
    // Load navigation
    fetch('nav.html')
      .then(res => res.text())
      .then(html => {
        const header = document.getElementById('site-header');
        if (header) {
          header.innerHTML = html;
          setupMobileMenu();
          setupActiveLinks();
          setupScrollHeader();
        }
      })
      .catch(err => console.error('Error loading navigation:', err));
  }

  // Mobile menu toggle
  function setupMobileMenu() {
    const burger = document.querySelector('.nav-toggle');
    const mobilePanel = document.querySelector('.mobile-panel');
    const mobileLinks = document.querySelectorAll('.mobile-panel a');
    const body = document.body;

    if (burger && mobilePanel) {
      // Toggle menu
      burger.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('open');

        // Update aria-expanded
        const isOpen = nav.classList.contains('open');
        burger.setAttribute('aria-expanded', isOpen);

        // Prevent body scroll when menu is open
        if (isOpen) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = '';
        }
      });

      // Close menu when clicking links
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          const nav = document.querySelector('.nav');
          nav.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          body.style.overflow = '';
        });
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const nav = document.querySelector('.nav');
          if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
          }
        }
      });

      // Close menu when clicking backdrop
      mobilePanel.addEventListener('click', (e) => {
        if (e.target === mobilePanel) {
          const nav = document.querySelector('.nav');
          nav.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          body.style.overflow = '';
        }
      });
    }
  }

  // Set active navigation link based on current page
  function setupActiveLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage ||
          (currentPage === '' && href === 'index.html') ||
          (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Sticky header on scroll
  function setupScrollHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScroll = 0;
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > headerHeight) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  /* ============================================
     2. SCROLL TO TOP BUTTON
     ============================================ */
  function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ============================================
     3. REVEAL ANIMATIONS ON SCROLL
     ============================================ */
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ============================================
     4. PAGE TRANSITIONS
     ============================================ */
  function initPageTransitions() {
    if (!document.startViewTransition) return;

    // Intercept navigation clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');

      if (link &&
          link.href &&
          link.href.startsWith(window.location.origin) &&
          !link.href.includes('#') &&
          !link.hasAttribute('target') &&
          !link.hasAttribute('download')) {

        e.preventDefault();

        document.startViewTransition(() => {
          window.location.href = link.href;
        });
      }
    });
  }

  /* ============================================
     5. SCROLL PROGRESS BAR
     ============================================ */
  function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  /* ============================================
     6. DYNAMIC COPYRIGHT YEAR
     ============================================ */
  function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /* ============================================
     7. EXTERNAL LINK SECURITY
     ============================================ */
  function secureExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
      if (!link.href.startsWith(window.location.origin)) {
        link.setAttribute('rel', 'noopener noreferrer');

        // Optional: Add external link icon
        if (!link.querySelector('.external-icon')) {
          const icon = document.createElement('i');
          icon.className = 'fa-solid fa-arrow-up-right-from-square external-icon';
          icon.style.fontSize = '0.8em';
          icon.style.marginLeft = '0.25em';
          link.appendChild(icon);
        }
      }
    });
  }

  /* ============================================
     8. FORM VALIDATION & HANDLING
     ============================================ */
  function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(error => error.remove());

        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        let hasErrors = false;

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            hasErrors = true;
            showFieldError(field, 'Dieses Feld ist erforderlich');
          }
        });

        // Validate email
        const emailFields = form.querySelectorAll('[type="email"]');
        emailFields.forEach(field => {
          if (field.value && !isValidEmail(field.value)) {
            hasErrors = true;
            showFieldError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
          }
        });

        if (hasErrors) {
          e.preventDefault();
        }
      });
    });
  }

  function showFieldError(field, message) {
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.focus();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ============================================
     9. LAZY LOADING IMAGES
     ============================================ */
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  /* ============================================
     10. SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ============================================
     11. PERFORMANCE MONITORING
     ============================================ */
  function logPerformance() {
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          console.log('Page load time:', pageLoadTime + 'ms');
        }, 0);
      });
    }
  }

  /* ============================================
     12. INITIALIZATION
     ============================================ */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runInit);
    } else {
      runInit();
    }
  }

  function runInit() {
    initNavigation();
    initScrollToTop();
    initRevealAnimations();
    initPageTransitions();
    initScrollProgress();
    updateCopyrightYear();
    secureExternalLinks();
    initFormHandling();
    initLazyLoading();
    initSmoothScroll();

    // Development only
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      logPerformance();
    }
  }

  // Start the app
  init();

})();
