// Initialize Swiper with updated settings
const swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    speed: 600,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    responsive: {
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    }
});

// Modal functionality with enhancements
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Disable body scroll when modal is open
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable body scroll
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// Close modal on Escape key press
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal[style*="display: block"]').forEach((modal) => {
            closeModal(modal.id);
        });
    }
});

// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('languageToggle');
    const contentElements = document.querySelectorAll(
        '.content, .hero h1, .hero p, .hero a, .about-section h2, .about-section p, .about-section h3, .about-section .objective h4, .about-section .objective p, .officer-card h3, .officer-card p, .pdf-icons span, #Branches h2, #Branches .branch-title, #Branches .sub-branch, #Branches .description, #services h2, #services p, #services .service-card h3, #services .service-card p, #projects h2, #projects .projects-section h3, #projects .project-card h4, #projects .project-card p, #training h2, #training p, #training .training-item h3, #training .training-item p, #contact h2, #contact p, #contact .contact-form h3, #contact .contact-details h3, #contact .contact-details p, #contact .btn, #contact #error-message, footer, .news-strip marquee, .news-strip .news-button' // Added .news-strip marquee and .news-button
    );

    function setLanguage(language) {
        contentElements.forEach(element => {
            const englishText = element.getAttribute('data-english');
            const hindiText = element.getAttribute('data-hindi');
            element.textContent = language === 'english' ? englishText : hindiText;
        });

        languageToggle.textContent = language === 'english' ? 'हिंदी' : 'English';
    }

    languageToggle.addEventListener('click', () => {
        const currentLanguage = languageToggle.textContent === 'हिंदी' ? 'hindi' : 'english';
        setLanguage(currentLanguage);
    });

    setLanguage('english'); // Set default language
});

// Form Submission with improved error handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);

    xhr.onload = function() {
        const messageElement = document.getElementById('error-message');
        if (xhr.status === 200) {
            const response = xhr.responseText.trim();
            if (response === 'success') {
                messageElement.textContent = 'Successfully updated';
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = 'An error occurred. Please try again.';
                messageElement.style.color = 'red';
            }
        } else {
            messageElement.textContent = 'Server error. Please try again later.';
            messageElement.style.color = 'red';
        }
        messageElement.style.display = 'block';
    };

    xhr.onerror = function() {
        document.getElementById('error-message').textContent = 'Request error';
    };

    xhr.send(formData);
});

// Toggle mobile menu visibility
document.querySelector('.menu-icon').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
});

// Close mobile menu when clicking a navigation link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('show');
    });
});
