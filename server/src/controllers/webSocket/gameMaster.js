const { Chess } = require('chess.js');
const { Game, fn } = require('../../db/models');

class GameMaster {
    constructor(ws1, ws2, serverInfo, callback, reject = console.log) {
        this.ws1 = ws1;
        this.ws2 = ws2;
        this.serverInfo = serverInfo;
        this.chess = new Chess();
        this.isFirstFirst = true;
        //пока так, потом сделаем выбор первого хода
        this.chess.header('White', ws1.user.nick);
        this.chess.header('Black', ws2.user.nick);
        this.currentStep = ws1;
        try {
            (async () => {
                const newGame = await Game.create({
                    firstUser: ws1.user.id,
                    secondUser: ws2.user.id,
                    startTime: fn('NOW'),
                    isFinished: false,
                    description: this.chess.pgn()
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
        if(ws === this.currentStep) {
            if(this.chess.move(move)) {
                return this.chess.pgn();
            }
        } 
        return undefined;
    }
}

module.exports = GameMaster;