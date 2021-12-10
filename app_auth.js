const express = require('express');
const { sequelize, User, Faculty, Library, Book } = require('./models');
const bcrypt = require('bcrypt');//za sifru
const jwt = require('jsonwebtoken');
const cors = require('cors');//da dozvolimo sa druge adrese da pristupamo rutama
require('dotenv').config();//prosledi objekat koji ima cnofig metodu, ne treba nam vise zato nije static 

const app = express();

var corsOptions = {//competability
    origin: 'http://127.0.0.1:8000',//ovo dozvoljava da ako si na ovoj adresi/portu da mozes da pozoves /register i /login
    optionsSuccessStatus: 200//povezao je app i app_auth tako da tehnicki imaju medjusobne funkcije
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {
    User.create({ 
        name: req.body.name, 
        lastname: req.body.lastname,//TODO tmp samo napravimo novog usera
        birthday: req.body.birthday, 
        email: req.body.email,
        username: req.body.username, 
        password: bcrypt.hashSync(req.body.password, 10),
        admin: req.body.admin, 
        moderator: req.body.moderator,
        student: req.body.student,
        facultyId: req.body.facultyId
    })
        .then( rows => {

            const userInfo = {//napravimo objekat sa user info
                userId: rows.id,
                username: rows.username
            };
            const cryptToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);//sifriramo informacije iz objekta

            res.json({ token: cryptToken }) //printamo to sto smo kriptovali
        })
        .catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res) => {
    User.findOne({ where: { username: req.params.username } })//preko username cemo se logovati
        .then( cryptedUser => {//password je kriptovan od kada smo se registrovali

            if (bcrypt.compareSync(req.body.password, cryptedUser.password)){// uesenu sifru i dekriptovanu od usera i proveri

                const userInfo = {//napravimo objekat sa user info
                    userId: rows.id,
                    username: rows.username
                };
                const cryptToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

                res.json({ token: cryptToken })
            }
            else{
                res.status(400).json({ msg: 'Invalidna sifra' })
            }
             
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {//ba 9000 jer na 8000 vec imamo app.js
    await sequelize.authenticate();
    console.log("povezan app za autentifikaciju");
});