const express = require('express');
const {projects} = require('./data/data.json');


const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

//routes
app.get('/', (req, res, next) => {
    res.render('index', {projects})
});

app.get('/about', (req, res, next) => {
    res.render('about')
});



app.listen(3000, () => console.log('The application is running on localhost:3000'));