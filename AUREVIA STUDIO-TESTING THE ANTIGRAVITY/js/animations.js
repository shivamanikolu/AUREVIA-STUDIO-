/* ==========================================================================
   AUREVIA STUDIO DENTAL CARE — GSAP & MOTION ORCHESTRATOR
   ========================================================================== */

function initAnimations() {
  const isGsapActive = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (!isGsapActive) {
    console.warn('GSAP or ScrollTrigger not loaded. Initiating IntersectionObserver fallback.');
    initIntersectionObserverFallback();
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Page Load Animation
  animatePageLoad();

  // 2. Parallax Effects
  initParallaxEffects();

  // 3. Scroll Reveal Elements
  initScrollReveals();

  // 4. Page Specific Animations
  initPageSpecificAnimations();

  // 5. Metric Counter Animations
  initMetricCounters();
}

/**
 * Animate elements on initial page load
 */
function animatePageLoad() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.5 } });

  // Slide down header nav
  if (document.querySelector('.header-nav')) {
    tl.fromTo('.header-nav', 
      { y: -30, opacity: 0 }, 
      { y: 0, opacity: 1, delay: 0.05 }
    );
  }

  // Hero section reveals
  if (document.querySelector('.hero-section')) {
    tl.fromTo('.hero-tagline', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      '-=0.4'
    );
    
    tl.fromTo('.hero-title', 
      { y: 25, opacity: 0, filter: 'blur(4px)' }, 
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6 }, 
      '-=0.45'
    );

    tl.fromTo('.hero-subtitle', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      '-=0.45'
    );

    tl.fromTo('.hero-actions .btn', 
      { scale: 0.96, opacity: 0 }, 
      { scale: 1, opacity: 1, stagger: 0.06 }, 
      '-=0.4'
    );

    tl.fromTo('.hero-visual-wrapper', 
      { y: 30, opacity: 0, scale: 0.99, filter: 'blur(2px)' }, 
      { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.65 }, 
      '-=0.45'
    );
  }

  // Inner pages hero reveals
  const innerHeros = ['.about-hero', '.services-hero', '.testimonials-hero', '.contact-hero', '.legal-hero'];
  innerHeros.forEach(selector => {
    if (document.querySelector(selector)) {
      tl.fromTo(`${selector} h1`, 
        { y: 20, opacity: 0, filter: 'blur(4px)' }, 
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6 }
      );
      
      if (document.querySelector(`${selector} p`)) {
        tl.fromTo(`${selector} p`, 
          { y: 15, opacity: 0 }, 
          { y: 0, opacity: 0.8 }, 
          '-=0.45'
        );
      }
    }
  });
}

/**
 * Setup subtle depth scroll parallax movements
 */
function initParallaxEffects() {
  // Hero Image Parallax (moves slightly slower/faster than scroll)
  if (document.querySelector('.hero-visual-img')) {
    gsap.to('.hero-visual-img', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 12,
      ease: 'none'
    });
  }

  // Section Background Orbs Parallax
  if (document.querySelector('.bg-gradient-orb')) {
    gsap.to('.bg-gradient-orb', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5
      },
      yPercent: -15,
      ease: 'none'
    });
  }
}

/**
 * Standard scroll-triggered fades, blur transitions, and stagger lists
 */
function initScrollReveals() {
  // Select generic fade-up items
  const reveals = gsap.utils.toArray('.reveal-element, .glass-card, .metric-card, .gallery-item');
  
  // Set initial state dynamically in JS
  gsap.set('.reveal-element', { opacity: 0, y: 15, filter: 'blur(2px)', force3D: true });
  
  reveals.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.45,
      ease: 'power2.out',
      force3D: true, // GPU acceleration
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/**
 * Handle custom layouts like the timeline path or services preview bento
 */
function initPageSpecificAnimations() {
  // Bento Grid Stagger Load
  if (document.querySelector('.services-bento')) {
    gsap.fromTo('.bento-card', 
      { opacity: 0, y: 15, filter: 'blur(3px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-bento',
          start: 'top 85%',
        }
      }
    );
  }

  // Values Grid Stagger (About Page)
  if (document.querySelector('.values-grid')) {
    gsap.fromTo('.value-card', 
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.45,
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 90%'
        }
      }
    );
  }

  // Services Page Grid Stagger
  if (document.querySelector('.services-grid')) {
    gsap.fromTo('.service-page-card', 
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.45,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 90%'
        }
      }
    );
  }

  // Horizontal Timeline Reveal (About Page)
  if (document.querySelector('.timeline-grid')) {
    gsap.fromTo('.timeline-node',
      { opacity: 0, scale: 0.98, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.timeline-grid',
          start: 'top 85%'
        }
      }
    );
  }
}

/**
 * Fullback utilizing IntersectionObserver if libraries are blocked or fail to fetch
 */
function initIntersectionObserverFallback() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // If it's a grid or bento, search for children and trigger them
        if (entry.target.classList.contains('services-bento') || entry.target.classList.contains('timeline-grid')) {
          const cards = entry.target.querySelectorAll('.bento-card, .timeline-node');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('revealed');
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
              card.style.filter = 'blur(0)';
            }, index * 120);
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Register elements to observe
  const targets = document.querySelectorAll('.reveal-element, .glass-card, .metric-card, .gallery-item, .services-bento, .timeline-grid, .service-page-card, .value-card');
  targets.forEach(target => {
    target.style.opacity = '0';
    target.style.transform = 'translateY(30px)';
    target.style.filter = 'blur(4px)';
    target.style.transition = 'all 1s var(--transition-slow)';
    observer.observe(target);
  });

  // Apply default page transitions immediately
  const animates = document.querySelectorAll('.animate-fade-in, .animate-fade-up, .animate-blur-clear');
  animates.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    el.style.filter = 'blur(0)';
  });
}

/**
 * Animate numbers in the metrics section
 */
function initMetricCounters() {
  const isGsapActive = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  
  if (!isGsapActive) return;
  
  const metrics = document.querySelectorAll('.metric-number');
  metrics.forEach(metric => {
    const text = metric.textContent.trim();
    const match = text.match(/^([0-9.]+)(.*)$/);
    if (!match) return;
    
    const targetVal = parseFloat(match[1]);
    const suffix = match[2];
    const hasDecimal = match[1].includes('.');
    
    const obj = { val: 0 };
    metric.textContent = (hasDecimal ? "0.0" : "0") + suffix;
    
    gsap.to(obj, {
      val: targetVal,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: metric,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        metric.textContent = (hasDecimal ? obj.val.toFixed(1) : Math.floor(obj.val)) + suffix;
      }
    });
  });
}

// Auto init on page load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(initAnimations, 100);
});
