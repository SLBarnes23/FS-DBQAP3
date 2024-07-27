const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Ensure this line is present to parse JSON request bodies
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Handle requests for favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

// Simple test route
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


