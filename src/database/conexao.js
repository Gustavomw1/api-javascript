require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((erro) => {
    if (erro) {
        console.log(`Erro ao se conectar com o banco de dados: ${erro}`);
        return;
    } else {
        console.log(`Conectado com sucesso`);
    }
});

module.exports = db;
