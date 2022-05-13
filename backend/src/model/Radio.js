const Sequelize = require('sequelize');
const database = require('../services/db');

const Radio = database.define("radio", {
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

    ipAddress : {
        type: Sequelize.STRING,
        allowNull: false,
    },

    lat: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lng : {
        type: Sequelize.STRING,
        allowNull: false,
    },

    status : {
        type: Sequelize.STRING,
        allowNull: false,
    }, 

    local : {
        type: Sequelize.STRING,
        allowNull: false,
    }

},
{
    timestamps: false,
    tableName: 'Radios',
});

module.exports = Radio;