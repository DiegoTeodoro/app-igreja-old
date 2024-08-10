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
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// CRUD APIs for 'setor'
app.get('/setores', (req, res) => {
    connection.query('SELECT * FROM setor', (err, results) => {
        if (err) {
            console.error('Error fetching setores:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.post('/setores', (req, res) => {
    const setor = req.body;
    connection.query('INSERT INTO setor SET ?', setor, (err, results) => {
        if (err) {
            console.error('Error inserting setor:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.put('/setores/:id', (req, res) => {
    const id = req.params.id;
    const setor = req.body;
    connection.query('UPDATE setor SET ? WHERE codigo = ?', [setor, id], (err, results) => {
        if (err) {
            console.error('Error updating setor:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.delete('/setores/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM setor WHERE codigo = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting setor:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

// Repita o mesmo tratamento de erro para as demais APIs

// CRUD APIs for 'igreja'
app.get('/igrejas/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM igreja WHERE codigo = ?', [id], (err, results) => {
      if (err) {
        console.error('Error fetching igreja:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(results[0]);
    });
  });
  
  app.get('/igrejas', (req, res) => {
    connection.query('SELECT * FROM igreja', (err, results) => {
      if (err) {
        console.error('Error fetching igrejas:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(results);
    });
  });
  
  app.post('/igrejas', (req, res) => {
    const igreja = req.body;
    delete igreja.codigo; // Remover a coluna 'codigo' antes de inserir
    connection.query('INSERT INTO igreja SET ?', igreja, (err, results) => {
      if (err) {
        console.error('Error inserting igreja:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(results);
    });
  });
  
  app.put('/igrejas/:id', (req, res) => {
    const id = req.params.id;
    const igreja = req.body;
    delete igreja.codigo; // Garantir que a coluna 'codigo' não está sendo removida
    connection.query('UPDATE igreja SET ? WHERE codigo = ?', [igreja, id], (err, results) => {
      if (err) {
        console.error('Error updating igreja:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(results);
    });
  });
  
  
  app.delete('/igrejas/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM igreja WHERE codigo = ?', [id], (err, results) => {
      if (err) {
        console.error('Error deleting igreja:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(results);
    });
  });

// CRUD APIs for 'produtos'
app.get('/produtos/codigo/:codigo', (req, res) => {
    const codigo = req.params.codigo;
    connection.query('SELECT * FROM produtos WHERE codigo = ?', [codigo], (err, results) => {
        if (err) {
            console.error('Error fetching produto by codigo:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.send(results[0]);
        } else {
            res.status(404).send('Produto não encontrado');
        }
    });
});


app.post('/produtos', (req, res) => {
    const produto = req.body;
    connection.query('INSERT INTO produtos SET ?', produto, (err, results) => {
        if (err) {
            console.error('Error inserting produto:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.put('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const produto = req.body;
    connection.query('UPDATE produtos SET ? WHERE id = ?', [produto, id], (err, results) => {
        if (err) {
            console.error('Error updating produto:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting produto:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
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
        if (err) {
            console.error('Erro ao buscar cidades:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Cidades obtidas do banco de dados:', results);
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

// CRUD APIs for 'fornecedor'
app.get('/fornecedores', (req, res) => {
    connection.query('SELECT * FROM fornecedor', (err, results) => {
        if (err) {
            console.error('Error fetching fornecedores:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.post('/fornecedores', (req, res) => {
    const fornecedor = req.body;
    connection.query('INSERT INTO fornecedor SET ?', fornecedor, (err, results) => {
        if (err) {
            console.error('Error inserting fornecedor:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.put('/fornecedores/:id', (req, res) => {
    const id = req.params.id;
    const fornecedor = req.body;
    connection.query('UPDATE fornecedor SET ? WHERE id = ?', [fornecedor, id], (err, results) => {
        if (err) {
            console.error('Error updating fornecedor:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.delete('/fornecedores/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM fornecedor WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting fornecedor:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

// CRUD APIs for 'users'
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.post('/users', (req, res) => {
    const user = req.body;
    connection.query('INSERT INTO users SET ?', user, (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    connection.query('UPDATE users SET ? WHERE id = ?', [user, id], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// As demais APIs seguem o mesmo padrão de tratamento de erro

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
