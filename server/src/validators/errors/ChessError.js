const { ApiError } = require('./ApiError');

class ChessError extends ApiError {
  constructor(status, message) {
    super(status, message);
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
