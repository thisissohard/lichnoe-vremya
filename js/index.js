var slides = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dot');
var nextBtn = document.getElementById('nextSlide');
var prevBtn = document.getElementById('prevSlide');
var current = 0;

function showSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function () {
        showSlide(Number(this.dataset.index));
  });
}

nextBtn.addEventListener('click', function () {
    var next = current + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
});

prevBtn.addEventListener('click', function () {
    var prev = current - 1;
    if (prev < 0) prev = slides.length - 1;
    showSlide(prev);
});