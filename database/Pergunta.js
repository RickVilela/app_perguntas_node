const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({ force: false }).then(() => {
    console.log('Tabela Criada com Sucesso ✔');
}).catch((err) => {
    console.error(`Erro ao criar Tabela: ${err}`);
});

module.exports = Pergunta;