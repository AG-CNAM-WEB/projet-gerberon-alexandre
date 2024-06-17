// server.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = '19dec2187c97a2691eab9a943d3c02326734e7b8d54eee2daf0ea7e794f40cd3';

// Middleware for parsing JSON body
app.use(bodyParser.json());

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Dummy user data
let userData = {
    username: 'user',
    password: bcrypt.hashSync('password', 8),
    name: 'John Doe',
    email: 'john@example.com',
    prenom: 'John',
    nom: 'Doe',
    civilite: 'Monsieur',
    address: { rue: '123 Main St', codePostal: '12345', ville: 'City', pays: 'Country' },
    phone: '123-456-7890',
    login: 'user',
};

// Load product data from JSON file
const productsData = JSON.parse(fs.readFileSync('../assets/mock/products.json', 'utf8'));

// Endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username exists and password matches
    if (userData.username === username && bcrypt.compareSync(password, userData.password)) {
        // Generate JWT token
        const token = jwt.sign({ username: userData.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ success: true, token: token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Endpoint to retrieve product catalog
app.get('/api/products', (req, res) => {
    res.json(productsData);
});

// Endpoint to retrieve client data (requires JWT token)
app.get('/api/client', verifyToken, (req, res) => {
    // Decode the token to get the username
    const { username } = jwt.verify(req.token, SECRET_KEY);
    // Check if the decoded username matches the stored user data
    if (username === userData.username) {
        // Return the user data as JSON
        res.json(userData);
    } else {
        // If the username doesn't match, return unauthorized
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const token = bearer[1];
        // Set the token
        req.token = token;
        // Call the next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

// Endpoint to save client data
app.post('/api/client', (req, res) => {
    const { name, email, prenom, nom, civilite, address, phone, login, password } = req.body;
    // Check if user already exists
    if (userData.login === login) {
        return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: login }, SECRET_KEY, { expiresIn: '1h' });

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Save client data (you would typically store in a database)
    userData = {
        username: login,
        password: hashedPassword,
        name: name,
        email: email,
        prenom: prenom,
        nom: nom,
        civilite: civilite,
        address: address,
        phone: phone,
        login: login,
        password: hashedPassword, // Save the hashed password
    };

    res.json({ success: true, token: token }); // Return the token in the response
});

// Endpoint to update client data
app.put('/api/client', (req, res) => {
    const { name, email, prenom, nom, civilite, address, phone, login, password } = req.body;
    // Update client data (you would typically update in a database)
    userData.name = name;
    userData.email = email;
    userData.prenom = prenom;
    userData.nom = nom;
    userData.civilite = civilite;
    userData.address = address;
    userData.phone = phone;
    userData.login = login;
    userData.password = password;
    res.json({ success: true, message: 'Client information updated successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
