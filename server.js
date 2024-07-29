const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'igreja_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// CRUD APIs for 'setor'
app.get('/setores', (req, res) => {
    connection.query('SELECT * FROM setor', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/setores', (req, res) => {
    const setor = req.body;
    connection.query('INSERT INTO setor SET ?', setor, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/setores/:id', (req, res) => {
    const id = req.params.id;
    const setor = req.body;
    connection.query('UPDATE setor SET ? WHERE codigo = ?', [setor, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/setores/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM setor WHERE codigo = ?', [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// CRUD APIs for 'igreja'
app.get('/igrejas', (req, res) => {
    connection.query('SELECT * FROM igreja', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/igrejas', (req, res) => {
    const igreja = req.body;
    connection.query('INSERT INTO igreja SET ?', igreja, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/igrejas/:id', (req, res) => {
    const id = req.params.id;
    const igreja = req.body;
    connection.query('UPDATE igreja SET ? WHERE codigo = ?', [igreja, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/igrejas/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM igreja WHERE codigo = ?', [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// Endpoint para criar um novo usuário
app.post('/users', (req, res) => {
    const user = req.body;  // Assumindo que o corpo da requisição contém 'username' e 'password'
    if (user && user.username && user.password) {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(query, [user.username, user.password], (err, results) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err);
                res.status(500).send({ message: "Erro ao inserir usuário no banco de dados" });
            } else {
                res.status(201).send({ message: "Usuário criado com sucesso", userId: results.insertId });
            }
        });
    } else {
        res.status(400).send({ message: "Dados de usuário inválidos" });
    }
});

// Endpoint para criar categoria
app.post('/categorias', (req, res) => {
    const { nome } = req.body;
    const query = 'INSERT INTO categoria (nome) VALUES (?)';
    connection.query(query, [nome], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, nome });
    });
});

// Endpoint para listar categorias
app.get('/categorias', (req, res) => {
    const query = 'SELECT * FROM categoria';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoint para listar produtos
app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoint para criar produto
app.post('/produtos', (req, res) => {
    const { nome, codigo_barra, categoria_id, volume, observacao } = req.body;
    const query = 'INSERT INTO produtos (nome, codigo_barra, categoria_id, volume, observacao) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nome, codigo_barra, categoria_id, volume, observacao], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, nome, codigo_barra, categoria_id, volume, observacao });
    });
});

// Endpoint para atualizar produto
app.put('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const { nome, codigo_barra, categoria_id, volume, observacao } = req.body;
    const query = 'UPDATE produtos SET nome = ?, codigo_barra = ?, categoria_id = ?, volume = ?, observacao = ? WHERE id = ?';
    connection.query(query, [nome, codigo_barra, categoria_id, volume, observacao, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Produto atualizado com sucesso!' });
    });
});

// Endpoint para deletar produto
app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM produtos WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Produto deletado com sucesso!' });
    });
});
// CRUD APIs for 'estados'
app.get('/estados', (req, res) => {
    connection.query('SELECT * FROM estados', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/estados', (req, res) => {
    const estado = req.body;
    connection.query('INSERT INTO estados SET ?', estado, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/estados/:id', (req, res) => {
    const id = req.params.id;
    const estado = req.body;
    connection.query('UPDATE estados SET ? WHERE id = ?', [estado, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/estados/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM estados WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// CRUD APIs for 'cidades'
app.get('/cidades', (req, res) => {
    connection.query('SELECT * FROM cidades', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/cidades', (req, res) => {
    const cidade = req.body;
    connection.query('INSERT INTO cidades SET ?', cidade, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/cidades/:id', (req, res) => {
    const id = req.params.id;
    const cidade = req.body;
    connection.query('UPDATE cidades SET ? WHERE id = ?', [cidade, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/cidades/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM cidades WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// CRUD APIs for 'fornecedores'
app.get('/fornecedores', (req, res) => {
    connection.query(`
        SELECT f.*, c.nome AS cidade_nome, e.nome AS estado_nome
        FROM fornecedores f
        JOIN cidades c ON f.cidade_id = c.id
        JOIN estados e ON f.estado_id = e.id
    `, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/fornecedores', (req, res) => {
    const fornecedor = req.body;
    connection.query('INSERT INTO fornecedores SET ?', fornecedor, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/fornecedores/:id', (req, res) => {
    const id = req.params.id;
    const fornecedor = req.body;
    connection.query('UPDATE fornecedores SET ? WHERE id = ?', [fornecedor, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/fornecedores/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM fornecedores WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
    } else {
        throw err;
    }
});