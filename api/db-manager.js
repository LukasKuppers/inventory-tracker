const db = require('./database.js');


module.exports.listAll = (table, callback) => {
    const sql = `select * from ${table}`;
    const params = [];
    
    db.all(sql, params, callback);
}

module.exports.create = (table, attributes, values, callback) => {
    const attrStr = attributes.join(',');
    const valStr  = Array(attributes.length).fill('?').join(',');
    const sql = `INSERT INTO ${table} (${attrStr}) VALUES (${valStr})`;

    db.run(sql, values, callback);
}

module.exports.update = (id, table, attributes, values, callback) => {
    const attrStr = attributes.map(attr => `${attr} = COALESCE(?, ${attr})`).join(',');
    const sql = `UPDATE ${table} set ${attrStr} WHERE ID = ${id}`;

    db.run(sql, values, callback);
}

module.exports.delete = (id, table, callback) => {
    const sql = `DELETE FROM ${table} WHERE ID = ${id}`;
    params = [];

    db.run(sql, params, callback);
}
