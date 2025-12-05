document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE MENU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            if (menuToggle) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- FLEET FILTERING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                carCards.forEach(card => {
                    const category = card.querySelector('.car-tag').textContent.toLowerCase();
                    
                    if (filterValue === 'all' || category.includes(filterValue.toLowerCase()) || 
                       (filterValue === 'awd' && (category.includes('awd') || category.includes('awb'))) ) {
                        card.style.display = 'block';
                        // Add animation classes if you have them, or simple fade
                        card.animate([
                            { opacity: 0, transform: 'scale(0.95)' },
                            { opacity: 1, transform: 'scale(1)' }
                        ], {
                            duration: 300,
                            easing: 'ease-out'
                        });
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- BOOKING MODAL ---
    const modal = document.getElementById('bookingModal');
    const bookButtons = document.querySelectorAll('.book-trigger');
    const closeModal = document.querySelector('.close-modal');
    const modalCarName = document.getElementById('modalCarName');
    const modalCarInput = document.getElementById('carSelect'); // Reusing the select from form

    function openModal(carName) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        if (modalCarName) modalCarName.textContent = `Booking Request: ${carName}`;
        
        // Auto-select the car in the dropdown
        if (modalCarInput) {
            // Try to find a maching option
            const options = Array.from(modalCarInput.options);
            const matchingOption = options.find(opt => opt.value.includes(carName));
            if (matchingOption) {
                modalCarInput.value = matchingOption.value;
            } else {
                // Fallback if exact match fails
                modalCarInput.value = carName;
            }
        }
    }

    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (bookButtons.length > 0) {
        bookButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const carName = btn.getAttribute('data-car');
                openModal(carName);
            });
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    // Close on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }

    // --- FORM HANDLING ---
    const rentalForm = document.getElementById('rentalForm');
    if (rentalForm) {
        rentalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            // Simulate loading
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const ratePlan = document.getElementById('ratePlan').value;
                const car = modalCarInput ? modalCarInput.value : 'Selected Car';
                
                alert(`Thank you! Your ${ratePlan} booking request for the ${car} has been received. We will contact you shortly.`);
                
                submitBtn.innerText = 'Request Sent!';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    closeModalFunc();
                    // Reset form
                    rentalForm.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 1500);

            }, 1000);
        });
    }

});
