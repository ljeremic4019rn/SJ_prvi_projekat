const express = require('express');
const { sequelize } = require('./models');

const userapi = require('./routes/userApi');//ovde se impl router iz endPoints ubacuje
const facultyapi = require('./routes/facultyApi');
const libraryapi = require('./routes/libraryApi');
const bookapi = require('./routes/bookApi');
const auth = require('./routes/auth');

const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use('/admin/user', userapi);
app.use('/admin/faculty', facultyapi);
app.use('/admin/library', libraryapi);
app.use('/admin/book', bookapi);
app.use('/auth', auth);



// app.get('/register', (req, res) => {
//     fetch('http://127.0.0.1:9000/register',{
//         method: 'POST'
//     })
//     .then( res => res.json() )
//     .then( data => console.log(data))
// });

// app.get('/login', (req, res) => { 
//     fetch('http://127.0.0.1:9000/login',{
//         method: 'POST'
//     })
//     .then( res => res.json() )
//     .then( data => console.log(data))
// });

app.get('/', /*authToken, */(req, res) => {//ovde smo middleware stavili jer stitimo tu putanju, ako nismo logovani preusmerava nas iznad na /login
    res.sendFile('index.html', { root: './static' });
});


app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log("startovan app");
});