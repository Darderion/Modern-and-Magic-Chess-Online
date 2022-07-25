import { Chess } from 'chess.js';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react'
import BoardComponent from '../../components/Board/BoardComponent';
import '../../components/Board/style.css';
import ChessContext from '../../components/Board/ChessContext';

const Board = () => {

	const [ chess, setChess ] = useState(new Chess())

	return (
		<ChessContext.Provider value={{chess, setChess}}>
		<div className="wrapper">
			<div className='board-container'><BoardComponent
				chess={chess}
				view={'white'}
			/>White</div>
			<div className='board-container'><BoardComponent
				chess={chess}
				view={'black'}
			/>Black</div>
			<div className='board-container'><BoardComponent
				chess={chess}
				view={'observer'}
			/>Observer</div>
		</div>
		</ChessContext.Provider>
	);
};

export default Board;
