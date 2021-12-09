const express = require('express');
const { sequelize } = require('./models');
const endpoints = require('./routes/endPoints');//ovde se impl router iz endPoints ubacuje
const path = require('path');

const app = express();

app.use('/admin', endpoints);



app.get('/', (req, res) => {
    res.send("welcome")
   // res.sendFile('index.html', {root: './static'});
});




app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log("povezano");
});