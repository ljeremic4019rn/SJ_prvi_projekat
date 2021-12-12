const express = require('express');
const { sequelize, User } = require('../models');

const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj

const bcrypt = require('bcrypt');//za sifru
const jwt = require('jsonwebtoken');
require('dotenv').config();//prosledi objekat koji ima cnofig metodu, ne treba nam vise zato nije static 


const test =   {
    name: "ime",
    lastname: "pregfhjzime",
    birthday: "03/25/2015",
    email: "imeasdfa@gmail.com",
    username: "nelsdfg",
    password: "password1234",
    admin: true,
    moderator: false,
    student: false,
    facultyId: 2
  }

route.post('/register', (req, res) => {

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
});

route.post('/login', (req, res) => {

    User.findOne({ where: { username: req.body.username } })
        .then( cryptedUser => { 
            
        if (bcrypt.compareSync(req.body.password, cryptedUser.password)){

                const userInfo = {//napravimo objekat sa user info
                    userId: cryptedUser.id,
                    username: cryptedUser.username
                };
                const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

                res.json({ token: token })
            // res.json(cryptedUser)
            }
            else{
                res.status(400).json({ msg: 'Invalidna sifra' })
            }
        })
        .catch( err => res.status(500).json(err), console.log("greska") );
})



module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku