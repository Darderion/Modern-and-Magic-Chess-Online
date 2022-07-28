import React, { useContext, useMemo, useState, useEffect } from 'react';
import { ConnectorContext } from '../../Connector';
import BoardComponent from '../Board/BoardComponent';
import * as Chess from 'chess.js';
import axios from 'axios';
import './styles.css';

const GameComponent = ({ pgn, skins }) => {

	const { lobbyData, boardData, sendMessage } = useContext(ConnectorContext);

	const {chess, setChess} = useState(new Chess());

    useEffect((prev) => {
        const next = new Chess();
        next.load_pgn(pgn.join('\n'));
        return next;
    }, [])

    useEffect(() => {
        const newPGN = null; // TODO: получение pgn из boardData
        const next = new Chess();
        next.load_pgn(newPGN.join('\n'));
        return next;
    }, [boardData])

	const handleSurrenderClick = () => {
		// ???
	};

    const currentTurn = String(chess.turn() === 'b') ? 'Black' : 'White';

    const view = null; // TODO: добавить получение смотрящей стороны

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
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
							natus unde nesciunt itaque ea aliquam dolorum sint officia sunt
							repellendus expedita esse, minima neque amet molestiae enim et
							suscipit iure!
						</div>
					</div>
				</div>
			</div>
		);
	}, [boardData, lobbyData]);
};

export default GameComponent;
