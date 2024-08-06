document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu .close-btn');
    
    // Create and style the "scroll to top" button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '&#8679;';
    document.body.appendChild(scrollToTopBtn);
  
    // Toggle mobile menu visibility
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
  
    // Close the mobile menu when the close button is clicked
    closeBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
  
    // Close the mobile menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
  
    // Enable smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
  
    // Show or hide the "scroll to top" button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
  
    // Scroll to the top of the page when the "scroll to top" button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
  
    // Lazy load images when they come into view
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
  
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
  
    // Add 'in-view' class to elements when they scroll into view
    const scrollElements = document.querySelectorAll('.scroll-element');
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    });
  
    scrollElements.forEach(el => {
        elementObserver.observe(el);
    });
  
    // Carousel functionality
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
  
    let counter = 0;
    const size = carouselImages[0].clientWidth + 20; // 20px for margin
  
    // Move to the next image in the carousel
    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) {
            counter = -1;
        }
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        counter++;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });
  
    // Move to the previous image in the carousel
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) {
            counter = carouselImages.length;
        }
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        counter--;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });
  });
  