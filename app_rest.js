const express = require('express');
const { sequelize, User } = require('./models');
const cors = require('cors');//da dozvolimo sa druge adrese da pristupamo rutama


const userapi = require('./routes/userApi');//ovde se impl router iz endPoints ubacuje
const facultyapi = require('./routes/facultyApi');
const libraryapi = require('./routes/libraryApi');
const bookapi = require('./routes/bookApi');

const app = express();

var corsOptions = {//sta odakle sme
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));


app.use('/admin/user', userapi);
app.use('/admin/faculty', facultyapi);
app.use('/admin/library', libraryapi);
app.use('/admin/book', bookapi);





app.listen({ port: 8500 }, async () => {
    await sequelize.authenticate();
    console.log("povezan app za restapi");
});