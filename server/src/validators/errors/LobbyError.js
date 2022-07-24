class LobbyError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  sendResponse(res) {
    return res.status(this.status).json({ message: this.message });
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
