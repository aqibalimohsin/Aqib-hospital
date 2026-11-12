document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. Doctor Search & Department Filter (doctors.html)
  const searchInput = document.getElementById('doctorSearch');
  const deptSelect = document.getElementById('deptFilter');
  const doctorCards = document.querySelectorAll('.doctor-card');

  function filterDoctors() {
    if (!searchInput || !deptSelect) return;
    const query = searchInput.value.toLowerCase();
    const dept = deptSelect.value;

    doctorCards.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const cardDept = card.getAttribute('data-dept');
      const matchesName = name.includes(query);
      const matchesDept = dept === 'all' || cardDept === dept;

      card.style.display = matchesName && matchesDept ? 'block' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterDoctors);
  if (deptSelect) deptSelect.addEventListener('change', filterDoctors);

  // Pre-fill doctor if redirected from doctors.html?doctor=...
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDoctor = urlParams.get('doctor');
  const doctorDropdown = document.getElementById('doctorSelect');
  if (selectedDoctor && doctorDropdown) {
    doctorDropdown.value = selectedDoctor;
  }

  // 3. Appointment Form Submission (appointment.html)
  const appointmentForm = document.getElementById('appointmentForm');
  const bookingAlert = document.getElementById('bookingAlert');

  if (appointmentForm) {
    // Set minimum date to today
    const dateInput = document.getElementById('apptDate');
    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const patientName = document.getElementById('patientName').value;
      const phone = document.getElementById('patientPhone').value;
      const department = document.getElementById('deptSelect').value;
      const doctor = document.getElementById('doctorSelect').value;
      const date = document.getElementById('apptDate').value;
      const time = document.getElementById('apptTime').value;

      const refId = 'AQB-' + Math.floor(100000 + Math.random() * 900000);

      bookingAlert.innerHTML = `
        <strong>Appointment Confirmed!</strong><br>
        Reference ID: <b>${refId}</b><br>
        Patient: ${patientName} (${phone})<br>
        Department: ${department} | Doctor: ${doctor}<br>
        Date & Time: ${date} at ${time}
      `;
      bookingAlert.style.display = 'block';
      appointmentForm.reset();
    });
  }

  // 4. Contact Form Submission (contact.html)
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactAlert.style.display = 'block';
      contactForm.reset();
    });
  }
});
