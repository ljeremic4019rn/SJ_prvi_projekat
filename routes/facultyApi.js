const express = require('express');
const { sequelize, Faculty } = require('../models');
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
    Faculty.findAll()
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/:id', (req, res) => {
    Faculty.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

/*
{
      "name": "fakultet",
      "dean": "marko",
      "accredited": true,
      "street": "ulica",
      "startDate": 	"03/25/2015"
}
*/

route.post('/',authToken, (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().trim().min(4).max(15).required(),
        dean: Joi.string().trim().min(4).max(15).required(),
        accredited: Joi.string().trim(),
        street: Joi.string().trim().min(4).max(15).required(),
        startDate: Joi.string().trim().required(),
     });
    const Validation = schema.validate(req.body);
  
    if(Validation.error){
        res.status(422).json({ msg: Validation.error.message })
    }
    else{
        Faculty.create({ 
            name: req.body.name, 
            dean: req.body.dean,
            accredited: req.body.accredited,
            street:  req.body.street,
            startDate:  req.body.startDate
        })
            // .then( rows => res.json(rows) )
            // .catch( err => res.status(500).json(err) );
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
        dean: Joi.string().trim().min(4).max(15).required(),
        accredited: Joi.string().trim(),
        street: Joi.string().trim().min(4).max(15).required(),
        startDate: Joi.string().trim().required(),
     });
    const Validation = schema.validate(req.body);
  
    if(Validation.error){
        res.status(422).json({ msg: Validation.error.message })
    }
    else{
        Faculty.findOne({ where: { id: req.params.id } })
        .then( fac => {
            fac.name = req.body.name, 
            fac.dean = req.body.dean,
            fac.accredited = req.body.accredited,
            fac.street = req.body.street,
            fac.startDate = req.body.startDate

            fac.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    }
});

route.delete('/:id', authToken,(req, res) => {
    Faculty.findOne({ where: { id: req.params.id } })
        .then( fac => {
            fac.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku