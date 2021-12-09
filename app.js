const express = require('express');
const { sequelize } = require('./models');
const endpoints = require('./routes/endPoints');//ovde se impl router iz endPoints ubacuje
const path = require('path');

const app = express();

//app.use('/api', endpoints);

console.log("string test");

app.get('/', (req, res) => {
    console.log("molim te");
    res.sendFile('index.html', {root: './static'});
});




app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log("povezano");
});