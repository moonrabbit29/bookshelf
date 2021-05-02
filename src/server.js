const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route');

const app = express();
app.set('port', 5000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(3000, 'localhost', () => console.log('Server started'));
