class ConnectionError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  sendResponse(res) {
    return res.status(this.status).json({ message: this.message });
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
