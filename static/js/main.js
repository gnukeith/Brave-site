// Mobile menu functionality
document.getElementById('mobileMenuButton').addEventListener('click', function() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const menuButton = document.getElementById('mobileMenuButton');
    
    if (!menu.contains(e.target) && !menuButton.contains(e.target) && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
});

// Card hover effect for desktop only
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const imageWrapper = document.querySelector('.image-wrapper');
    let isHovered = false;
    let rafId = null;

    function updateCardTransform(e) {
        if (!isHovered) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -20; // Reduced rotation
        const rotateY = ((x - centerX) / centerX) * 20; // Reduced rotation
        const scale = 1.03; // Smaller scale for subtle responsiveness

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        imageWrapper.style.transform = `translateZ(50px)`; // Image pops out less

        rafId = requestAnimationFrame(() => updateCardTransform(e));
    }

    // Only add hover effects on desktop
    if (!window.matchMedia('(max-width: 768px)').matches) {
        card.addEventListener('mouseenter', () => {
            isHovered = true;
            card.style.transition = 'transform 0.15s ease-out'; // Slightly slower transition
            imageWrapper.style.transition = 'transform 0.15s ease-out'; // Slightly slower transition
        });
        
        card.addEventListener('mousemove', (e) => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => updateCardTransform(e));
        });
        
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            card.style.transition = 'transform 0.25s ease-out'; // Smoother reset
            imageWrapper.style.transition = 'transform 0.25s ease-out'; // Smoother reset
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            imageWrapper.style.transform = 'translateZ(0)'; // Reset image position
        });
    }
});