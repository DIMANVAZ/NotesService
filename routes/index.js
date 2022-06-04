var express = require('express');
var router = express.Router();

const {Note} = require("../db/dbConnector");

let notesArray = [{
    dataValues: {
        id: 999,
        text: 'Дефолтная заметка! Notes Array',
        createdAt: '2022-06-03T21:31:02.215Z',
        updatedAt: '2022-06-03T21:31:02.215Z'
    },}];

router.post('/', function(req, resp){
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
        const body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
        console.log(body); // { type: 'noteText', data: 'uho;luo;;' }

        //надо дождаться выполнения асинхронных команд и потом отрисовывать страницу на основе БД. Через then или await

        // делим логику на добавление или удаление: type: 'noteText' или type: 'buttonId'
        if (body.type === 'noteText') { // если кнопка добавки текста
            Note.create({
                text: body.data || 'Вы создали пустую заметку!'
                }).then(() => {
                    console.log('added!!');
                    Note.findAll().then(reso => {
                        notesArray = [...reso];
                        console.log('notesArray UPDATED!!!');
                        //setTimeout(()=>{resp.render('index', {notesArray});},600)
                    });
                }).catch(err => console.log(err));
        }

        if (body.type === 'buttonId') { // если кнопка удаления
            Note.destroy({
                where: {
                    id: body.data
                }
            }).then(() => {
                console.log('deletedd!!');
                Note.findAll().then(reso => {
                    notesArray = [...reso];
                    console.log('notesArray UPDATED!!!');
                    //setTimeout(()=>{resp.render('index', {notesArray});},600)

                });
            }).catch(err => console.log(err))
        }
        setTimeout(()=>{resp.render('index', {notesArray});},600)
    })
})

// ИДЕЯ: если мы просто заходим - добываем список из БД
// Если мы что-то меняем - сначала делаем операцию, потом добываем обновлённый список из БД и рисуем его

router.get('/', async function (req, resp, next) {
    await Note.findAll()
            .then(reso => {
                notesArray = [...reso];
            });
    resp.render('index', {notesArray});
});

module.exports = router;
