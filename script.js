document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navMenu = document.querySelector('.navbar-menu');
            const navToggle = document.querySelector('.navbar-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
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

    const form = document.querySelector('.minimal-form');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            form.classList.add('loading');
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'form-loading';
            loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
            form.appendChild(loadingDiv);
            loadingDiv.style.display = 'flex';

            fetch('https://formspree.io/f/mqaklajz', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.className = 'form-message success';
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
            })
            .finally(() => {
                loadingDiv.remove();
                form.classList.remove('loading');
                formMessage.style.display = 'block';
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
        });

        form.addEventListener('input', function() {
            formMessage.style.display = 'none';
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
