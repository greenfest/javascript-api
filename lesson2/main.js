import './style.css'

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');

    let currentImageIndex = 0;

    function showImage(index) {
        images.forEach((image, i) => {
            if (i === index) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });

        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    });

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', function() {
            currentImageIndex = i;
            showImage(currentImageIndex);
        });
    });

    showImage(currentImageIndex);
});



