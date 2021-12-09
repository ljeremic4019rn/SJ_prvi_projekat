const express = require('express');
const { sequelize, User, Faculty, Exam, Subject } = require('../models');//todo ovo proveri sa njegovim vid
/*
REST API
api koji komunicira samo kroz json, saljes json i dobijas nazad json
i frontend aplikacija to treba da odluci kako ce da prikaze
*/
const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj


route.get('/users',(req,res) => {
    console.log("usli smo u users");
    User.findAll()
        .then(rows => res.json(rows) )
        .catch(err => res.status(500).json(err));
});






module.exports = route; //ovde exportujemo ruter i onda se on implementuje u app.js na pocetku