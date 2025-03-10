let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
    updateSlidePosition();
}

function updateSlidePosition() {
    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function selectSlide(index) {
    showSlide(index);
}

// Управление слайдами с помощью нажатия клавиш
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Обработка касаний для мобильных устройств
const slider = document.querySelector('.slider');
let startX;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
    const endX = e.touches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            nextSlide(); // Провели влево
        } else {
            prevSlide(); // Провели вправо
        }
        startX = endX; // Обновляем начальную позицию
    }
});

// Обработка мыши для настольных ПК
slider.addEventListener('mousedown', (e) => {
    startX = e.clientX;

    const mouseMoveHandler = (e) => {
        const endX = e.clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide(); // Провели влево
            } else {
                prevSlide(); // Провели вправо
            }
            slider.removeEventListener('mousemove', mouseMoveHandler);
        }
    };

    slider.addEventListener('mousemove', mouseMoveHandler);
    slider.addEventListener('mouseup', () => {
        slider.removeEventListener('mousemove', mouseMoveHandler);
    });

    slider.addEventListener('mouseleave', () => {
        slider.removeEventListener('mousemove', mouseMoveHandler);
    });
});

// // Автоматическое переключение слайдов (по желанию)
// setInterval(() => {
//     nextSlide();
// }, 3000);
