import React, { useContext, useMemo, useState, useEffect } from 'react';
import { ConnectorContext } from '../../Connector';
import BoardComponent from '../Board/BoardComponent';
import ChatComponent from '../Chat/ChatComponent'; // Как-то так
import * as Chess from 'chess.js';
import './styles.css';

const GameComponent = ({ pgn, skins, view }) => {
	const { lobbyData, boardData, sendMessage } = useContext(ConnectorContext);

	const { chess, setChess } = useState(new Chess());

	useEffect(() => {
		setChess(() => {
			const next = new Chess();
			next.load_pgn(pgn);
			return next;
		});
	}, []);

	useEffect(() => {
		if (boardData['type'] === 'myStep' || boardData['type'] === 'otherStep') {
			setChess(() => {
				const newPGN = boardData['data']['pgn'].split('\n').slice(3).join('\n');
				const next = new Chess();
				next.load_pgn(newPGN);

				if (next.in_checkmate()) {
					const winner = String(next.turn() === 'b') ? 'White' : 'Black';
					alert(`${winner} Wins!`);
					sendMessage({
						type: 'closeGame',
					});
				}

				return next;
			});
		}
	}, [boardData]);

	const handleSurrenderClick = () => {
		const winner = String(next.turn() === 'b') ? 'White' : 'Black';
		alert(`${winner} Wins!`);
	};

	const currentTurn = String(chess.turn() === 'b') ? 'Black' : 'White';

	return useMemo(() => {
		return (
			<div className="wrapper">
				<div className="window">
					<div className="left-container">
						<div className="board-container">
							<BoardComponent chess={chess} view={view} skins={skins} />
						</div>
					</div>
					<div className="right-container">
						<div className="info">
							<div className="block">Current Turn: {currentTurn}</div>
							<button class="button" onClick={handleSurrenderClick}>
								<span>Surrender </span>
							</button>
						</div>
						<div className="text-block">
							<ChatComponent />
						</div>
					</div>
				</div>
			</div>
		);
	}, [boardData, lobbyData]);
};

export default GameComponent;
