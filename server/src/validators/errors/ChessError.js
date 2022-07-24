class ChessError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  sendResponse(res) {
    return res.status(this.status).json({ message: this.message });
  }
}

class PgnLoadingChessError extends ChessError {
  constructor(message = 'Failed to load PGN') {
    super(500, message);
  }
}

class MakeMoveChessError extends ChessError {
  constructor(message = 'Incorrect move') {
    super(400, message);
  }
}

module.exports = {
  ChessError,
  PgnLoadingChessError,
  MakeMoveChessError,
};
