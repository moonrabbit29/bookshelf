const express = require('express');
const router = require('./route')
const app = express();

app.use('/route',router);



app.listen(3000,'0.0.0.0', () => console.log('Server started'));