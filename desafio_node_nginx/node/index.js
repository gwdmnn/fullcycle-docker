const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'mysql'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const insertSQL = `INSERT INTO people(name) VALUES ('Guilherme')`;
const getNames = `SELECT * FROM people`;

connection.query(insertSQL, (err) => {
    if (err) {
        console.error('Error inserting data:', err);
    }
});

connection.query(getNames, (err, results) => {
    if (err) {
        console.error('Error fetching data:', err);
        return;
    }

    app.get('/', (req, res) => {
        let header = '<h1>Full Cycle</h1><br>';
        let text = '<ul>';

        let list = (names) => {
            for (let i = 0; i < names.length; i++) {
                text += `<li>${names[i].name}</li>`;
            }
        };

        list(results); 
        text += '</ul>'; 

        res.send(header + text); 
    });

    app.listen(port, () => {
        console.log('Rodando na porta ' + port);
    });
    
    connection.end();
});
