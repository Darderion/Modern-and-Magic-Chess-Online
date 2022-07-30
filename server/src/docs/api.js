/**
 * @swagger
 * 
 * /api/gameStatus/{id}:
 *   get:
 *     summary: Get status of the current game by its id
 *     description: Get whether the game is finished and 
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Numeric id of the game
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       400: 
 *         description: User has no access to the URL (verifyAccess failed)
 *       500:
 *         description: Failed to read data from database
 *       200:
 *         description: Game status returned by game id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isFinished:
 *                   type: boolean
 *                   description: Status whether the game is finished or not
 *                 result:
 *                   type: ENUM
 *                   description: Result of the game
 * 
 * 
 * /api/lobby/{id}:
 *   get:
 *     summary: Get lobby by id
 *     description: Get info (id, ids of the players for both colors, time of the game start in ISO 8601 format) about the lobby by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Numeric id of the game
 *         required: true
 *         schema:
 *           type: integer
 *     responses:     
 *       400: 
 *         description: User has no access to the URL (verifyAccess failed)
 *       500:
 *         description: Failed to read data from database
 *       200:
 *         description: Lobby found successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: Lobby id in db
 *                whitePiecesUserId:
 *                  type: integer
 *                  description: id of the user who plays white pieces in db
 *                blackPiecesUserId:
 *                  type: integer
 *                  description: id of the user who plays black pieces in db
 *                startTime:
 *                  type: string
 *                  description: Date as string in ISO 8601 format
 * 
 * 
 * /api/lobbies:
 *   get:
 *     summary: Get all lobbies where games are unfinished
 *     description: Get all lobbies where games are in process to join them as an observer
 *     responses:     
 *       400: 
 *         description: User has no access to the URL (verifyAccess failed)
 *       500:
 *         description: Failed to read data from database
 *       200:
 *         description: Lobbies found successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: Lobby id in db
 *                whitePiecesUserId:
 *                  type: integer
 *                  description: id of the user who plays white pieces in db
 *                blackPiecesUserId:
 *                  type: integer
 *                  description: id of the user who plays black pieces in db
 *                startTime:
 *                  type: string
 *                  description: Date as string in ISO 8601 format
 * 
 * 
 * /api/lobbies/{id}:
 *   delete:
 *     summary: Delete lobby by id
 *     description: Erase lobby from db by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Numeric id of the game
 *         required: true
 *         schema:
 *           type: integer 
 *     responses:     
 *       400: 
 *         description: User has no access to the URL (verifyAccess failed)
 *       500:
 *         description: Failed to read data from database
 *       200:
 *         description: Lobby deleted successfully or didn't exist
 *      
 * 
 * /api/createLobby:
 *   post:
 *     summary: Create new lobby
 *     description: Create new lobby with two players. The corresponding row is added into dbautomatically
 *     responses:     
 *       400: 
 *         description: User has no access to the URL (verifyAccess failed)
 *       500:
 *         description: Failed to read data from database
 *       200:
 *         description: Lobby created successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                lobbyId: 
 *                  type: integer
 *                  description: Lobby id in db
 * 
 * 
 * 
 * 
 * /api/makeMove:
 *   post:
 *     summary: Move a figure on the field
 *     description: Changes position on field of the chosen figure
 *     responses:     
 *       500:
 *         description: Failed to load PGN __OR__ Failed to read data from database
 *       400:
 *         description: Incorrect move
 *       200:
 *         description: Move made successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                game: 
 *                  type: object
 *                  description: ChessInstance including appearance and logic of the game
 *                lobbyId: 
 *                  type: integer
 *                  description: Lobby id in db
 * 
 * 
 * /api/highlightMoves:
 *   post:
 *     summary: Depict all moves
 *     description: Make all moves visible on the field
 *     responses:     
 *       500:
 *         description: Failed to load PGN __OR__ Failed to read data from database
 *       200:
 *         description: All moves highlighted successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                moves: 
 *                  type: object
 *                  description: All moves
 *                eatMoves: 
 *                  type: object
 *                  description: All eat moves
 *                turn:
 *                  type: string
 *                  description: The current side to move
 *
 * */