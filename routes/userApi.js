const express = require('express');
const { sequelize, User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');


const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: "err" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}
//   route.use(authToken);




route.get('/all',(req,res) => {
    User.findAll({/*include: ['faculty'] */})
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/:id', (req, res) => {
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
    "password": "password",
    "admin": true,
    "moderator": false,
    "student": false,
    "facultyId": 69
  }
*/

route.post('/',authToken, (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().trim().min(4).max(15).required(),
        lastname: Joi.string().trim().min(4).max(15).required(),
        birthday: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        username: Joi.string().trim().min(4).max(10).required(),
        password: Joi.string().trim().min(5).max(25).required(),
        facultyId: Joi.string().trim().required(),
        admin: Joi.string(),
        moderator: Joi.string(),
        student: Joi.string()    
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
            password: req.body.password,
            admin: req.body.admin, 
            moderator: req.body.moderator,
            student: req.body.student,
            facultyId: req.body.facultyId
        })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    }
});

route.put('/:id',authToken, (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.string(),
        createdAt: Joi.string(),
        updatedAt: Joi.string(),
        name: Joi.string().trim().min(4).max(15).required(),
        lastname: Joi.string().trim().min(4).max(15).required(),
        birthday: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        username: Joi.string().trim().min(4).max(10).required(),
        password: Joi.string().trim().min(5).max(25).required(),
        facultyId: Joi.string().trim().required(),
        admin: Joi.string(),
        moderator: Joi.string(),
        student: Joi.string()    
     });
    const Validation = schema.validate(req.body);
  
    if(Validation.error){
        res.status(422).json({ msg: Validation.error.message })
    }
    else{
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

    } 
});

route.delete('/:id', authToken,(req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});




module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku