 // Main navigation menu script
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const header = document.getElementById('main-header');
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
});
window.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize GLightbox
const lightbox = GLightbox({
    loop: true // This allows you to loop through the gallery
});

 // Mobile menu toggle for the contact page
const menuBtnContact = document.getElementById('menu-btn-contact');
const mobileMenuContact = document.getElementById('mobile-menu-contact');
menuBtnContact.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuContact.classList.toggle('hidden');
});
window.addEventListener('click', () => {
    if (!mobileMenuContact.classList.contains('hidden')) {
        mobileMenuContact.classList.add('hidden');
    }
});

const glightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
});

document.getElementById('current-year-contact').textContent = new Date().getFullYear();

document.getElementById('current-year').textContent = new Date().getFullYear();