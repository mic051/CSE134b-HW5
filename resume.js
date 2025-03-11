document.addEventListener('DOMContentLoaded', () => {
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let commentInput = document.getElementById('comment');
    let error = document.getElementById('errorMsg');
    let info = document.getElementById('infoMsg');
    let textColor = '#8BE9FD';
    let form_errors = [];
    let themeToggle = document.getElementById('themeToggle');
    let themeIcon = document.getElementById('themeIcon');
    let currentTheme = localStorage.getItem('data-theme') || 'dark';

    localStorage.setItem('data-theme', 'dark');

    document.addEventListener('input', (event) => {
        let input = event.target;

        if (input.hasAttribute('required') && input.value.trim() === '') {
            event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
            nameInput.classList.remove('flash-error');
            nameInput.classList.add('flash-error');
            error.textContent = 'Error: Please only enter letters in the name field.'
            error.style.color = 'red';
            setTimeout(() => {
                error.style.opacity = '0';
            }, 10000);
            form_errors.push(`${input.id} was left empty when required.`);
        }
        
    });

    nameInput.addEventListener('change', (event) => {
        if (!event.target.value.match(/^[a-zA-Z\s]*$/)) {
            event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, '');
            nameInput.classList.remove('flash-error');
            nameInput.classList.add('flash-error');
            error.textContent = 'Error: Please only enter letters in the name field.'
            error.style.color = 'red';
            setTimeout(() => {
                error.style.opacity = '0';
            }, 10000);
            form_errors.push('Invalid character in name field')
        }
        else {
            nameInput.classList.remove('flash-error');
            nameInput.classList.add('clear-error');
            nameInput.setCustomValidity('');
            error.style.color = textColor;
        }
    });

    
    emailInput.addEventListener('change', (event) => {
        if (emailInput.validity.typeMismatch) {
            emailInput.setCustomValidity(`This email's format is incorrect.`);
            emailInput.classList.remove('flash-error');
            emailInput.classList.add('flash-error');
            error.textContent = 'Error: Please enter a valid email'
            error.style.color = 'red';
            setTimeout(() => {
                error.style.opacity = '0';
            }, 10000);
            form_errors.push('Invalid character in email field')
        }

        else {
            emailInput.classList.remove('flash-error');
            emailInput.classList.add('clear-error');
            emailInput.setCustomValidity('');
            error.style.color = textColor;
        }
    });

    commentInput.addEventListener('keyup', (event) => {
        commentInput.setCustomValidity('');
        let maxLength = commentInput.getAttribute('maxlength');
        let currentLength = commentInput.value.length;
        let remaining = maxLength - currentLength;

        info.textContent = `Characters left for comment: ${remaining}`;

        if (remaining < 50 && remaining > 0) {
            info.style.color = 'orange';
        }

        else if (remaining <= 0) {
            commentInput.setCustomValidity(`Comment has execeeded character limit.`);
            commentInput.classList.remove('flash-error');
            commentInput.classList.add('flash-error');
            error.textContent = 'Comment has execeeded character limit.'
            error.style.color = 'red';
            info.style.color = 'red';
            setTimeout(() => {
                error.style.opacity = '0';
            }, 10000);
            form_errors.push('Comment length has exceeded maxlength')
        }

        else {
            commentInput.classList.remove('flash-error');
            commentInput.classList.add('clear-error');
            commentInput.setCustomValidity('');
            error.style.color = textColor;
            info.style.color = textColor;
        }
    });

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let errorInput = document.createElement('input');
        errorInput.type = 'hidden';
        errorInput.name = 'form-errors';
        errorInput.value = JSON.stringify(form_errors); 
        this.appendChild(errorInput);
    
        let formData = new FormData(this);
    
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });

    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeIcon.src = "assets/sun.png";
    }

    else {
        themeIcon.src = "assets/moon.png";
    }

    themeToggle.addEventListener("click", () => {
        let newTheme = document.documentElement.getAttribute("data-theme");

        if (newTheme === "dark") {
            newTheme = "light";
        } 
        else {
            newTheme = "dark";
        }

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("data-theme", newTheme);

        if (newTheme === 'dark') {
            themeIcon.src = "assets/sun.png";
        }
    
        else {
            themeIcon.src = "assets/moon.png";
        }
    });
});