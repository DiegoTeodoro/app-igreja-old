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
// Endpoint para autenticar um usuário
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        connection.query(query, [username, password], (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                res.status(500).send({ message: "Erro ao acessar o banco de dados" });
            } else if (results.length > 0) {
                res.send({ message: "Login realizado com sucesso" });
            } else {
                res.status(401).send({ message: "Login ou senha incorretos" });
            }
        });
    } else {
        res.status(400).send({ message: "Dados de login inválidos" });
    }
});
