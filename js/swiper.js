const slider = document.querySelector(".slider");
const slides = slider.querySelector(".slides");
const slideList = slides.querySelectorAll("img");
const arrowLeft = slider.querySelector(".left-arrow");
const arrowRight = slider.querySelector(".right-arrow");
const indicators = slider.querySelectorAll(".indicator");

let currentSlide = 0;
let slideInterval;

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  goToSlide(currentSlide - 1);
}

function goToSlide(n) {
  if (n >= slideList.length) {
    n = 0;
  } else if (n < 0) {
    n = slideList.length - 1;
  }
  slides.style.transform = `translateX(${(n * -100) % (slideList.length * 100)}%)`;
  currentSlide = n;
  setActiveIndicator(currentSlide);
}

function setActiveIndicator(n) {
  indicators.forEach((indicator, i) => {
    if (i === n) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

arrowLeft.addEventListener("click", previousSlide);
arrowRight.addEventListener("click", nextSlide);

indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    goToSlide(i);
  });
});

function startSlide() {
  slideInterval = setInterval(nextSlide, 2000);
}

function stopSlide() {
  clearInterval(slideInterval);
}

slider.addEventListener("mouseover", stopSlide);
slider.addEventListener("mouseleave", startSlide);

setActiveIndicator(currentSlide);
startSlide();
