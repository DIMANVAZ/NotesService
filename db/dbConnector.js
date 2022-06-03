const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/AllNotes', {
    dialect: 'postgres'
});


module.exports = sequelize;
