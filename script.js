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
    },
    speed: 600, // Adjust the speed for smoother transitions
    effect: 'fade', // Optional: Adds a fade effect between slides
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevents background scroll when modal is open
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restores background scroll
    }
}

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    document.querySelectorAll('.modal').forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restores background scroll
        }
    });
});
