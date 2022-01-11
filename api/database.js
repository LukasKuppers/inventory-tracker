const sqlite3 = require('sqlite3').verbose();
const constants = require('./constants.js');

const DBSOURCE = "db.sqlite";


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to SQlite database.');
        const db_vals = constants.db_table;
        db.run(`
            CREATE TABLE ${db_vals.name} (
                ${db_vals.attributes.id} INTEGER PRIMARY KEY AUTOINCREMENT, 
                ${db_vals.attributes.name} text, 
                ${db_vals.attributes.comment} text DEFAULT NULL, 
                ${db_vals.attributes.deleted} BOOLEAN NOT NULL CHECK (is_deleted IN (0, 1)) DEFAULT 0, 
                ${db_vals.attributes.time} DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, 
        (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
});

module.exports = db;
