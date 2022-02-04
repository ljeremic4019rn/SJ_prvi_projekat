const express = require('express');
const { sequelize, Library } = require('../models');
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
    Library.findAll({ /*include: ['faculty'] */})
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/:id', (req, res) => {
    Library.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

/*
  {
    "librarian": "bibliotekar",
    "opentime": "11:00",
    "booknumber": "1200",
    "floor": 3,
    "working": true,
    "facultyId": 69
  }
*/

route.post('/', authToken,(req, res) => {
    const schema = Joi.object().keys({
        librarian: Joi.string().trim().min(4).max(15).required(),
        opentime: Joi.string().trim().required(),
        booknumber: Joi.string().trim().required(),
        floor: Joi.string().trim().required(),
        working: Joi.string().trim(),
        facultyId: Joi.string().trim().required(),
     });
    const Validation = schema.validate(req.body);
  
    if(Validation.error){
        res.status(422).json({ msg: Validation.error.message })
    }
    else{
        Library.create({ 
            librarian: req.body.librarian, 
            opentime: req.body.opentime,
            booknumber: req.body.booknumber,
            floor: req.body.floor,
            working: req.body.working,
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
        librarian: Joi.string().trim().min(4).max(15).required(),
        opentime: Joi.string().trim().required(),
        booknumber: Joi.string().trim().required(),
        floor: Joi.string().trim().required(),
        working: Joi.string().trim(),
        facultyId: Joi.string().trim().required(),
     });
    const Validation = schema.validate(req.body);
  
    if(Validation.error){
        res.status(422).json({ msg: Validation.error.message })
    }
    else{
        Library.findOne({ where: { id: req.params.id } })
        .then( lib => {
            lib.librarian = req.body.librarian, 
            lib.opentime = req.body.opentime,
            lib.booknumber = req.body.booknumber,
            lib.floor = req.body.floor,
            lib.working = req.body.working 

            lib.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    }
    
});

route.delete('/:id',authToken, (req, res) => {

    Library.findOne({ where: { id: req.params.id } })
        .then( lib => {
            lib.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku