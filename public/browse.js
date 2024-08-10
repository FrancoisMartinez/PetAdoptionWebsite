document.addEventListener('DOMContentLoaded', () => {

<<<<<<< HEAD
    
    const pets = [
        {
            image: "images/cat1.webp",
            type: 'Cat',
            breed: 'Persian',
            age: 'Young',
            gender: 'Male',
            catFriendly: true,
            dogFriendly: false,
            kidFriendly: true
        },
        {
            image: "images/cat2.webp",
            type: 'Cat',
            breed: 'Maine Coon',
            age: 'Adult',
            gender: 'Female',
            catFriendly: true,
            dogFriendly: true,
            kidFriendly: true
        },
        {
            image: "images/cat3.webp",
            type: 'Cat',
            breed: 'Siamese',
            age: 'Senior',
            gender: 'Male',
            catFriendly: true,
            dogFriendly: false,
            kidFriendly: false
        },
        {
            image: "images/cat4.webp",
            type: 'Cat',
            breed: 'Ragdoll',
            age: 'Kitten',
            gender: 'Female',
            catFriendly: true,
            dogFriendly: true,
            kidFriendly: true
        },
        {
            image: "images/cat5.webp",
            type: 'Cat',
            breed: 'Bengal',
            age: 'Adult',
            gender: 'Male',
            catFriendly: false,
            dogFriendly: true,
            kidFriendly: false
        },
        {
            image: "images/dog1.webp",
            type: 'Dog',
            breed: 'Labrador Retriever',
            age: 'Young',
            gender: 'Male',
            catFriendly: true,
            dogFriendly: true,
            kidFriendly: true
        },
        {
            image: "images/dog2.webp",
            type: 'Dog',
            breed: 'German Shepherd',
            age: 'Adult',
            gender: 'Female',
            catFriendly: false,
            dogFriendly: true,
            kidFriendly: true
        },
        {
            image: "images/dog3.webp",
            type: 'Dog',
            breed: 'Golden Retriever',
            age: 'Senior',
            gender: 'Male',
            catFriendly: true,
            dogFriendly: true,
            kidFriendly: true
        },
        {
            image: "images/dog4.webp",
            type: 'Dog',
            breed: 'Bulldog',
            age: 'Puppy',
            gender: 'Female',
            catFriendly: true,
            dogFriendly: true,
            kidFriendly: true
        },
        {
            image: "images/dog5.webp",
            type: 'Dog',
            breed: 'Poodle',
            age: 'Adult',
            gender: 'Male',
            catFriendly: false,
            dogFriendly: true,
            kidFriendly: true
        }
    ];


=======
>>>>>>> e43fe3b (fixed find pets)


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

<<<<<<< HEAD
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
=======
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
>>>>>>> e43fe3b (fixed find pets)
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
<<<<<<< HEAD
                <h3>${pet.type}</h3>
                <img class="pet-image" src="${pet.image}" alt="image of pet">
                <p>Breed: ${pet.breed}</p>
                <p>Age: ${pet.age}</p>
                <p>Gender: ${pet.gender}</p>
                <p>Cat Friendly: ${pet.catFriendly ? 'Yes' : 'No'}</p>
                <p>Dog Friendly: ${pet.dogFriendly ? 'Yes' : 'No'}</p>
                <p>Kid Friendly: ${pet.kidFriendly ? 'Yes' : 'No'}</p>
                <button class="interested-btn">Interested</button>
=======
                <h3>${pet.username}</h3>
                <h3>${pet.petType}</h3>
                <p>Breed: ${pet.breed}</p>
                <p>Age: ${pet.age}</p>
                <p>Gender: ${pet.gender}</p>
                <p>Cat Friendly: ${pet.getsAlongWCat ? 'Yes' : 'No'}</p>
                <p>Dog Friendly: ${pet.getsAlongWDog ? 'Yes' : 'No'}</p>
                <p>Kid Friendly: ${pet.child ? 'Yes' : 'No'}</p>
                <p>Comments: ${pet.comments}</p>
                
>>>>>>> e43fe3b (fixed find pets)
            `;
            browseContainer.appendChild(petDiv);
        });
    };
<<<<<<< HEAD

=======
>>>>>>> e43fe3b (fixed find pets)
});


