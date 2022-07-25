const { ApiError } = require('./ApiError');

class LobbyError extends ApiError {
  constructor(status, message) {
    super(status, message);
  }
}

class NotFoundLobbyError extends LobbyError {
  constructor(message = 'Not Found') {
    super(500, message);
  }
}

module.exports = {
  LobbyError,
  NotFoundLobbyError,
};
