const express = require('express');
const { sequelize, Book } = require('../models');//todo ovo proveri sa njegovim vid
const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj


route.get('/all',(req,res) => {
    Book.findAll()
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/findOne/:id', (req, res) => {
    console.log(req.params.username);
    Book.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

/*
  {
    "name": "knjiga",
    "writer": "pisac,
    "genre": "romantika",
    "desciption": "dugacak opis knjige",
    "relesedate": "03/25/2015",
    "publisher": "vulkan",
    "libraryId": 69,
    "userId": 69
  }
*/

route.post('/add', (req, res) => {
    Book.create({ 
        name: req.body.name,
        writer: req.body.writer,
        genre: req.body.genre,
        desciption: req.body.desciption,
        relesedate: req.body.relesedate,
        publisher: req.body.publisher,
        libraryId: req.body.publisher,
        userId: req.body.userId
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/update/:id', (req, res) => {
    Book.findOne({ where: { id: req.params.id } })
        .then( book => {
            book.name = req.body.name,
            book.writer = req.body.writer,
            book.genre = req.body.genre,
            book.desciption = req.body.desciption,
            book.relesedate = req.body.relesedate,
            book.publisher = req.body.publisher

            book.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/delete/:id', (req, res) => {
    Book.findOne({ where: { id: req.params.id } })
        .then( book => {
            book.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku