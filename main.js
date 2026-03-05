document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll background change
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // Simple Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });

    // Netlify Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            formData.append('form-name', 'contact');

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Ensure Netlify knows which form is being submitted
            const body = new URLSearchParams(formData).toString();

            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: body
            })
                .then(() => {
                    submitBtn.textContent = 'Message Envoyé !';
                    submitBtn.style.background = '#28a745';
                    this.reset();
                    alert('Merci ! Votre message a été envoyé avec succès. Nous vous contacteros muy pronto.');
                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 5000);
                })
                .catch(error => {
                    alert('Oups ! Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
