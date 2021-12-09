const express = require('express');
const { sequelize, Subject } = require('../models');//todo ovo proveri sa njegovim vid
const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj


route.get('/all',(req,res) => {
    Subject.findAll()
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/findOne/:id', (req, res) => {
    console.log(req.params.username);
    Subject.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

/*
  {
    "name": "predmet",
    "professor": "profesor",
    "assistent": "asist",
    "year": 2,
    "points": "8",
  }
*/

route.post('/add', (req, res) => {
    Subject.create({ 
        name: req.body.name, 
        professor: req.body.professor,
        assistent: req.body.assistent,
        year: req.body.year,
        points: req.body.points        
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/update/:id', (req, res) => {
    Subject.findOne({ where: { id: req.params.id } })
        .then( sbj => {
            sbj.name = req.body.name, 
            sbj.professor = req.body.professor,
            sbj.assistent = req.body.assistent,
            sbj.year = req.body.year,
            sbj.points = req.body.points 

            sbj.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/delete/:id', (req, res) => {

    Subject.findOne({ where: { id: req.params.id } })
        .then( sbj => {
            sbj.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku