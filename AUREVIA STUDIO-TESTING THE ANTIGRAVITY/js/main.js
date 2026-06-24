/* ==========================================================================
   AUREVIA STUDIO DENTAL CARE — MAIN ENTRY POINT & GLOBAL INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Cursor Follower
  initCustomCursor();

  // 2. Initialize Magnetic Elements
  initMagneticElements();

  // 3. Initialize Contact Form Validation (if present)
  initContactFormValidation();

  // 4. Handle Image Fallback Placeholders
  initImageFallbacks();
});

/**
 * Custom Cursor with Lerp interpolation for butter-smooth movement
 */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (!cursor || !cursorRing) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let ringX = mouseX;
  let ringY = mouseY;

  let hideTimeout = null;

  // Function to show cursor and reset inactivity timer
  function triggerActivity(clientX, clientY) {
    if (clientX !== undefined && clientY !== undefined) {
      mouseX = clientX;
      mouseY = clientY;
    }

    cursor.classList.add('visible');
    cursorRing.classList.add('visible');

    // Reset inactivity timer
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      cursor.classList.remove('visible');
      cursorRing.classList.remove('visible');
    }, 1000); // Disappear after 1 second of inactivity
  }

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    triggerActivity(e.clientX, e.clientY);
  });

  // Track clicks
  window.addEventListener('mousedown', (e) => {
    triggerActivity(e.clientX, e.clientY);
  });

  // Track touch coordinates on mobile (click, touch start, drag)
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      triggerActivity(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      triggerActivity();
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      triggerActivity(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      triggerActivity();
    }
  });

  window.addEventListener('touchend', () => {
    // Hide slightly quicker on touch end to avoid hovering when finger is lifted
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      cursor.classList.remove('visible');
      cursorRing.classList.remove('visible');
    }, 450);
  });

  // Track scrolls & wheel events
  window.addEventListener('scroll', () => {
    triggerActivity();
  });

  window.addEventListener('wheel', () => {
    triggerActivity();
  });

  // Lerp calculation: Position = Position + (Target - Position) * Easing
  function render() {
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Hover states listeners
  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .clickable, .testimonial-card');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/**
 * Magnetic button elements. Translates element toward the cursor on hover.
 */
function initMagneticElements() {
  const magneticItems = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-accent, .social-icon, .logo');

  magneticItems.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Translate slightly (max 12px)
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      
      // If it's a pill button, add a slight scale lift
      if (el.classList.contains('btn')) {
        el.style.transform += ` scale(1.02)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}

/**
 * Validates the contact form inputs using front-end rules
 */
function initContactFormValidation() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  const inputs = form.querySelectorAll('.form-control');
  const successAlert = document.getElementById('formSuccessAlert');

  // Input events to clear errors on typing
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('error');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
      const value = input.value.trim();
      const group = input.closest('.form-group');
      const errorMsg = group.querySelector('.form-error-msg');

      // Clear previous error state
      group.classList.remove('error');

      // 1. Check for empty fields
      if (!value) {
        isValid = false;
        group.classList.add('error');
        if (errorMsg) errorMsg.textContent = 'This field is required.';
        return;
      }

      // 2. Validate Email Format
      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          group.classList.add('error');
          if (errorMsg) errorMsg.textContent = 'Please enter a valid email address.';
        }
      }

      // 3. Validate Phone Format (Digits only, min length 10)
      if (input.name === 'phone') {
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
          isValid = false;
          group.classList.add('error');
          if (errorMsg) errorMsg.textContent = 'Please enter a valid 10-digit phone number.';
        }
      }

      // 4. Validate Characters (Prevent script tags / sanitization check)
      const scriptRegex = /[<>]/;
      if (scriptRegex.test(value)) {
        isValid = false;
        group.classList.add('error');
        if (errorMsg) errorMsg.textContent = 'Invalid characters detected.';
      }
    });

    if (isValid) {
      // Simulate form submission success
      form.style.display = 'none';
      if (successAlert) {
        successAlert.style.display = 'block';
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

/**
 * Handle broken images gracefully with warm solid backgrounds and text fallbacks
 */
function initImageFallbacks() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', () => {
      // Replace with beautiful inline SVG placeholder matching site aesthetic
      img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 400 300'%3E%3Crect width='100%25' height='100%25' fill='%23E8DFD3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23C9B48C'%3EAurevia Studio Dental Care%3C/text%3E%3C/svg%3E`;
    });
  });
}
