const { Chess } = require('chess.js');
const { Game, sequelize } = require('../../db/models');

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
                    startTime: sequelize.fn('NOW'),
                    isFinished: 0,
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
            const move2 = this.chess.move(move, { sloppy: true });
            console.log(move2);
            if(move2) {
                if(this.chess.in_checkmate()) {
                    this.game.update({
                        description: this.chess.pgn(),
                        isFinished: 1,
                        winnerId: ws.user.id,
                        finishTime: sequelize.fn('NOW')
                    });
                }
                this.currentStep = ws === this.ws1 ? this.ws2 : this.ws1;
                return this.chess.pgn();
            }
        }
        return undefined;
    }
    save() {
        if(!this.game.isFinished) {
            this.game.update({
                description: this.chess.pgn()
            });
        }
    }
}

module.exports = GameMaster;