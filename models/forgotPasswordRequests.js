const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('forgotPasswordRequests', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});