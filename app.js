// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize express app
const app = express();
const port = 3000;  // Port for the API

// Middleware to parse JSON bodies (instead of body-parser)
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://bhupeshv668:bhupesh123@live-api-cluster.fbcho.mongodb.net/?retryWrites=true&w=majority&appName=live-api-cluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    description: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Define POST route to save user data
app.post('/api/users', async (req, res) => {
    try {
        const { name, contact, description } = req.body;

        // Create a new user document based on the schema
        const newUser = new User({
            name,
            contact,
            description
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Respond with the saved user data
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save user data' });
    }
});

// Define GET route to retrieve user data
app.get('/api/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        
        // Respond with the retrieved users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:3000`);
});
