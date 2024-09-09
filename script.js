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

// Optionally close the modal using the "Escape" key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="display: block"]');
        openModals.forEach((modal) => {
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
        contentElements.forEach(element => {
            if (language === 'english') {
                element.textContent = element.getAttribute('data-english') || element.textContent;
            } else if (language === 'hindi') {
                element.textContent = element.getAttribute('data-hindi') || element.textContent;
            }
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
    event.preventDefault(); // Prevent the default form submission

    var formData = new FormData(this); // Get form data

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true); // Ensure 'process.php' path is correct

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = xhr.responseText.trim();
            const messageElement = document.getElementById('error-message');
            
            if (response === 'success') {
                messageElement.innerText = 'Successfully updated';
                messageElement.style.color = 'green'; // Set success message color to green
            } else {
                messageElement.innerText = 'An error occurred. Please try again.';
                messageElement.style.color = 'red'; // Set error message color to red
            }
            
            messageElement.style.display = 'block';
        } else {
            console.error('Server error:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send(formData); // Send the form data to the server
});