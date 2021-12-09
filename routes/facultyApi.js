const express = require('express');
const { sequelize, Faculty } = require('../models');//todo ovo proveri sa njegovim vid
const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj


route.get('/all',(req,res) => {
    Faculty.findAll()
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/findOne/:id', (req, res) => {

    console.log(req.params.username);
    Faculty.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

/*
{
      "name": "fakultet3",
      "dean": "marko",
      "accredited": true,
      "street": "ulica",
      "startDate": "01.02.2000"
}
*/

route.post('/add', (req, res) => {
    Faculty.create({ 
        name: req.body.name, 
        dean: req.body.dean,
        accredited: req.body.accredited,
        street:  req.body.street,
        startDate:  req.body.startDate
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/update/:id', (req, res) => {
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

});

route.delete('/delete/:id', (req, res) => {
    Faculty.findOne({ where: { id: req.params.id } })
        .then( fac => {
            fac.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku