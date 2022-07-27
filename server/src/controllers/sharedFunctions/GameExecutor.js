const { MakeMoveChessError } = require('../../validators/errors/ChessError');

class GameExecutor {
  constructor() {}

  makeMove(game, from, to) {
    const currPiece = game.get(from);

    if (currPiece === null) {
      return {
        move: null,
        fieldsToUpdate: null,
        success: false,
        error: new MakeMoveChessError(),
      };
    }

    const move = game.move({
      from: from,
      to: to,
    });

    if (move === null) {
      return {
        move: null,
        fieldsToUpdate: null,
        success: false,
        error: new MakeMoveChessError(),
      };
    }

    let result = null;
    const newPgn = game.pgn();

    if (game.game_over()) {
      result = game.turn() === 'w' ? 'black' : 'white';
    }

    const fieldsToUpdate = game.game_over()
      ? {
          isFinished: true,
          finishTime: new Date(Date.now()).toISOString(),
          description: newPgn,
          result: result,
        }
      : { description: newPgn };

    return {
      move: move,
      fieldsToUpdate: fieldsToUpdate,
      success: true,
      error: null,
    };
  }
}

module.exports = new GameExecutor();
