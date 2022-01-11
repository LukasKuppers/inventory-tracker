const constants = require('./constants.js');

const constructUrl = (path) => {
    return constants.apiUrl + path;
}

module.exports = { constructUrl };
