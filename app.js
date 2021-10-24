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

// Dynamic project routes
app.get('/projects/:id', (req, res, next) => {
    const id = req.params.id;
    const project = projects[id]

    if (projects[id]) {
        res.render('project', {project})
    } else {
        const err = new Error();
        err.status = 404;
        err.message = `Looks like the project doesn't exist.`
        next(err);
    }
});

// Custom error test for 500 error
app.get('/error', (req, res, next) => {
    console.log('Custom error route called');
    const err = new Error();
    err.message = `Custom 500 error thrown`
    err.status = 500;
    throw err;
});

/* Not found (404) Error Handler */
app.use((req, res, next) => {
    console.log('404 error handler called')
    const err = new Error()
    res.status(404);
    err.message = `This page does not exist`
    err.status = 404 
    res.render('page-not-found', {err})
});

/* Global error handler */
app.use((err, req, res, next) => {    
    if (err) {
        console.log('Global error handler called', err)
    }
    
    if(err.status === 404) {
        err.message = `This page does not exist`
        err.status = 404 
        res.render('page-not-found', {err})
    } else {
        err.message = err.message || `Looks like something went wrong on the server`
        err.status = 500
        res.render('error', {err});
    }
});

// Run Express server on port 3000 and log to console
app.listen(3000, () => console.log('The application is running on localhost:3000'));