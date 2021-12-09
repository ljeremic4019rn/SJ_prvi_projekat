const express = require('express');
const { sequelize } = require('./models');
const userapi = require('./routes/userApi');//ovde se impl router iz endPoints ubacuje
const facultyapi = require('./routes/facultyApi');
const subjectapi = require('./routes/subjectApi');
const examapi = require('./routes/examApi');
const path = require('path');

const app = express();

app.use('/admin/user', userapi);
app.use('/admin/faculty', facultyapi);
app.use('/admin/subject', subjectapi);
app.use('/admin/exam', examapi);



app.get('/', (req, res) => {
    res.send("welcome")
   // res.sendFile('index.html', {root: './static'});
});




app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log("povezano");
});