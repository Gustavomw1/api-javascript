const express = require('express')
const router = require('./routes/rotas')

const app = express()

app.use(express.json())
app.use(router)

//Rota 
app.listen(3000, (req, res) => {
    console.log('Servidor ok')
})