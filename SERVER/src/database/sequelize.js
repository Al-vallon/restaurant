/* init sequelize */
const { Sequelize, DataTypes } = require('sequelize');


const validator = require('validator');

/* MODEL */
const User = require('../models/users/users.js');

const id = require('../../config_ID');
const config_ID = require('../../config_ID');

/* call DB Config */
const dbConfig = id.dbConfig;

/* Custom color for log */
const { successColor, errorColor, resetColor, nodePort } = require('../asset/colorizedLog');

function connectToPostgres() {
    const sequelize = new Sequelize({
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    username: dbConfig.user,
    password: dbConfig.password,
});

return sequelize.authenticate()
    .then(() => {
    console.log(successColor, 'Connection with SEQUELIZE has been established successfully.', resetColor);
    return sequelize;
    })
    .catch(error => {
    console.error(errorColor, 'Unable to connect to the database with SEQUELIZE:', error , resetColor);
    throw error;
    });
}




module.exports = connectToPostgres()