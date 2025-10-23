document.addEventListener('DOMContentLoaded', () => {
    // --- Common Elements (Might exist on multiple pages) ---
    const header = document.getElementById('main-header'); // For scrolled effect on index.html
    const currentYearIndex = document.getElementById('current-year');
    const currentYearContact = document.getElementById('current-year-contact');

    // Scrolled Header Effect (Applies ONLY if header exists on index.html)
    if (header) { // 'main-header' only exists on index.html
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Set Current Year in Footer (Check both IDs)
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
    const rotatingGalleryItems = document.querySelectorAll('.rotating-gallery-item');

    // Mobile Menu Toggle for index.html
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        // Close menu if clicking outside
        window.addEventListener('click', (event) => {
            // Check if menu is open, click was outside menu, and click was not on the button
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Initialize GLightbox ONLY if gallery items exist (on index.html)
    // Use a single, consistent variable name 'glightboxInstance'
    let glightboxInstance = null;
    if (galleryItemsExist && typeof GLightbox !== 'undefined') {
         glightboxInstance = GLightbox({ // Assign to the shared variable
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
    
    const interestedInSelect = document.getElementById('living-option');
    if (interestedInSelect) { // Only run if the select element exists (i.e., on contact.html)
        const urlParams = new URLSearchParams(window.location.search);
        const interestParam = urlParams.get('interest');

        if (interestParam) {
            // Find the option whose text matches the URL parameter
            for (let i = 0; i < interestedInSelect.options.length; i++) {
                if (interestedInSelect.options[i].value === interestParam) {
                    interestedInSelect.value = interestParam;
                    break; // Found and selected, exit loop
                }
            }
        }
    }

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

// Image Rotation Logic for Gallery (if rotating items exist on index.html)
    if (rotatingGalleryItems.length > 0) {
        rotatingGalleryItems.forEach(item => {
            const imagePaths = item.getAttribute('data-images').split(',');
            const altTexts = item.getAttribute('data-alt').split(',');
            let currentImageIndex = 0;
            const images = []; // Use a simple array to store image elements

            // Create image elements and set initial state
            imagePaths.forEach((path, index) => {
                const trimmedPath = path.trim();
                const trimmedAlt = altTexts[index] ? altTexts[index].trim() : 'Gallery image';

                const img = new Image(); // For preloading
                img.src = trimmedPath;

                const imgElement = document.createElement('img');
                imgElement.src = trimmedPath;
                imgElement.alt = trimmedAlt;
                imgElement.loading = 'lazy';
                // Apply all structural and transition classes
                imgElement.className = "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-4000 ease-in-out";

                // Initially hide all images with CSS visibility and a lower z-index
                imgElement.style.visibility = 'hidden';
                imgElement.style.opacity = '0';
                imgElement.style.zIndex = '1';

                item.appendChild(imgElement);
                images.push(imgElement);
            });

            if (images.length === 0) return; // No images, nothing to do

            // Function to display a specific image
            const displayImage = (indexToShow) => {
                // Hide current active image (if any)
                if (images[currentImageIndex]) {
                    images[currentImageIndex].style.opacity = '0';
                    images[currentImageIndex].style.visibility = 'hidden';
                    images[currentImageIndex].style.zIndex = '1';
                }

                currentImageIndex = indexToShow;

                // Show the new image
                const newImage = images[currentImageIndex];
                newImage.style.visibility = 'visible'; // Make visible
                newImage.style.opacity = '1';       // Fade in
                newImage.style.zIndex = '2';        // Bring to front

                // Update the parent <a>'s href for GLightbox
                item.href = newImage.src;
            };

            // Initial display: wait a moment to ensure all elements are painted
            // and then display the first image.
            setTimeout(() => {
                displayImage(0); // Display the first image
            }, 100); // Small delay to ensure initial render is complete

            // Start rotation if there's more than one image
            if (images.length > 1) {
                setInterval(() => {
                    const nextIndex = (currentImageIndex + 1) % images.length;
                    displayImage(nextIndex);
                }, 8000); // Rotate every 5 seconds
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
             // Check if menu is open, click was outside menu, and click was not on the button
            if (!mobileMenuContact.classList.contains('hidden') && !mobileMenuContact.contains(event.target) && !menuBtnContact.contains(event.target)) {
                mobileMenuContact.classList.add('hidden');
            }
        });
    }

}); // End of DOMContentLoaded listener