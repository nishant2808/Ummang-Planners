function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ─── EMAILJS CONFIG ────────────────────────────────────────
// Step 3: Neeche apni 3 IDs daalo
const EMAILJS_PUBLIC_KEY  = 'YnKjAtBS0LP_pzvbe';     // Account > API Keys
const EMAILJS_SERVICE_ID  = 'service_iay3ynm';     // Email Services > Service ID
const EMAILJS_TEMPLATE_ID = 'template_24p0ypc';    // Email Templates > Template ID
// ───────────────────────────────────────────────────────────

function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const successBox = document.getElementById('formSuccess');
  const errorBox   = document.getElementById('formError');

  btn.textContent = 'Sending...';
  btn.disabled = true;
  successBox.style.display = 'none';
  errorBox.style.display   = 'none';

  const templateParams = {
    from_name    : document.getElementById('field_name').value,
    phone        : document.getElementById('field_phone').value,
    from_email   : document.getElementById('field_email').value,
    wedding_date : document.getElementById('field_date').value || 'Not specified',
    guests       : document.getElementById('field_guests').value || 'Not specified',
    message      : document.getElementById('field_message').value || 'No message',
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      successBox.style.display = 'block';
      btn.textContent = 'Sent ✓';
      e.target.reset();
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      errorBox.style.display = 'block';
      btn.textContent = 'Send Enquiry →';
      btn.disabled = false;
    });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Phone: allow only digits, +, spaces, hyphens
document.getElementById('field_phone').addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9+\s\-]/g, '');
});

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 80) {
    nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    nav.style.boxShadow = 'none';
  }
});


(function(){ emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); })();
 
  flatpickr("#field_date", {
    dateFormat: "d-m-Y",
    minDate: "today",
    disableMobile: false
  });
  // Category-wise gallery groups
  const galleryMap = {
    mandap:    'lg-mandap',
    candle:    'lg-candle',
    floral:    'lg-floral',
    sangeet:   'lg-sangeet',
    reception: 'lg-reception',
    ring:      'lg-ring',
  };

  const lgInstances = {};
  Object.entries(galleryMap).forEach(([key, elId]) => {
    const el = document.getElementById(elId);
    if (!el) return;
    lgInstances[key] = lightGallery(el, {
      selector: 'a',
      plugins: [lgZoom, lgThumbnail],
      speed: 400,
      thumbnail: true,
      animateThumb: true,
      showZoomInOutIcons: true,
      actualSize: false,
      toggleThumb: true,
      strings: { titlebarTitle: 'Wedding Gallery' },
      customSlideName: true,
    });
  });

  // Attach click on cover thumbnails
  document.querySelectorAll('.gallery-item').forEach(cover => {
    cover.addEventListener('click', () => {
      const key = cover.dataset.category;
      if (lgInstances[key]) lgInstances[key].openGallery(0);
    });
  });

  // add title
  document.addEventListener('DOMContentLoaded', function () {
      const parentDivs = document.querySelectorAll('.lg-close'); // Changed variable name for clarity

      parentDivs.forEach(parentDiv => {
          const createDiv = document.createElement('div'); // Fixed typo
          createDiv.classList.add('lg-gallery-title');
          createDiv.innerHTML = `<span class="image-gallery-title" title="Wedding Gallery">Wedding <em>Gallery</em></span>`; // Fixed innerHTML typo

          insertAfter(createDiv, parentDiv);
      });

      function insertAfter(newElement, referenceElement) {
          referenceElement.parentNode?.insertBefore(newElement, referenceElement.nextSibling);
      }
  });