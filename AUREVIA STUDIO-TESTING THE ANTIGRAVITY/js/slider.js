/* ==========================================================================
   AUREVIA STUDIO DENTAL CARE — TESTIMONIAL SLIDER INTERACTION
   ========================================================================== */

function initTestimonialSlider() {
  const container = document.querySelector('.testimonials-slider-container');
  const track = document.querySelector('.testimonials-track');

  if (!container || !track) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let velX = 0;
  let momentumID;

  // Mouse Down Event
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    cancelMomentumTracking();
  });

  // Mouse Leave Event
  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('active');
    beginMomentumTracking();
  });

  // Mouse Up Event
  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('active');
    beginMomentumTracking();
  });

  // Mouse Move Event
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    const prevScrollLeft = container.scrollLeft;
    container.scrollLeft = scrollLeft - walk;
    velX = container.scrollLeft - prevScrollLeft;
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    cancelMomentumTracking();
  });

  container.addEventListener('touchend', () => {
    isDown = false;
    beginMomentumTracking();
  });

  container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    const prevScrollLeft = container.scrollLeft;
    container.scrollLeft = scrollLeft - walk;
    velX = container.scrollLeft - prevScrollLeft;
  });

  // Kinetic Scrolling Momentum
  function beginMomentumTracking() {
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
  }

  function cancelMomentumTracking() {
    cancelAnimationFrame(momentumID);
  }

  function momentumLoop() {
    container.scrollLeft += velX;
    velX *= 0.92; // Friction factor
    if (Math.abs(velX) > 0.5) {
      momentumID = requestAnimationFrame(momentumLoop);
    }
  }

  // Double Check CSS parameters for smooth drag scroll
  container.style.cursor = 'grab';
  container.style.overflowX = 'hidden';
  container.style.display = 'block';
  container.style.width = '100%';
}

// Auto init on page load
window.addEventListener('DOMContentLoaded', initTestimonialSlider);
