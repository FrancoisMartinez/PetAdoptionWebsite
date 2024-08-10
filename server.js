const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');  // Add session management
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());  // Add this line to handle JSON data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

const loginFilePath = path.join(__dirname, 'login.txt');
const petInfoFilePath = path.join(__dirname, 'availablePets.txt');


// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(loginFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading login file' });
        }

        const users = data.split('\n');
        const user = users.find(u => u === `${username}:${password}`);

        if (user) {
            req.session.loggedIn = true;
            req.session.username = username;
            return res.json({ success: true });
        } else {
            return res.json({ success: false, message: 'Invalid username or password' });
        }
    });
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.render('logout', { title: 'Logged Out' }); // Render the logout.ejs template
    });
});



app.post('/create-account', (req, res) => {
    const { username, password } = req.body;


    // Check if username or password is undefined or empty
    if (!username || !password) {
        return res.json({ message: 'Username or password is missing.' });
    }

    // Validate username and password
    if (!/^[a-zA-Z0-9]+$/.test(username) || 
        typeof password !== 'string' || // Ensure password is a string
        password.length < 4 || 
        !/[a-zA-Z]/.test(password) || 
        !/[0-9]/.test(password) || 
        /[^a-zA-Z0-9]/.test(password)) {
        return res.json({ message: 'Invalid username or password format.' });
    }

    // Read the login file
    fs.readFile(loginFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading login file:', err);
            return res.json({ message: 'Error reading login file.' });
        }

        // Check if username already exists
        const users = data.split('\n').filter(Boolean); // Filter out empty lines
        const userExists = users.some(user => user.split(':')[0] === username);

        if (userExists) {
            return res.json({ message: 'Username already exists. Please choose another one.' });
        }

        // Append new user to the file
        const newUser = `${username}:${password}\n`;
        fs.appendFile(loginFilePath, newUser, (err) => {
            if (err) {
                console.error('Error saving new user:', err);
                return res.json({ message: 'Error saving new user.' });
            }
            res.json({ message: 'Account successfully created! You can now log in.' });
        });
    });
});




// Pet Submission Route
app.post('/add-pet', (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).json({ message: 'You must be logged in to submit a pet' });
    }

    const { petName, petType, breed, age, gender, getsAlongWCat, getsAlongWDog, child, comments, firstName, lastName, email } = req.body;

    // Read the availablePets.txt file to get the current count and determine the next ID
    fs.readFile(petInfoFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {  // If the file doesn't exist, create it
            return res.status(500).json({ message: 'Error reading pet info file' });
        }

        // Determine the next unique ID
        const pets = data ? data.split('\n').filter(Boolean) : [];
        const newId = pets.length + 1;

        // Format the new pet entry
        const newPet = `${newId}:${req.session.username}:${petType}:${breed}:${age}:${gender}:${getsAlongWCat}:${getsAlongWDog}:${child}:${comments}:${firstName}:${lastName}:${email}\n`;

        // Append the new pet entry to the file
        fs.appendFile(petInfoFilePath, newPet, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving pet information' });
            }
            res.json({ message: 'Pet added successfully' });
        });
    });
});



// Route to fetch pets based on search criteria
app.post('/find-pets', (req, res) => {
    const { petType, breed, age, gender, getsAlongWCat, getsAlongWDog, childFriendly } = req.body;

    // Read the availablePets.txt file
    fs.readFile(petInfoFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading pet info file' });
        }

        const pets = data.split('\n').filter(Boolean).map(line => {
            const [id, username, petType, breed, age, gender, getsAlongWCat, getsAlongWDog, childFriendly, comments, firstName, lastName, email] = line.split(':');
            return { id, username, petType, breed, age, gender, getsAlongWCat: getsAlongWCat === 'true', getsAlongWDog: getsAlongWDog === 'true', childFriendly: childFriendly === 'true', comments, firstName, lastName, email };
        });

        // Filter pets based on search criteria
        const filteredPets = pets.filter(pet => {
            return (
                (petType === '' || pet.petType.toLowerCase() === petType.toLowerCase()) &&
                (breed === 'no-preference' || pet.breed.toLowerCase() === breed.toLowerCase()) &&
                (age === 'no-preference' || pet.age.toLowerCase() === age.toLowerCase()) &&
                (gender === 'no-preference' || pet.gender.toLowerCase() === gender.toLowerCase()) &&
                (!getsAlongWCat || pet.getsAlongWCat) &&
                (!getsAlongWDog || pet.getsAlongWDog) &&
                (!childFriendly || pet.childFriendly)
            );
        });

        res.json(filteredPets);
    });
});




app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/find', (req, res) => {
    res.render('find', { title: 'Find a Dog/Cat' });
});

app.get('/dogcat', (req, res) => {
    res.render('dogcat', { title: 'Dog and Cat Care' });
});


app.get('/give', (req, res) => {
    res.render('give', { title: 'Give a Pet Away', loggedIn: req.session.loggedIn });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contat Us' });
});

app.get('/create', (req, res) => {
    res.render('create', { title: 'Create an Account' });
});

app.get('/disclaimer', (req, res) => {
    res.render('disclaimer', { title: 'Disclaimer' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
