const { Chess } = require('chess.js');

const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

const DateConverter = require('../../middlewares/DateConverter');

// TEST
// curl -X POST -H "Content-Type: application/json" --header "userid: 1" -d '{"secondUser": "2", "firstUserColor": "w"}' http://localhost:5000/api/createLobby

module.exports = async (req, res) => {
  const firstUser = req.headers.userid;
  const { secondUser, firstUserColor } = req.body;

  const whitePlayer = firstUserColor === 'w' ? firstUser : secondUser;
  const blackPlayer = whitePlayer === firstUser ? secondUser : firstUser;

  const game = new Chess(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  );
  game.header('White', `${whitePlayer}`);
  game.header('Black', `${blackPlayer}`);

  const pgn = game.pgn() + '\n*';

  try {
    const startTime = DateConverter.toDatabaseDateTime(new Date());

    const gameModel = await Game.create({
      firstUser: Number(firstUser),
      secondUser: Number(secondUser),
      startTime: startTime,
      isFinished: 0,
      description: pgn,
    });

    return res.json({ lobbyId: gameModel.id });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }
};
