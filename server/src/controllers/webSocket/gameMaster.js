const { Chess } = require('chess.js');
const { Game, sequelize } = require('../../db/models');
const gameExecutor = require('../sharedFunctions/GameExecutor');

class GameMaster {
  constructor(ws1, ws2, serverInfo, callback, reject = console.log) {
    this.ws1 = ws1;
    this.ws2 = ws2;
    this.serverInfo = serverInfo;
    this.chess = new Chess();
    this.isFirstFirst = true;
    //пока так, потом сделаем выбор первого хода
    this.chess.header('White', ws1.user.id);
    this.chess.header('Black', ws2.user.id);
    this.currentStep = ws1;
    this.isFinished = false;
    try {
      (async () => {
        const newGame = await Game.create({
          firstUser: ws1.user.id,
          secondUser: ws2.user.id,
          startTime: sequelize.fn('NOW'),
          isFinished: 0,
          description: this.chess.pgn(),
        });
        callback(newGame.id, this.chess.pgn());
        this.game = newGame;
      })();
    } catch (e) {
      reject(e.message);
    }
  }
  getOtherWS(ws) {
    return this.ws1 === ws ? this.ws2 : this.ws1;
  }
  move(ws, move) {
    if (ws === this.currentStep) {
      const movement = gameExecutor.makeMove(this.chess, move.from, move.to);
      if (movement.success) {
        if (movement?.fieldsToUpdate.isFinished) {
          this.isFinished = true;
          this.game.update({
            description: this.chess.pgn(),
            isFinished: 1,
            winnerId: movement.fieldsToUpdate.winnerId,
            finishTime: sequelize.fn('NOW'),
          });
          this.addMoneyToPlayers();
        } else {
          this.save();
        }
        this.currentStep = ws === this.ws1 ? this.ws2 : this.ws1;
        return this.chess.pgn();
      }
    }
    return undefined;
  }
  save() {
    if (!this.game.isFinished) {
      this.game.update({
        description: this.chess.pgn(),
      });
    }
  }
  async addMoneyToPlayers() {
    await gameExecutor.addMoneyToPlayers(this.chess);
  }
}

module.exports = GameMaster;
