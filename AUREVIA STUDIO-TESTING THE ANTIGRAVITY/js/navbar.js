/* ==========================================================================
   AUREVIA STUDIO DENTAL CARE — NAVBAR & INTERACTIVITY
   ========================================================================== */

function initNavbar() {
  const headerNav = document.querySelector('.header-nav');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (!headerNav) return;

  // 1. Sticky Navigation Scroll Handler
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }
  });

  // 2. Active Page Link Highlighting
  highlightActiveLink();

  // 3. Mobile Menu Overlay Toggle
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileOverlay.classList.toggle('active');
      mobileToggle.classList.toggle('active');

      // Freeze scrolling using Lenis if available, fallback to body overflow
      if (isActive) {
        document.body.style.overflow = 'hidden';
        if (window.lenisInstance) {
          window.lenisInstance.stop();
        }
      } else {
        document.body.style.overflow = '';
        if (window.lenisInstance) {
          window.lenisInstance.start();
        }
      }
    });

    // Close menu when links are clicked
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        if (window.lenisInstance) {
          window.lenisInstance.start();
        }
      });
    });
  }
}

/**
 * Highlights the nav link matches corresponding to the current file pathname
 */
function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Auto init on page load
window.addEventListener('DOMContentLoaded', initNavbar);
