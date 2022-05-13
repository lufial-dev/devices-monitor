const Sequelize = require('sequelize');
const sequelize = new Sequelize('monitor_ntel', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
    }
);
 
module.exports = sequelize;