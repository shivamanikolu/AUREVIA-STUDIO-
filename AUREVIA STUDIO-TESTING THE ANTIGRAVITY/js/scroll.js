/* ==========================================================================
   AUREVIA STUDIO DENTAL CARE — LENIS SMOOTH SCROLL INITIALIZATION
   ========================================================================== */

let lenisInstance = null;

function initLenis() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis smooth scroll library not loaded. Falling back to default scroll.');
    return;
  }

  // Create Lenis instance with premium cubic timing curve
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  lenisInstance = new Lenis({
    duration: isMobile ? 0 : 0.8,
    duration: isMobile ? 0 : 0.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !isMobile,
    wheelMultiplier: 1.0,
    smoothTouch: false, // Maintain default native iOS/Android flick scrolls
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Bind Lenis scroll update to GSAP ScrollTrigger updates
  lenisInstance.on('scroll', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.update();
    }
  });

  // Hook into GSAP ticker loops
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    
    // Disable lag smoothing to prevent animation jumps on complex frames
    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback animation frame loop
    function step(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  window.lenis = lenisInstance;
  console.log('Lenis initialized successfully.');
}

// Smooth scroll hash helper
function handleHashScroll() {
  if (!window.lenis) return;
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        window.lenis.scrollTo(target, {
          offset: -100, // Offset to clear the sticky header nav
          duration: 1.2,
          immediate: false
        });
      }, 300);
    }
  }
}

// Listen for hash changes and page load with hash
window.addEventListener('hashchange', handleHashScroll);
window.addEventListener('load', () => {
  if (window.location.hash) {
    handleHashScroll();
  }
});

// Auto init on page load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(initLenis, 50);
});
