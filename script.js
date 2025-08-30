document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navActions = document.querySelector('.nav-actions');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Reorder elements on mobile
        if (navLinks.classList.contains('active')) {
            navActions.style.order = '3';
        } else {
            navActions.style.order = '2';
        }
    });

    // Handle clicks on nav links to close menu on mobile
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navActions.style.order = '2';
            }
        });
    });

    // Theme toggle logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        body.classList.add(currentTheme);
        themeToggleBtn.innerHTML = currentTheme === 'light-mode' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const newTheme = body.classList.contains('light-mode') ? 'light-mode' : '';
        localStorage.setItem('theme', newTheme);
        themeToggleBtn.innerHTML = newTheme === 'light-mode' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Particle animation logic
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * -15}s`;
        particlesContainer.appendChild(particle);
    }

    // Typing animation logic
    const typingTextElement = document.getElementById('typingText');
    const texts = ["Cloud Engineer", "DevOps Engineer", "Automation Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        const currentChars = currentText.slice(0, charIndex);
        typingTextElement.textContent = currentChars;

        if (!isDeleting && charIndex < currentText.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 1000);
        }
    }
    type();

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const interval = setInterval(() => {
                    if (current <= target) {
                        entry.target.textContent = current;
                        current++;
                    } else {
                        clearInterval(interval);
                    }
                }, 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });

    // Fade-in sections on scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Hide loader after a delay
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
              'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                toast.textContent = 'Message sent successfully!';
                toast.classList.add('show');
                
                // Reset form
                contactForm.reset();
            } else {
                // Show error message
                toast.textContent = 'Oops! There was a problem submitting your form.';
                toast.classList.add('show');
            }
            
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        })
        .catch(error => {
            // Show error message
            toast.textContent = 'Oops! There was a problem submitting your form.';
            toast.classList.add('show');
            
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
            
            console.error('Error:', error);
        });
    });
});
