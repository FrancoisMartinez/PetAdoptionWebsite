document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.remove();
        }

        const pet = document.querySelector('input[name="pet"]:checked');
        const age = document.getElementById('age').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        
        if (!pet || breed === "" || age === "" || !gender) {
            const errorMessage = document.createElement('div');
            errorMessage.id = 'error-container';
            errorMessage.style.color = 'red';
            errorMessage.innerText = 'Please fill out all fields before submitting the form.';
            form.prepend(errorMessage);
            return;
        }
    });
});