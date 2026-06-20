const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIndicator = document.getElementById('slideIndicator');
const form = document.getElementById('questionForm');
const message = document.getElementById('message');
let currentSlide = 0;

function updateSlide() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  slideIndicator.textContent = `${currentSlide + 1} / ${slides.length}`;
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  message.textContent = 'Thank you! Your answers are ready to send.';
  form.reset();

  console.log('Questionnaire submitted:', values);
  // If you add a form service, remove this console logging and
  // add the service's form action or submit handler.
});

updateSlide();
