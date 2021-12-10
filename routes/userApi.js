const express = require('express');
const { sequelize, User } = require('../models');//todo ovo proveri sa njegovim vid
const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj


route.get('/all',(req,res) => {
    User.findAll()
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/findOne/:id', (req, res) => {

    console.log(req.params.username);
    User.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

/*
  {
    "name": "ime",
    "lastname": "prezime",
    "birthday": "03/25/2015",
    "email": "ime@gmail.com",
    "username": "uniqueUsername",
    "password": password,
    "admin": true,
    "moderator": false,
    "student": false,
    "facultyId": 69
  }
*/

route.post('/add', (req, res) => {
    User.create({ 
        name: req.body.name, 
        lastname: req.body.lastname,
        birthday: req.body.birthday, 
        email: req.body.email,
        username: req.body.username, 
        password: req.body.password,
        admin: req.body.admin, 
        moderator: req.body.moderator,
        student: req.body.student,
        facultyId: req.body.facultyId
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/update/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.name = req.body.name, 
            usr.lastname = req.body.lastname,
            usr.birthday = req.body.birthday, 
            usr.email = req.body.email,
            usr.username = req.body.username, 
            usr.password = req.body.password,
            usr.admin = req.body.admin, 
            usr.moderator = req.body.moderator,
            usr.student = req.body.student

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/delete/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});




module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku