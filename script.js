// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Toggle menu icon between hamburger and close
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fade-in effect for Shop Now buttons
    const shopNowButtons = document.querySelectorAll('.shop-now');
    
    const fadeInOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    shopNowButtons.forEach(button => {
        fadeInObserver.observe(button);
    });
    
    // Parallax Scrolling Effect
    const parallaxSections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - window.innerHeight && 
                scrollPosition <= sectionTop + sectionHeight) {
                const speed = 0.3;
                const yPos = (scrollPosition - sectionTop) * speed;
                
                // Add parallax effect with book-themed background where appropriate
                if (!section.classList.contains('hero') && !section.classList.contains('special-offers')) {
                    section.style.backgroundPosition = `center ${yPos}px`;
                }
            }
        });
    });
    
    // Auto-scrolling gallery pause on hover
    const scrollingWrapper = document.querySelector('.scrolling-wrapper');
    
    if (scrollingWrapper) {
        scrollingWrapper.addEventListener('mouseenter', () => {
            scrollingWrapper.style.animationPlayState = 'paused';
        });
        
        scrollingWrapper.addEventListener('mouseleave', () => {
            scrollingWrapper.style.animationPlayState = 'running';
        });
    }
    
    // Product Category Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter products based on category
                const category = button.getAttribute('data-category');
                
                productItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // In a real scenario, this would submit the form to a server
                // For demonstration purposes, just show a success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    // Opening Book Animation for About Page
    const openingBook = document.getElementById('opening-book');
    
    if (openingBook) {
        // Trigger animation when the element is in view
        const bookObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    bookObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        bookObserver.observe(openingBook);
    }
    
    // Product Image Gallery
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainProductImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image
                mainProductImage.src = this.src;
                mainProductImage.alt = this.alt;
                
                // Update active thumbnail
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-large');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // In a real e-commerce site, this would add the product to a cart
                // For demonstration, just show a confirmation message
                const productName = this.closest('.product-details, .product-info')?.querySelector('h3, h1')?.textContent || 'Product';
                
                alert(`${productName} has been added to your cart!`);
                
                // Animate the button
                this.classList.add('added');
                setTimeout(() => {
                    this.classList.remove('added');
                }, 1500);
            });
        });
    }
    
    // Quantity Controls for Product Page
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.querySelector('.decrease-quantity');
    const increaseBtn = document.querySelector('.increase-quantity');
    
    if (quantityInput && decreaseBtn && increaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > parseInt(quantityInput.min)) {
                quantityInput.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value < parseInt(quantityInput.max)) {
                quantityInput.value = value + 1;
            }
        });
        
        // Prevent manual entry of non-numeric values
        quantityInput.addEventListener('input', () => {
            let value = parseInt(quantityInput.value);
            if (isNaN(value) || value < parseInt(quantityInput.min)) {
                quantityInput.value = quantityInput.min;
            } else if (value > parseInt(quantityInput.max)) {
                quantityInput.value = quantityInput.max;
            }
        });
    }
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination button');
    
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // In a real scenario, this would load different pages of products
                // For demonstration, just update the active page number
                
                if (this.classList.contains('page-number')) {
                    document.querySelectorAll('.page-number').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Scroll to top of product section
                    const productSection = document.querySelector('.product-categories');
                    if (productSection) {
                        productSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Alert for demonstration purposes
                    alert(`Navigating to page ${this.textContent}`);
                } else if (this.classList.contains('prev-page')) {
                    const activePage = document.querySelector('.page-number.active');
                    const prevPage = activePage.previousElementSibling;
                    
                    if (prevPage && prevPage.classList.contains('page-number')) {
                        activePage.classList.remove('active');
                        prevPage.classList.add('active');
                        alert(`Navigating to previous page: ${prevPage.textContent}`);
                    }
                } else if (this.classList.contains('next-page')) {
                    const activePage = document.querySelector('.page-number.active');
                    const nextPage = activePage.nextElementSibling;
                    
                    if (nextPage && nextPage.classList.contains('page-number')) {
                        activePage.classList.remove('active');
                        nextPage.classList.add('active');
                        alert(`Navigating to next page: ${nextPage.textContent}`);
                    }
                }
            });
        });
    }
});