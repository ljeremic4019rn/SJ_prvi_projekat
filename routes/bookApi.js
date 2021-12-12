const express = require('express');
const { sequelize, Book } = require('../models');//todo ovo proveri sa njegovim vid

const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

//route.use(authToken);//za sve rute radi autentifikaciju




route.get('/all',(req,res) => {
    Book.findAll({ /*include: ['library', 'user']*/ })
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});


route.get('/:id', (req, res) => {
    console.log("barem smo usli")
    Book.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

/*
  {
    "name": "knjiga",
    "writer": "pisac",
    "genre": "romantika",
    "desciption": "dugacak opis knjige",
    "relesedate": "03/25/2015",
    "publisher": "vulkan",
    "libraryId": 69,
    "userId": 69
  }
*/

route.post('/', (req, res) => {
    console.log("ovde smo")
    Book.create({ 
        name: req.body.name,
        writer: req.body.writer,
        genre: req.body.genre,
        desciption: req.body.desciption,
        relesedate: req.body.relesedate,
        publisher: req.body.publisher,
        libraryId: req.body.libraryId,
        userId: req.body.userId
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/:id', (req, res) => {
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

route.delete('/:id', (req, res) => {
    Book.findOne({ where: { id: req.params.id } })
        .then( book => {
            book.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku