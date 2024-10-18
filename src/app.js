const express = require("express");
const cors = require("cors"); 
const router = require("./routes/rotas");

const app = express();

app.use(cors()); // Adicionar middleware CORS
app.use(express.json());

// Usar as rotas
app.use(router);

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
