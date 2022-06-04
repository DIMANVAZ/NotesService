var express = require('express');
var router = express.Router();


const {Note} = require("../db/dbConnector");
let notesArray = [{
    dataValues: {
        id: 999,
        text: 'Default Text',
        createdAt: '2022-06-03T21:31:02.215Z',
        updatedAt: '2022-06-03T21:31:02.215Z'
    },}];

router.post('/', function(req, res){
    console.log('req = ', req.body);

    Note.create({
        text: req.body.noteText||'def text'
    })
        .then(res => console.log('---write success---\n'))
        .catch(err => console.log(err))

    res.render('index', {notesArray})
})

/* GET home page. */
router.get('/', async function (req, res, next) {
    await Note.findAll()
        .then(res => {
            notesArray = [];
            res.forEach(elem => notesArray.push(elem));
            console.log(notesArray);
            console.log('this is findall res!---- \n', res)
        });
    res.render('index', {title: 'Сервис записей',notesArray});
});

module.exports = router;
