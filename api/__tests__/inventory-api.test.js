const sqlite3 = require('sqlite3').verbose();
sqlite3.Database = jest.fn();

const api = require('../inventory-api.js');
const db = require('../db-manager.js');
const constants = require('../constants.js');
jest.mock('../db-manager.js');


beforeEach(() => {
    db.listAll.mockClear();
    db.create.mockClear();
})

describe('getItems', () => {
    test('return 400 on DB error', () => {
        const testError = { message: 'test error message' };
        db.listAll = jest.fn((table, callback) => {
            callback(testError, null);
        });

        const mockJson = jest.fn();
        const mockStatus = jest.fn(code => { return { json: mockJson } });
        const testRes = { status: mockStatus };

        api.getItems({}, testRes);

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({'error': testError.message});
    });

    test('return all items on DB success', () => {
        const testItem_1 = { 'name': 'testname1', 'desc': 'testdesc1' };
        const testItem_2 = { 'name': 'testname2', 'desc': 'testdesc2' };
        const testRows = [testItem_1, testItem_2];
        db.listAll = jest.fn((table, callback) => {
            callback(null, testRows);
        });

        const mockJson = jest.fn();
        const testRes = { json: mockJson };

        api.getItems({}, testRes);

        const expectedPayload = { 'message': 'success', 'data': testRows };
        expect(mockJson).toHaveBeenCalledWith(expectedPayload);
    });

    test('converts item keys to lowercase', () => {
        const testItemUpper = { 'NAME': 'testname', 'DESC': 'testdesc' };
        const testRows = [testItemUpper];
        db.listAll = jest.fn((table, callback) => {
            callback(null, testRows);
        });

        const mockJson = jest.fn();
        const testRes = { json: mockJson };

        api.getItems({}, testRes);

        const testItemLower = { 'name': 'testname', 'desc': 'testdesc' };
        const expectedPayload = { 'message': 'success', 'data': [testItemLower] };
        expect(mockJson).toHaveBeenCalledWith(expectedPayload);
    });
});

describe('postItem', () => {
    test('return 400 on invalid request body', () => {
        const testReq = { body: {} };

        const mockJson = jest.fn();
        const mockStatus = jest.fn(code => { return { json: mockJson } });
        const testRes = { status: mockStatus };

        api.postItem(testReq, testRes);

        const expectedErrorMsg = { 'error': 'No item name specified' };
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(expectedErrorMsg);
    });

    test('return 400 on DB error', () => {
        const testReq = { body: { name: 'testName' } };
        const testError = { message: 'test error message' };
        db.create = jest.fn((table, attributes, values, callback) => {
            callback(testError, null);
        });

        const mockJson = jest.fn();
        const mockStatus = jest.fn(code => { return { json: mockJson } });
        const testRes = { status: mockStatus };

        api.postItem(testReq, testRes);

        const expectedErrorMsg = { 'error': testError.message };
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(expectedErrorMsg);
    });

    test('creates item on DB success', () => {
        const testReq = { body: { name: 'testName' } };
        db.create = jest.fn((table, attributes, values, callback) => {
            callback(null, null);
        });

        const mockJson = jest.fn();
        const testRes = { json: mockJson };

        api.postItem(testReq, testRes);

        const expectedPayload = { 'message': 'success', 'data': { 'name': 'testName' } };
        expect(mockJson).toHaveBeenCalledWith(expectedPayload);
    });
});

describe('patchItem', () => {
    const testId = 29834;
    const testItem = { 'comment': 'newComment' };
    const testReq = { params: { id: testId }, body: testItem };

    test('return 400 on DB error', () => {
        const testError = { message: 'test error message' };
        db.update = jest.fn((id, table, attributes, values, callback) => {
            callback(testError, null);
        });

        const mockJson = jest.fn();
        const mockStatus = jest.fn(code => { return { json: mockJson } });
        const testRes = { status: mockStatus };

        api.patchItem(testReq, testRes);

        const expectedErrorMsg = { 'error': testError.message };
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(expectedErrorMsg);
    });

    test('updates item on DB success', () => {
        db.update = jest.fn((id, table, attributes, values, callback) => {
            callback(null, null);
        });

        const mockJson = jest.fn();
        const testRes = { json: mockJson };

        api.patchItem(testReq, testRes);

        const expectedPayload = { 'message': 'success', 'data': testItem };
        expect(mockJson).toHaveBeenCalledWith(expectedPayload);
    });
});

describe('deleteItem', () => {
    const testId = 49328;
    const testReq = { params: { id: testId } };

    test('return 400 on DB error', () => {
        const testError = { message: 'test error message' };
        db.delete = jest.fn((id, table, callback) => {
            callback(testError, null);
        });

        const mockJson = jest.fn();
        const mockStatus = jest.fn(code => { return { json: mockJson } });
        const testRes = { status: mockStatus };

        api.deleteItem(testReq, testRes);

        const expectedError = { 'error': testError.message };
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(expectedError);
    });

    test('delete item on DB success', () => {
        db.delete = jest.fn((id, table, callback) => {
            callback(null, null);
        });

        const mockJson = jest.fn();
        const testRes = { json: mockJson };

        api.deleteItem(testReq, testRes);

        const expectedPayload = { 'message': 'deleted' };
        expect(mockJson).toHaveBeenCalledWith(expectedPayload);
    });
});
