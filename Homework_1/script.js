document.addEventListener('DOMContentLoaded', function() {
    // hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
    });

    // simple gallery slider
    const slides = document.querySelectorAll('.gallery-images img');
    let current = 0;
    function showSlide(index) {
        slides.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }
    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }
    showSlide(current);
    setInterval(nextSlide, 3000);
});