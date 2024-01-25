const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3306;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: 'laxmi1722',
  database: 'db',
});

db.connect();

app.get('/items', (req, res) => {
  db.query('SELECT * FROM items', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/items', (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/items/:id', (req, res) => {
  const { name, description } = req.body;
  const itemId = req.params.id;
  db.query('UPDATE items SET name=?, description=? WHERE id=?', [name, description, itemId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  db.query('DELETE FROM items WHERE id=?', [itemId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
