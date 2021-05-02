const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./route');

const app = express();
app.use(cors());
app.set('port', 5000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(5000, 'localhost', () => console.log('Server started'));
