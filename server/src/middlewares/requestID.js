const { generateID } = require('../util/generateID');

const REQUEST_ID_HEADER_NAME = 'X-Request-Id';

module.exports = (req, res, next) => {
    const requestIDHeader = req.headers[REQUEST_ID_HEADER_NAME.toLowerCase()];

    req.id = requestIDHeader || generateID();

    res.setHeader(REQUEST_ID_HEADER_NAME, req.id);

    next();
};
