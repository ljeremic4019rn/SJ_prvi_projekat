const express = require('express');
const { sequelize } = require('./models');
const userapi = require('./routes/userApi');//ovde se impl router iz endPoints ubacuje
const facultyapi = require('./routes/facultyApi');
const libraryapi = require('./routes/libraryApi');
const bookapi = require('./routes/bookApi');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use('/admin/user', userapi);
app.use('/admin/faculty', facultyapi);
app.use('/admin/library', libraryapi);
app.use('/admin/book', bookapi);




function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');//podaci u cookie su razdvojeni sa ;
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');//dobijamo ime i vrednost svakog cookia 
        parsedCookies[parsedCookie[0]] = parsedCookie[1];//[0] je ime/kljuc a [1] je vrednost
    });

    return parsedCookies;
};


function authToken (req, res, next){//next je pokazivac na sledecu fukciju
    const cookies = getCookies(req); //next je pokazivac na sledecu funkciju
    const token = cookies['token'];//iz cookia dohavatamo token, ['element nekog objekta']
  
    if (token == null)
    return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)  => {//ili dobijamo error ili ono sto je kodirano u tokenu, u ovom slucaju je user
        if(err)
        return res.redirect(301, '/login');

        req.user = user;//kada ucitamo usera iz baze stavicemo ga u request da bi mogli kasnije da koristimo njegov info
        next();
    })
}

app.get('/register', (req, res) => { //tmp, mozda da se skloni
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', /*authToken, */(req, res) => {//ovde smo middleware stavili jer stitimo tu putanju, ako nismo logovani preusmerava nas iznad na /login
    res.sendFile('index.html', { root: './static' });
});


/*
app.get('/', (req, res) => {
    res.send("welcome")
    res.sendFile('index.html', {root: './staticTMP'});
});
*/


app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log("povezano");
});