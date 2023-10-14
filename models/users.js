const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('users', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    expense : {
        type : Sequelize.DOUBLE,
        allowNull : false,
    },
})