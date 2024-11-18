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
    const form = document.querySelector('.minimal-form');
    const formMessage = document.getElementById('formMessage');

    if (!form) {
        console.error('Form not found');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const messageInput = form.querySelector('textarea[name="message"]');

        if (!nameInput?.value || !emailInput?.value || !messageInput?.value) {
            formMessage.textContent = 'Please fill in all fields';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
        }

        if (!isValidEmail(emailInput.value)) {
            formMessage.textContent = 'Please enter a valid email address';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
        }

        const data = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
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
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'form-message success';
                form.reset();
            } else {
                throw new Error(responseData.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.className = 'form-message error';
        } finally {
            loadingDiv.remove();
            form.classList.remove('loading');
            formMessage.style.display = 'block';
            
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navMenu = document.querySelector('.navbar-menu');
            const navToggle = document.querySelector('.navbar-toggle');
            
            // Close mobile menu if open
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

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});