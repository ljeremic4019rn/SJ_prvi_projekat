const express = require('express');
const { sequelize, Library } = require('../models');//todo ovo proveri sa njegovim vid
const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj


route.get('/all',(req,res) => {
    Library.findAll({ include: ['faculty'] })
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/findOne/:id', (req, res) => {
    console.log(req.params.username);
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

route.post('/add', (req, res) => {
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

});

route.put('/update/:id', (req, res) => {
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

});

route.delete('/delete/:id', (req, res) => {

    Library.findOne({ where: { id: req.params.id } })
        .then( lib => {
            lib.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku