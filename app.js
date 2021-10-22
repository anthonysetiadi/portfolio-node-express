const express = require('express');
const {projects} = require('./data/data.json');

const app = express();

// Set templates to pug and serve static files in public
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//routes//

// Create root route
app.get('/', (req, res, next) => {
    res.render('index', {projects})
});

// Renders about page
app.get('/about', (req, res, next) => {
    res.render('about');
});

// Dynamic porject routes
app.get('/projects/:id', (req, res, next) => {
    const id = req.params.id;
    const project = projects[id]
    res.render('project', {project})
});

// Not found (404) Error Handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Other Errors Handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    if(err.status === 404) {
        res.render('page-not-found', {message: err.message, error: err})
    } else {
        res.render('error', {message: err.message, error: err});
    }
});

// Run Express server on port 3000 and log to console
app.listen(3000, () => console.log('The application is running on localhost:3000'));