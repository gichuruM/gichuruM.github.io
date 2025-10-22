document.addEventListener('DOMContentLoaded', () => {
    // --- Common Elements (Might exist on multiple pages) ---
    const header = document.getElementById('main-header'); // For scrolled effect
    const currentYearIndex = document.getElementById('current-year');
    const currentYearContact = document.getElementById('current-year-contact');

    // Scrolled Header Effect (Applies if header exists)
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Set Current Year in Footer
    if (currentYearIndex) {
        currentYearIndex.textContent = new Date().getFullYear();
    }
    if (currentYearContact) {
        currentYearContact.textContent = new Date().getFullYear();
    }


    // --- index.html Specific Elements & Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const closeModalButtons = document.querySelectorAll('.modal-close');
    const galleryItemsExist = document.querySelector('.gallery-item'); // Check if gallery exists

    // Mobile Menu Toggle for index.html
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        // Close menu if clicking outside
        window.addEventListener('click', (event) => {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Initialize GLightbox ONLY if gallery items exist (on index.html)
    if (galleryItemsExist && typeof GLightbox !== 'undefined') {
        const glightbox = GLightbox({
            selector: '.glightbox', // Use the specific selector
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
        });
    }

    // Modal (Pop-up) Logic ONLY if modal buttons exist (on index.html)
    if (openModalButtons.length > 0 && modalOverlays.length > 0 && closeModalButtons.length > 0) {
        // Function to open a modal
        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active'); // Use CSS class to show
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        // Function to close a modal
        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active'); // Use CSS class to hide
            document.body.style.overflow = ''; // Allow background scrolling again
        }

        // Add click event to all "Learn More" buttons
        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the link action
                const modalId = button.getAttribute('data-modal-target');
                const modal = document.getElementById(modalId);
                openModal(modal);
            });
        });

        // Add click event to all close buttons (the 'X')
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal-overlay');
                closeModal(modal);
            });
        });

        // Add click event to all overlays (to close when clicking outside the content)
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                // Check if the click is directly on the overlay, not the modal content inside
                if (e.target === overlay) {
                    closeModal(overlay);
                }
            });
        });

        // Close modal with the Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                const activeModal = document.querySelector('.modal-overlay.active');
                closeModal(activeModal);
            }
        });
    }


    // --- contact.html Specific Elements & Logic ---
    const menuBtnContact = document.getElementById('menu-btn-contact');
    const mobileMenuContact = document.getElementById('mobile-menu-contact');

    // Mobile Menu Toggle for contact.html
    if (menuBtnContact && mobileMenuContact) {
        menuBtnContact.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuContact.classList.toggle('hidden');
        });
        // Close menu if clicking outside
        window.addEventListener('click', (event) => {
            if (!mobileMenuContact.classList.contains('hidden') && !mobileMenuContact.contains(event.target) && !menuBtnContact.contains(event.target)) {
                mobileMenuContact.classList.add('hidden');
            }
        });
    }

}); // End of DOMContentLoaded listener