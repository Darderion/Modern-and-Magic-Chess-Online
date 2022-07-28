const UserDispatcher = require('./UserDispatcher');
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
      if (game.in_draw()) {
        result = 'draw';
      } else {
        result = game.turn() === 'w' ? 'black' : 'white';
      }
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

  async addMoneyToPlayers(game) {
    const whitePiecesUserId = game.header().White;
    const blackPiecesUserId = game.header().Black;
    
    let whitePlayerProfit, blackPlayerProfit;

    if (fieldsToUpdate.result === 'white') {
      whitePlayerProfit = 100;
      blackPlayerProfit = 25;
    } else if (fieldsToUpdate.result === 'black') {
      whitePlayerProfit = 25;
      blackPlayerProfit = 100;
    } else {
      whitePlayerProfit = 50;
      blackPlayerProfit = 50;
    }

    const opInfo1 = await UserDispatcher.increaseMoney(
      whitePiecesUserId,
      whitePlayerProfit
    );

    if (!opInfo1.success) {
      return {
        success: false,
        error: opInfo1.error,
      }
    }

    const opInfo2 = await UserDispatcher.increaseMoney(
      blackPiecesUserId,
      blackPlayerProfit
    );

    if (!opInfo2.success) {
      return {
        success: false,
        error: opInfo2.error,
      }
    }

    return {
      success: true,
      error: null,
    }
  }
}

module.exports = new GameExecutor();
