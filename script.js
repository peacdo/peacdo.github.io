document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navMenu = document.querySelector('.navbar-menu');
            const navToggle = document.querySelector('.navbar-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }

            const offset = 60;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelector('.navbar-toggle').addEventListener('click', function() {
    document.querySelector('.navbar-menu').classList.toggle('active');
    this.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        form.classList.add('loading');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'form-loading';
        loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
        form.appendChild(loadingDiv);
        loadingDiv.style.display = 'flex';

        try {
            const response = await fetch('https://formspree.io/f/mqaklajz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'form-message success';
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.className = 'form-message error';
        } finally {
            loadingDiv.style.display = 'none';
            form.classList.remove('loading');

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });

    form.addEventListener('input', function() {
        formMessage.style.display = 'none';
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}