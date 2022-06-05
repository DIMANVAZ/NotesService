let express = require('express');
let exP = express();
const fs = require("fs");
//const body_parser = require('body-parser'); //парсить данные из формы
//const cookieParser = require('cookie-parser');
//const bcrypt = require('bcrypt');

/* запуск сервера */
const port = process.env.PORT || 4000;
exP.listen(port,()=>{console.log(`server's listening on port ${port}`)});

/* задаём папку со статикой */
exP.use(express.static('public'));

/* задаём метод чтения ответа ?!?!?! а-ля body parser */
exP.use(express.json());
//exP.use(body_parser.urlencoded({extended:true})); //парсить данные из формы
//exP.use(cookieParser());

/* задаём шаблонизатор */
exP.set('view engine','pug');

const {Note} = require('./db/dbConnector.js');
let notesArray = [{
    dataValues: {
        id: 999,
        text: 'Дефолтная заметка! Notes Array',
        createdAt: '2022-06-03T21:31:02.215Z',
        updatedAt: '2022-06-03T21:31:02.215Z'
    }}];

exP.get('/',(req,res) => {
    Note.findAll().then(records => res.render('index',{notesArray:[...records]}))
})

exP.post('/add',(req,res) => {
    const note = req.body.data;
    Note.create({text: note || 'Вы создали пустую заметку!'})
        .then(() => Note.findAll())
        .then((reso) => {notesArray = [...reso]})
        .then(() => res.render('index', { notesArray}))
        .catch((err) => console.log('Create error:', err));
})

exP.post('/delete',(req,res) => {
    const id = req.body.data;
    Note.destroy({where: { id: id} })
        .then(() => res.redirect(301,'/'))
        // .then((reso) => {notesArray = [...reso]})
        // .then(() => res.render('index', { notesArray}))
        .catch((err) => console.log('Create error:', err));
})