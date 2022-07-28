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

  async addMoneyToPlayers(game, result) {
    const WIN_MONEY_AMOUNT = 100;
    const DRAW_MONEY_AMOUNT = 50;
    const LOSE_MONEY_AMOUNT = 25;

    const whitePiecesUserId = game.header().White;
    const blackPiecesUserId = game.header().Black;

    let whitePlayerProfit, blackPlayerProfit;

    switch (result) {
      case 'white':
        whitePlayerProfit = WIN_MONEY_AMOUNT;
        blackPlayerProfit = LOSE_MONEY_AMOUNT;
        break;

      case 'black':
        whitePlayerProfit = LOSE_MONEY_AMOUNT;
        blackPlayerProfit = WIN_MONEY_AMOUNT;
        break;

      default:
        whitePlayerProfit = DRAW_MONEY_AMOUNT;
        blackPlayerProfit = DRAW_MONEY_AMOUNT;
        break;
    }

    const whiteUserUpdateInfo = await UserDispatcher.increaseMoney(
      whitePiecesUserId,
      whitePlayerProfit
    );

    if (!whiteUserUpdateInfo.success) {
      return {
        success: false,
        error: whiteUserUpdateInfo.error,
      };
    }

    const blackUserUpdateInfo = await UserDispatcher.increaseMoney(
      blackPiecesUserId,
      blackPlayerProfit
    );

    if (!blackUserUpdateInfo.success) {
      return {
        success: false,
        error: blackUserUpdateInfo.error,
      };
    }

    return {
      success: true,
      error: null,
    };
  }
}

module.exports = new GameExecutor();
