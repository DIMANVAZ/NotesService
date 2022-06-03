const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/AllNotes', {
    dialect: 'postgres'
});
console.log('-----module is executed-------')
const Note = sequelize.define('Note', {
    // Model attributes are defined here
    text: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});

(async () => {
    await sequelize.sync({ force: true });
})();

async function writeNote(message){
    Note.create({
        text: message
    })
        .then(res => console.log('---success---\n'))
        .catch(err => console.log(err))
}


module.exports = {sequelize, writeNote};
