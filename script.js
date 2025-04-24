document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Animacja tekstu
    const texts = [
        "Responsywne strony",
        "Szybkie aplikacje",
        "Nowoczesne rozwiązania",
        "Przyjazne interfejsy"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const dynamicText = document.querySelector('.dynamic-text');
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000); // Dłuższa pauza przed usuwaniem
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500); // Pauza przed następnym słowem
        } else {
            const typingSpeed = isDeleting ? 50 : Math.random() * 50 + 100; // Losowa prędkość pisania
            setTimeout(typeEffect, typingSpeed);
        }
    }

    if (dynamicText) {
        setTimeout(typeEffect, 1000); // Start z opóźnieniem
    }

    // Animate subtitle words
    const subtitleSpans = document.querySelectorAll('.hero-subtitle span');
    subtitleSpans.forEach((span, index) => {
        span.style.animation = `fadeInUp 0.5s ease forwards ${0.5 + index * 0.2}s`;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Pobierz dane z formularza
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                package: contactForm.querySelector('select[name="package"]').value,
                message: contactForm.querySelector('textarea').value
            };

            try {
                // Wyświetl loader
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Wysyłanie...';
                submitButton.disabled = true;

                // Wyślij dane do serwera
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    // Pokaż komunikat sukcesu
                    alert('Dziękujemy za wiadomość! Wysłaliśmy potwierdzenie na Twój adres email.');
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Wystąpił błąd podczas wysyłania wiadomości');
                }
            } catch (error) {
                // Pokaż komunikat błędu
                alert(error.message);
            } finally {
                // Przywróć oryginalny tekst przycisku
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.textContent = 'Wyślij';
                submitButton.disabled = false;
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all service and pricing cards
    document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Portfolio hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.portfolio-overlay').style.opacity = '1';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.portfolio-overlay').style.opacity = '0';
        });
    });

    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialsSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        testimonialsSlider.style.cursor = 'grabbing';
        startX = e.pageX - testimonialsSlider.offsetLeft;
        scrollLeft = testimonialsSlider.scrollLeft;
    });

    testimonialsSlider.addEventListener('mouseleave', () => {
        isDown = false;
        testimonialsSlider.style.cursor = 'grab';
    });

    testimonialsSlider.addEventListener('mouseup', () => {
        isDown = false;
        testimonialsSlider.style.cursor = 'grab';
    });

    testimonialsSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialsSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialsSlider.scrollLeft = scrollLeft - walk;
    });

    // Intersection Observer for new sections
    const observerOptionsNew = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observerNew = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptionsNew);

    // Observe all new sections
    document.querySelectorAll('.portfolio-item, .testimonial-card, .faq-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observerNew.observe(item);
    });

    // Funkcja do obsługi wyboru pakietu
    window.selectPackage = function(packageType) {
        const select = document.querySelector('select[name="package"]');
        if (select) {
            select.value = packageType;
            
            // Płynne przewinięcie do formularza
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Dodanie efektu podświetlenia
                contactForm.classList.add('highlight');
                setTimeout(() => {
                    contactForm.classList.remove('highlight');
                }, 2000);
            }
        }
    }

    // Funkcja do animacji tekstu
    function initTypeAnimation(container) {
        const dynamicText = container.querySelector('.dynamic-text');
        const phrases = JSON.parse(dynamicText.dataset.text);
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Usuwanie tekstu
                dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 700); // Dłuższa pauza przed następnym słowem
                    return;
                }
            } else {
                // Pisanie tekstu
                dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, 2000); // Dłuższa pauza przed usuwaniem
                    return;
                }
            }

            // Zróżnicowana prędkość pisania/kasowania
            const typingSpeed = isDeleting ? 40 : Math.random() * 50 + 80; // Losowa prędkość pisania
            setTimeout(type, typingSpeed);
        }

        // Start animacji
        setTimeout(type, 1000); // Opóźnienie początkowe
    }

    // Inicjalizacja wszystkich animacji tekstu z różnym opóźnieniem
    document.querySelectorAll('.typing-container').forEach((container, index) => {
        setTimeout(() => {
            initTypeAnimation(container);
        }, index * 400); // Różne opóźnienia dla każdego kontenera
    });
}); 