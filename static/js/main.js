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



document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const imageWrapper = document.querySelector('.image-wrapper');

    const rotationLimit = 15;
    const scaleUp = 1.05;

    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + (cardRect.width / 2);
        const cardCenterY = cardRect.top + (cardRect.height / 2);

        const offsetX = e.clientX - cardCenterX;
        const offsetY = e.clientY - cardCenterY;

        const rotateX = (offsetY / cardRect.height) * rotationLimit;
        const rotateY = (offsetX / cardRect.width) * -rotationLimit;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleUp})`;
        imageWrapper.style.transform = `translateZ(50px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0) rotateY(0) scale(1)`;
        imageWrapper.style.transform = `translateZ(0)`;
    });
});