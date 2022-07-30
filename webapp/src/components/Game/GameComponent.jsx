import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import { ConnectorContext } from '../../Connector';
import BoardComponent from '../Board/BoardComponent';
import * as Chess from 'chess.js';
import './styles.css';
import Chat from '../Chat/Chat';
import { Prompt } from 'react-router-dom';

const GameComponent = ({ pgn, skins, view, onClose, prevId }) => {
	const { boardData, sendMessage } = useContext(ConnectorContext);
	const tmp = new Chess();
	tmp.load_pgn(pgn);

	const [chess, setChess] = useState(tmp);

	useEffect(() => {
		if(boardData.messageLocalID !== prevId.current){
			console.log(boardData);
			prevId.current = boardData.messageLocalID;
			switch(boardData.type) {
				case 'myStep':
				case 'otherStep':
					if(boardData?.code === 200) {
						const newChess = new Chess();
						newChess.load_pgn(boardData['data']['pgn']);
						setChess(() => {
							if (newChess.in_checkmate()) {
								const winner =
									String(newChess.turn()) === 'b' ? 'white' : 'black';
								alert(`${winner} Wins!`);
								sendMessage({
									type: 'closeGame',
								});
							}
							return newChess;
							});
					}
					break;
				case 'closeGame':
					onClose('left');
					break;
				case 'otherLeft':
					onClose('win');
					break;
				default:
					break;
			}
		}
		
	}, [boardData]);

	const handleSurrenderClick = () => {
		/* const winner = String(chess.turn()) === 'b' ? 'white' : 'black'; */
		sendMessage({ type: 'closeGame'})
		//alert(`${winner} Wins!`);
	};

	const currentTurn = String(chess.turn()) === 'b' ? 'Black' : 'White';

	return useMemo(() => {
		return (
			<div className="wrapper">
				<Prompt
          message={(location, action) => {
            return location.pathname === '/'
              ? true
              : `Are you sure you want to go to ${location.pathname}?`
			  }}/>
				<div className="window">
					<div className="left-container">
						<div className="board-container">
							<BoardComponent chess={chess} view={view} skins={skins} />
						</div>
					</div>
					<div className="right-container">
						<div className="info">
							<div className="block">Current Turn: {currentTurn}</div>
							<button className="button" onClick={handleSurrenderClick}>
								<span>Resign </span>
							</button>
						</div>
						<div className="text-block">
							<Chat />
						</div>
					</div>
				</div>
			</div>
		);
	}, [chess]);
};

export default GameComponent;
