const express = require("express");
const cors = require("cors");
const port = 3002;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, ()=> console.log ("Rodando na porta " + port));

const connection = require('./db/connection.js');

// login dos funcionarios 

app.post('/login', (req, res) => { 
    const { nome, senha } = req.body;
 
    const query = 'SELECT * FROM funcionarios WHERE nome = ? AND senha = ?';
 
    connection.query(query, [nome, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }
        if (results.length > 0) {
            console.log("login realizado")
            res.json({ success: true, message: 'Login realizado' });
        } else {
            res.json({ success: false, message: 'Nome ou senha incorretos' });
        }
    });
});

// cadastro pessoas

app.post('/cadastroPessoa', (req, res) => {
    const { nome, bloco, apartamento, tipo, telefone, email } = req.body;
    const query = 'INSERT INTO moradores (nome, bloco, apartamento, tipo, telefone, email) VALUES(?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [nome, bloco, apartamento, tipo, telefone, email], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar pessoa' });
        }
        res.json({ success: true, message: "Pessoa cadastrada com sucesso"});
    });
});


// buscar moradorres

app.get('/moradores', (req, res) => {
    const query = 'SELECT * FROM moradores';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar morador' });
        }
        res.json({ success: true, data: results });
    });
});

// editar morador

app.put('/moradores/:id', (req, res) =>{
    const {nome, bloco, apartamento, tipo, telefone, email} = req.body
    const {id} = req.params
    const query = 'UPDATE moradores SET nome = ?, bloco = ?, apartamento = ?, tipo = ?, telefone = ?, email = ? WHERE id = ?'
    connection.query(query, [nome, bloco, apartamento, tipo, telefone, email, id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao atualizar morador'})
        }
        res.json({success: true, message: "Morador atualizado"})
    })
})

// deletar morador

app.delete('/moradores/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM moradores WHERE id = ?'
    connection.query(query, [id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar morador'})
        }
        res.json({success: true, message: "Morador deletado"})
    })
})

// cadastro carros

app.post('/cadastroCarro', (req, res) => {
    const { placa, modelo, cor, box, id_morador} = req.body;
    const query = 'INSERT INTO carros (placa, modelo, cor, box, id_morador) VALUES(?, ?, ?, ?, ?)';
    
    connection.query(query, [placa, modelo, cor, box, id_morador], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar carros' });
        }
        res.json({ success: true, message: "Carro cadastrado com sucesso"});
    });
});

// buscar carros

app.get('/carros/:id_morador', (req, res) => {
    const {id_morador} = req.params
    const query = 'SELECT * FROM carros WHERE id_morador = ?';
    connection.query(query, [id_morador], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar carro' });
        }
        res.json({ success: true, data: results });
    });
});

// editar carro

app.put('/carros/:id', (req, res) =>{
    const {placa, modelo, cor, box} = req.body
    const {id} = req.params
    const query = 'UPDATE carros SET placa = ?, modelo = ?, cor = ?, box = ? WHERE id = ?'
    connection.query(query, [placa, modelo, cor, box, id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao atualizar carro'})
        }
        res.json({success: true, message: "Carro atualizado"})
    })
})

// deletar carro

app.delete('/carros/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM carros WHERE id = ?'
    connection.query(query, [id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar carro'})
        }
        res.json({success: true, message: "Carro deletado"})
    })
})
