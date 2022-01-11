const db = require('./db-manager.js');
const constants = require('./constants.js');


// get list of all items
const getItems = (req, res) => {
    db.listAll(constants.db_table.name, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }

        // make keys lowercase in return items
        rows.map(item => {
            Object.keys(item).forEach(key => {
                const val = item[key];
                delete item[key];
                item[key.toLocaleLowerCase()] = val;
            });
        });

        res.json({
            'message': 'success', 
            'data': rows
        });
    });
};

// create new item
const postItem = (req, res) => {
    const item = req.body;
    
    if (!item.name) {
        res.status(400).json({'error': 'No item name specified'});
        return;
    }

    db.create(
        constants.db_table.name, 
        [constants.db_table.attributes.name], 
        [item.name], 
        (err, result) => {
            if (err) {
                res.status(400).json({'error': err.message});
                return;
            }

            res.json({
                'message': 'success', 
                'data': {'name': item.name}
            });
        });
};

// update item by id
const patchItem = (req, res) => {
    const id = req.params.id;
    const item = req.body;

    const attrList = [
        constants.db_table.attributes.name, 
        constants.db_table.attributes.comment, 
        constants.db_table.attributes.deleted];

    db.update(
        id, constants.db_table.name, 
        attrList, 
        [item.name, item.delete_comment, item.is_deleted], 
        (err, result) => {
            if (err) {
                res.status(400).json({'error': err.message});
                return;
            }

            res.json({
                'message': 'success', 
                'data': item
            });
        });
};

// delete item by id
const deleteItem = (req, res) => {
    const id = req.params.id;

    db.delete(id, constants.db_table.name, (err, result) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }

        res.json({'message': 'deleted'});
    });
};

module.exports = { getItems, postItem, patchItem, deleteItem };
