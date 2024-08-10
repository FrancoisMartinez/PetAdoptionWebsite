document.addEventListener('DOMContentLoaded', () => {


    const form = document.querySelector('#search-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const petType = document.querySelector('input[name="pet"]:checked').value;
        const breed = document.getElementById('breed').value.toLowerCase();
        const age = document.getElementById('age').value.toLowerCase();
        const gender = document.querySelector('input[name="gender"]:checked').value.toLowerCase();
        const getsAlongWCat = document.getElementById('getsAlongWCat').checked;
        const getsAlongWDog = document.getElementById('getsAlongWDog').checked;
        const childFriendly = document.getElementById('child').checked;


        const filteredPets = pets.filter(pet => {
            return (
                (pet.type.toLowerCase() === petType) &&
                (breed === 'no-preference' || pet.breed.toLowerCase() === breed) &&
                (age === 'no-preference' || pet.age.toLowerCase() === age) &&
                (gender === 'no-preference' || pet.gender.toLowerCase() === gender) &&
                (!getsAlongWCat || pet.catFriendly) &&
                (!getsAlongWDog || pet.dogFriendly) &&
                (!childFriendly || pet.kidFriendly)
            );
        });

        displayPets(filteredPets);

        fetch('/find-pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                petType,
                breed,
                age,
                gender,
                getsAlongWCat,
                getsAlongWDog,
                childFriendly
            })
        })
        .then(response => response.json())
        .then(filteredPets => {
            displayPets(filteredPets);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    });

    const displayPets = (filteredPets) => {
        const browseContainer = document.getElementById('browse-container');
        browseContainer.innerHTML = '';

        if (filteredPets.length === 0) {
            browseContainer.innerHTML = '<p>No pets match your search criteria.</p>';
            return;
        }

        filteredPets.forEach((pet, index) => {
            const petDiv = document.createElement('div');
            petDiv.id = 'browse' + index;
            petDiv.className = 'card';
            petDiv.innerHTML = `

                <h3>${pet.username}</h3>
                <h3>${pet.petType}</h3>
                <p>Breed: ${pet.breed}</p>
                <p>Age: ${pet.age}</p>
                <p>Gender: ${pet.gender}</p>
                <p>Cat Friendly: ${pet.getsAlongWCat ? 'Yes' : 'No'}</p>
                <p>Dog Friendly: ${pet.getsAlongWDog ? 'Yes' : 'No'}</p>
                <p>Kid Friendly: ${pet.child ? 'Yes' : 'No'}</p>
                <p>Comments: ${pet.comments}</p>
                

            `;
            browseContainer.appendChild(petDiv);
        });
    };
});


