const Sequelize = require('sequelize');

const connection = new Sequelize('perguntadev', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;