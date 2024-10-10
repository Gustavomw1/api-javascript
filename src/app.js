const express = require('express');
const router = require('./routes/rotas');
const cors = require('cors');

const app = express(); 

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(express.json());

// Usar as rotas
app.use(router);

// Iniciar o servidor
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
