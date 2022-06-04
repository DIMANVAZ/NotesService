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

router.post('/', function(req, res){
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
            })
                .then(res => console.log('---write success---\n'))
                .catch(err => console.log(err))
        }
        if (body.type === 'buttonId') { // если кнопка удаления
            await Note.destroy({
                where: {
                    id: body.data
                }
            });
        }
    })
    res.render('index', {notesArray})
})

// ИДЕЯ: если мы просто заходим - добываем список из БД
// Если мы что-то меняем - сначала делаем операцию, потом добываем обновлённый список из БД и рисуем его

router.get('/', async function (req, res, next) {
    await Note.findAll()
        .then(res => {
            notesArray = [];
            res.forEach(elem => notesArray.push(elem));
            console.log(notesArray);
            console.log('this is findall res!---- \n', res)
        });
    res.render('index', {notesArray});
});

module.exports = router;

