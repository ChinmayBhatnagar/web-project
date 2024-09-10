// Initialize Swiper
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
});

// Function to open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// Close modal with the "Escape" key
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
        '.content, .hero h1, .hero p, .hero a, .about-section h2, .about-section p, .about-section h3, .about-section .objective h4, .about-section .objective p, .officer-card h3, .officer-card p, .pdf-icons span, #Branches h2, #Branches .branch-title, #Branches .sub-branch, #Branches .description, #services h2, #services p, #services .service-card h3, #services .service-card p, #projects h2, #projects .projects-section h3, #projects .project-card h4, #projects .project-card p, #training h2, #training p, #training .training-item h3, #training .training-item p, #contact h2, #contact p, #contact .contact-form h3, #contact .contact-details h3, #contact .contact-details p, #contact .btn, #contact #error-message, footer'
    );

    function setLanguage(language) {
        contentElements.forEach((element) => {
            const dataAttr = language === 'english' ? 'data-english' : 'data-hindi';
            element.textContent = element.getAttribute(dataAttr) || element.textContent;
        });

        languageToggle.textContent = language === 'english' ? 'हिंदी' : 'English';
    }

    languageToggle.addEventListener('click', () => {
        const currentLanguage = languageToggle.textContent === 'हिंदी' ? 'hindi' : 'english';
        setLanguage(currentLanguage);
    });

    setLanguage('english');
});

// Form Submission Functionality
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Get form data

    fetch('process.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        const messageElement = document.getElementById('error-message');
        if (text.trim() === 'success') {
            messageElement.innerText = 'Successfully updated';
            messageElement.style.color = 'green'; // Success message color
        } else {
            messageElement.innerText = 'An error occurred. Please try again.';
            messageElement.style.color = 'red'; // Error message color
        }
        messageElement.style.display = 'block';
    })
    .catch(error => console.error('Request error:', error));
});

// Mobile Menu Toggle
document.querySelector('.menu-icon').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show'); // Toggle 'show' class for menu
});
