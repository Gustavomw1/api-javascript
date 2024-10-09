const db = require('../database/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET = 'tools'


// Rota para localizar usuário
const getProfile = (req, res) => {
    db.query('SELECT * FROM usuarios;', (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao buscar perfil' });
        } else {
            return res.status(200).json(result);
        }
    });
};


// Rota para cadastrar usuário
const registerUser = async (req, res) => {
    const { email, senha } = req.body;

    // Hasheando a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    
    db.query(query, [email, hashedPassword], (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
        }
        return res.status(200).json({ mensagem: `Usuário cadastrado com sucesso: ${result.insertId}` });
    });
};


// verifiy JWT
function verifyJWT(req, res) {
    const token = req.headers['x-access-token']
    jwt.verify(token, SECRET, (error, result) => {
        if(error){
            return res.status(401).end()
        } else{
            req.userId = result.userId
        }
    })
}

// Rota para logar usuário
const loginUser = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao buscar usuário' });
        }

        // Verificando se o usuário foi encontrado
        if (result.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        // Verificando a senha
        const usuario = result[0];  // Acessando o primeiro resultado da consulta
        const match = await bcrypt.compare(senha, usuario.senha);
        if (match) {
            const token = jwt.sign({userId: 1}, SECRET, { expiresIn: 300})
            return res.status(200).json({ auth: true, token, mensagem: 'Login bem-sucedido' });
        } else {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }
    });
};


// Rota para deletar usuário
const deleteUser = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM usuarios WHERE id = ?', [id], (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: `Erro ao deletar usuário: ${erro}` });
        } else {
            return res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
        }
    });
};


module.exports = {
    getProfile,
    registerUser,
    loginUser,
    deleteUser
};
