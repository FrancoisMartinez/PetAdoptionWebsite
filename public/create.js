
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('create-account-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = form.username.value.trim();
        const password = form.password.value.trim();

        messageDiv.innerHTML = ''; // Clear previous messages

        // Validate username (only letters and digits)
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            messageDiv.innerHTML = 'Username can only contain letters and digits.';
            return;
        }

        // Validate password (at least 4 characters, letters, and digits)
        if (password.length < 4 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || /[^a-zA-Z0-9]/.test(password)) {
            messageDiv.innerHTML = 'Password must be at least 4 characters long, contain at least one letter, one digit, and no special characters.';
            return;
        }

        // Send data to the server
        fetch('/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            messageDiv.innerHTML = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.innerHTML = 'An error occurred while creating the account. Please try again.';
        });
    });
});
