import React, { useContext, useMemo, useState, useEffect } from 'react';
import { ConnectorContext } from '../../Connector';
import BoardComponent from '../Board/BoardComponent';
// import ChatComponent from '../Chat/ChatComponent';
import * as Chess from 'chess.js';
import './styles.css';

const GameComponent = ({pgn, skins, view}) => {
	const { boardData, sendMessage } = useContext(ConnectorContext);

	const tmp = new Chess();
	tmp.load_pgn(pgn)

	const [ chess, setChess ] = useState(tmp);

	const whitePlayer = chess.header()['White'];
	const blackPlayer = chess.header()['Black'];

	useEffect(() => {
		if (boardData['type'] === 'myStep' || boardData['type'] === 'otherStep') {
			const newChess = new Chess();
			newChess.load_pgn(boardData['data']['pgn']);
			if (newChess.header()['White'] === whitePlayer && newChess.header()['Black'] === blackPlayer) {
				setChess(() => {
					if (newChess.in_checkmate()) {
						const winner = String(newChess.turn()) === 'b' ? whitePlayer : blackPlayer;
						alert(`${winner} Wins!`);
						sendMessage({
							type: 'closeGame',
						});
					}
					return newChess;
				});
			}
			
		}
	}, [boardData]);

	const handleSurrenderClick = () => {
		const winner = String(chess.turn()) === 'b' ? whitePlayer : blackPlayer;
		alert(`${winner} Wins!`);
	};

	const currentTurn = String(chess.turn()) === 'b' ? 'Black' : 'White';

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
							{/* <ChatComponent /> */}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia magnam vero iusto sed doloremque maxime architecto provident quaerat in. Velit error sed, dolor pariatur facilis inventore quo porro voluptatem aspernatur!
						</div>
					</div>
				</div>
			</div>
		);
	}, [boardData]);
};

export default GameComponent;
