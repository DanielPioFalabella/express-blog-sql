const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.db_root,
    password: process.env.db_password,
    database: 'db-blog'
});

// gli dico di connettersi al db-blog
connection.connect((err) => {
    // eventuali ERRORI
    if (err) throw err;
    console.log('Connected to MySQL!');
});

module.exports = connection;