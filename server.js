const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Replace with your MongoDB URI
const mongoURI = 'mongodb+srv://vijay:DwcPtotro6jnRn5d@cluster0.n7ge5iw.mongodb.net/Contactdb';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        await newContact.save();
        res.send('Form submitted successfully!');
    } catch (err) {
        res.status(500).send('Error saving to database.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
