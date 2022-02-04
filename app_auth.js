const express = require('express');
const { sequelize, User } = require('./models');

const bcrypt = require('bcrypt');//za sifru
const jwt = require('jsonwebtoken');
const cors = require('cors');//da dozvolimo sa druge adrese da pristupamo rutama
const Joi = require('joi');
require('dotenv').config();//prosledi objekat koji ima cnofig metodu, ne treba nam vise zato nije static 

const app = express();

var corsOptions = {//sta odakle sme
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', (req, res) => {
/*
    "name": "ime",
    "lastname": "prezime",
    "birthday": "03/25/2015",
    "email": "ime@gmail.com",
    "username": "uniqueUsername",
    "password": "password",
    "admin": true,
    "moderator": false,
    "student": false,
    "facultyId": 69
*/
    const schema = Joi.object().keys({
        name: Joi.string().min(4).max(15).required(),
        lastname: Joi.string().min(4).max(15).required(),
        birthday: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        username: Joi.string().min(4).max(10).required(),
        password: Joi.string().min(5).max(25).required(),
        facultyId: Joi.string().trim().required(),
        admin: Joi.string().trim(),
        moderator: Joi.string().trim(),
        student: Joi.string().trim()    
     });
    const Validation = schema.validate(req.body);

  
    if(Validation.error){
        res.status(422).json({ msg: Validation.error.message })
    }
    else{
        User.create({ 
            name: req.body.name, 
            lastname: req.body.lastname,
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
                const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);//sifriramo informacije iz objekta
                res.json({ token: token }) //printamo to sto smo kriptovali
            })
            .catch( err => res.status(500).json(err) );

    }
});

app.post('/login', (req, res) => {

    const schema = Joi.object().keys({
        username: Joi.string().trim().required(),
        password: Joi.string().min(2).max(10).required()
    });
    const Validation = schema.validate(req.body);

  
    if(Validation.error){
        res.status(422).json({ msg: Validation.error.message })
    }
    else{
        User.findOne({ where: { username: req.body.username } })
        .then( cryptedUser => { 
            
        if (bcrypt.compareSync(req.body.password, cryptedUser.password)){

                const userInfo = {//napravimo objekat sa user info
                    userId: cryptedUser.id,
                    username: cryptedUser.username 
                };
                const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

                res.json({ token: token, userId: cryptedUser.id})
            // res.json(cryptedUser)
            }
            else{
                res.status(400).json({ msg: 'Lose uneseni username ili sifra' })
            }
        })
        .catch( err => res.status(500).json({ msg: 'Lose uneseni username ili sifra' }));
    }
});

app.listen({ port: 9000 }, async () => {//na 9000 jer na 8000 vec imamo app.js
    await sequelize.authenticate();
    console.log("povezan app za autentifikaciju");
});