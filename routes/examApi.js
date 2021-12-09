const express = require('express');
const { sequelize,Exam } = require('../models');//todo ovo proveri sa njegovim vid
const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj


route.get('/all',(req,res) => {
    Exam.findAll()
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/findOne/:id', (req, res) => {
    console.log(req.params.username);
    Exam.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

/*
  {
    "date": "01.02.2000",
    "time": "12:20",
    "points": 30,
    "classroom": "Raf6",
    "guard": "Marija"
  }
*/

route.post('/add', (req, res) => {
    Exam.create({ 
        date: req.body.date,
        time: req.body.time,
        points: req.body.points,
        classroom: req.body.classroom,
        guard: req.body.guard
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/update/:id', (req, res) => {
    Exam.findOne({ where: { id: req.params.id } })
        .then( exm => {
            exm.date = req.body.date,
            exm.time = req.body.time,
            exm.points = req.body.points,
            exm.classroom = req.body.classroom,
            exm.gruad = req.body.guard

            exm.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/delete/:id', (req, res) => {
    Exam.findOne({ where: { id: req.params.id } })
        .then( exm => {
            exm.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku