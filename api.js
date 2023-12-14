const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 6489;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


const db = mysql.createConnection({
    host: 'containers-us-west-37.railway.app',
    user: 'root',
    port: '5699',
    password: '2F3UfdCTUbleiDyyydVt',
    database: 'Integrador',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexão com o banco de dados estabelecida');
});

app.get('/remedios', (req, res) => {
    const sql = 'SELECT * FROM Banco LIMIT 200';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.get('/remedios/search', (req, res) => {
    const { nome } = req.query;
    const sql = `SELECT * FROM Banco WHERE Principio LIKE ? OR Referencia LIKE ?`;
    db.query(sql, [`%${nome}%`, `%${nome}%`], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});