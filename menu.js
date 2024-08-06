document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu .close-btn');
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '&#8679;';
    document.body.appendChild(scrollToTopBtn);

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu
    closeBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll to top button functionality
    window.addEventListener('scroll', () => {
        scrollToTopBtn.classList.toggle('visible', window.scrollY > 200);
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Lazy load images
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

    // Animate elements on scroll
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
    const imageWidth = carouselImages[0].clientWidth;
    const margin = 20; // Adjust margin as necessary
    const size = imageWidth + margin;
    let interval = setInterval(nextSlide, 3000); // Autoplay every 3 seconds

    function nextSlide() {
        counter = (counter + 1) % carouselImages.length;
        updateCarousel();
    }

    function prevSlide() {
        counter = (counter - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    }

    function updateCarousel() {
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }

    nextBtn.addEventListener('click', () => {
        clearInterval(interval); // Pause autoplay
        nextSlide();
        interval = setInterval(nextSlide, 3000); // Restart autoplay
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(interval); // Pause autoplay
        prevSlide();
        interval = setInterval(nextSlide, 3000); // Restart autoplay
    });

    // Pause autoplay on hover
    carouselSlide.addEventListener('mouseover', () => {
        clearInterval(interval);
    });

    carouselSlide.addEventListener('mouseout', () => {
        interval = setInterval(nextSlide, 3000);
    });
});
