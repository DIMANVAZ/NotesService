const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/AllNotes', {
    dialect: 'postgres'
});

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
    await sequelize.sync({ force: false });
})();

module.exports = {Note};
