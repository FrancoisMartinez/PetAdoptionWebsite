document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const petForm = document.getElementById('pet-form');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        messageDiv.innerHTML = ''; // Clear previous messages

        // Validate username and password formats
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            messageDiv.innerHTML = 'Invalid username format.';
            return;
        }

        if (password.length < 4 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
            messageDiv.innerHTML = 'Invalid password format.';
            return;
        }

        // Send login data to the server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.innerHTML = 'Login successful. You can now submit your pet.';
                petForm.style.display = 'block'; // Show pet form
            } else {
                messageDiv.innerHTML = 'Login failed. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.innerHTML = 'An error occurred. Please try again.';
        });
    });


    petForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const petName = petForm.petName.value.trim();
        const petType = petForm.querySelector('input[name="petType"]:checked').value;
        const breed = petForm.breed.value;
        const age = petForm.age.value;
        const gender = petForm.querySelector('input[name="gender"]:checked').value;
        const getsAlongWCat = petForm.getsAlongWCat.checked;
        const getsAlongWDog = petForm.getsAlongWDog.checked;
        const child = petForm.child.checked;
        const comments = petForm.comments.value.trim();
        const firstName = petForm.firstName.value.trim();
        const lastName = petForm.lastName.value.trim();
        const email = petForm.email.value.trim();

        if (!petName || !petType || !breed || !age || !gender || !firstName || !lastName || !email) {
            messageDiv.innerHTML = 'Please fill out all required fields.';
            return;
        }

        // Create the pet data object
        const petData = {
            petName,
            petType,
            breed,
            age,
            gender,
            getsAlongWCat,
            getsAlongWDog,
            child,
            comments,
            firstName,
            lastName,
            email
        };

        // Send pet data to the server
        fetch('/add-pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petData)
        })
        .then(response => response.json())
        .then(data => {
            messageDiv.innerHTML = data.message;
            petForm.reset();  // Reset the form after submission
            petForm.style.display = 'none';  // Hide the form again
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.innerHTML = 'An error occurred while adding the pet. Please try again.';
        });
    });

});
