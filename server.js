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
// CRUD APIs for 'produtos'

// Get all products
app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
});

// Get a single product by ID
app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM produtos WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).send('Produto não encontrado');
      }
    });
});

// Create a new product
app.post('/produtos', (req, res) => {
    const produto = req.body;
    const query = 'INSERT INTO produtos SET ?';
    connection.query(query, produto, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({ id: results.insertId, ...produto });
      }
    });
});

// Update an existing product by ID
app.put('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const produto = req.body;
    const query = 'UPDATE produtos SET ? WHERE id = ?';
    connection.query(query, [produto, id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('Produto atualizado com sucesso');
      }
    });
});

// Delete a product by ID
app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM produtos WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('Produto deletado com sucesso');
      }
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

// CRUD APIs for 'usuario'
app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            console.error('Error fetching usuario:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.post('/usuarios', (req, res) => {
    const usuario = req.body;
    connection.query('INSERT INTO usuario SET ?', user, (err, results) => {
        if (err) {
            console.error('Error inserting usuario:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const usuarios = req.body;
    connection.query('UPDATE usuario SET ? WHERE id = ?', [user, id], (err, results) => {
        if (err) {
            console.error('Error updating usuario:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuario WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting usuario:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

// CRUD APIs for 'categoria'

// Get all categories
app.get('/categorias', (req, res) => {
    connection.query('SELECT * FROM categoria', (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

// Get a single category by ID
app.get('/categorias/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM categoria WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching category:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.send(results[0]);
        } else {
            res.status(404).send('Categoria not found');
        }
    });
});

// Create a new category
app.post('/categorias', (req, res) => {
    const categoria = req.body;
    connection.query('INSERT INTO categoria SET ?', categoria, (err, results) => {
        if (err) {
            console.error('Error inserting categoria:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

// Update an existing category by ID
app.put('/categorias/:id', (req, res) => {
    const id = req.params.id;
    const categoria = req.body;
    connection.query('UPDATE categoria SET ? WHERE id = ?', [categoria, id], (err, results) => {
        if (err) {
            console.error('Error updating categoria:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

// Delete a category by ID
app.delete('/categorias/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM categoria WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting categoria:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});
// CRUD APIs for 'transportadora'
app.get('/transportadora', (req, res) => {
    connection.query('SELECT * FROM transportadoras', (err, results) => {
        if (err) {
            console.error('Error fetching transportadoras:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.post('/transportadora', (req, res) => {
    const transportadora = req.body;  // Corrigido de 'fornecedor' para 'transportadora'
    connection.query('INSERT INTO transportadoras SET ?', transportadora, (err, results) => {
        if (err) {
            console.error('Error inserting transportadora:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.put('/transportadora/:id', (req, res) => {
    const id = req.params.id;
    const transportadora = req.body;  // Corrigido de 'fornecedor' para 'transportadora'
    connection.query('UPDATE transportadoras SET ? WHERE id = ?', [transportadora, id], (err, results) => {
        if (err) {
            console.error('Error updating transportadora:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

app.delete('/transportadora/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM transportadoras WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting transportadora:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});

const server = app.listen(port, () => {  // Mantido apenas uma chamada para app.listen
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
    } else {
        throw err;
    }
});
