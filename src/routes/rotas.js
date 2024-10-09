const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/userController')

//Rotas
router.get('/profile', usuarioController.getProfile);
router.post('/cadastrar', usuarioController.registerUser);
router.post('/login', usuarioController.loginUser);
router.delete('/profile/:id', usuarioController.deleteUser);

module.exports = router;
