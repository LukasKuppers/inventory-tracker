const sqlite3 = require('sqlite3').verbose();
sqlite3.Database = jest.fn();

const dbManager = require('../db-manager.js');
const db = require('../database.js');

const testTableName = 'test-table';


beforeEach(() => {
    db.all.mockClear();
    db.run.mockClear();
})

describe('listAll', () => {
    db.all = jest.fn();

    test('sends query to get all items', () => {
        const mockCallback = jest.fn();

        dbManager.listAll(testTableName, mockCallback);

        const expectedSqlQuery = `select * from ${testTableName}`;
        expect(db.all).toHaveBeenCalledWith(expectedSqlQuery, [], mockCallback);
    });
});

describe('create', () => {
    db.run = jest.fn();

    test('sends query to create new row', () => {
        const mockCallback = jest.fn();
        const testAttributes = ['name', 'description'];
        const testValues = ['testName', 'testDescription'];

        dbManager.create(testTableName, testAttributes, testValues, mockCallback);

        const expectedSqlQuery = `INSERT INTO ${testTableName} (name,description) VALUES (?,?)`;
        expect(db.run).toHaveBeenCalledWith(expectedSqlQuery, testValues, mockCallback);
    });
});

describe('update', () => {
    db.run = jest.fn();

    test('sends query to update row', () => {
        const mockCallback = jest.fn();
        const testItemId = 24983;
        const testAttributes = ['name', 'description'];
        const testValues = ['newName', 'newDescription'];

        dbManager.update(testItemId, testTableName, testAttributes, testValues, mockCallback);

        const expectedSqlQuery = `UPDATE ${testTableName} set ` + 
                                    'name = COALESCE(?, name),' + 
                                    'description = COALESCE(?, description) ' +  
                                    `WHERE ID = ${testItemId}`;
        expect(db.run).toHaveBeenCalledWith(expectedSqlQuery, testValues, mockCallback);
    });
});

describe('delete', () => {
    db.run = jest.fn();

    test('sends query to delete row', () => {
        const mockCallback = jest.fn();
        const testItemId = 59475;
        
        dbManager.delete(testItemId, testTableName, mockCallback);
        const expectedSqlQuery = `DELETE FROM ${testTableName} WHERE ID = ${testItemId}`;
        expect(db.run).toHaveBeenCalledWith(expectedSqlQuery, [], mockCallback);
    });
});
