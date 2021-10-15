const express = require('express');
// const {data} = require('../data/data.json');
// const projects = data.projects;


const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));





app.listen(3000, () => console.log('The application is running on localhost:3000'));