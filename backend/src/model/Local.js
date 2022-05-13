const Sequelize = require('sequelize');
const database = require('../services/db');

const Local = database.define("local", {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name : {
        type: Sequelize.STRING,
        allowNull: false,
    },
},
{
    timestamps: false,
    tableName: 'Local',
});

module.exports = Local;