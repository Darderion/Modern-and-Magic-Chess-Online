import React, { useState } from 'react';
import * as Chess from 'chess.js';
import BoardComponent from './BoardComponent'
import './style.css'
import ChessContext from './ChessContext'

const Board = () => {

	const [ chess, setChess ] = useState(new Chess())

	return (
		<ChessContext.Provider value={{chess, setChess}}>
		<div className="wrapper">
			<div className='board-container'><BoardComponent
				view={'white'}
			/>White</div>
			<div className='board-container'><BoardComponent
				view={'black'}
			/>Black</div>
			<div className='board-container'><BoardComponent
				view={'observer'}
			/>Observer</div>
		</div>
		</ChessContext.Provider>
	);
};

export default Board;
