const { MakeMoveChessError } = require('../validators/errors/ChessError');

const DateConverter = require('../middlewares/DateConverter');

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

    let winnerId = null;
    const newPgn = game.pgn();

    if (game.game_over()) {
      const header = game.header();

      winnerId =
        game.turn() === 'w' ? Number(header.Black) : Number(header.White);
    }

    const fieldsToUpdate = game.game_over()
      ? {
          isFinished: 1,
          finishTime: DateConverter.toDatabaseDateTime(new Date()),
          description: newPgn,
          winnerId: winnerId,
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
