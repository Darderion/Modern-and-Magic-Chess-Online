const { ApiError } = require('./ApiError');

class ConnectionError extends ApiError {
  constructor(status, message) {
    super(status, message);
  }
}

class DatabaseConnectionError extends ConnectionError {
  constructor(innerError, message = 'Failed to read data from database') {
    super(500, message);

    this.innerError = innerError;
  }
}

module.exports = {
  ConnectionError,
  DatabaseConnectionError,
};
