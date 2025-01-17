// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Dropdown toggle
function toggleDropdown(id) {
    // Close all dropdowns first
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        if (dropdown.id !== id && !dropdown.classList.contains('hidden')) {
            dropdown.classList.add('hidden');
        }
    });

    // Toggle the clicked dropdown
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle('hidden');
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.matches('.dropdown button')) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            if (!dropdown.classList.contains('hidden')) {
                dropdown.classList.add('hidden');
            }
        });
    }
});

// Card 3D effect
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const imageWrapper = document.querySelector('.image-wrapper');

    const rotationLimit = 15;
    const scaleUp = 1.05;

    function handleMove(e) {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + (cardRect.width / 2);
        const cardCenterY = cardRect.top + (cardRect.height / 2);

        const offsetX = e.clientX - cardCenterX;
        const offsetY = e.clientY - cardCenterY;

        const rotateX = (offsetY / cardRect.height) * rotationLimit;
        const rotateY = (offsetX / cardRect.width) * -rotationLimit;

        // Check if we're on mobile/tablet
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        
        if (!isMobile) {
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleUp})`;
            imageWrapper.style.transform = `translateZ(50px)`;
        }
    }

    function handleLeave() {
        card.style.transform = `rotateX(0) rotateY(0) scale(1)`;
        imageWrapper.style.transform = `translateZ(0)`;
    }

    // Only add hover effects on non-mobile devices
    if (!window.matchMedia('(max-width: 768px)').matches) {
        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);
    }
});