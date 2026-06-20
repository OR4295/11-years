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

window.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  }
  if (event.key === 'ArrowLeft') {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
  }
});

const yesNoButtons = Array.from(document.querySelectorAll('.yes-no-button'));

yesNoButtons.forEach(button => {
  button.addEventListener('click', () => {
    const group = button.closest('.yes-no-buttons');
    const targetInputId = group?.dataset.target;
    if (!targetInputId) return;

    const groupButtons = Array.from(group.querySelectorAll('.yes-no-button'));
    groupButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    const hiddenInput = document.getElementById(targetInputId);
    if (hiddenInput) {
      hiddenInput.value = button.dataset.value;
    }
  });
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
