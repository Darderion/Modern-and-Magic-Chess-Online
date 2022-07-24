import React from 'react';
import BoardComponent from '../../components/Board/BoardComponent';
import '../../components/Board/style.css';

const Board = () => {
	// chess.board()
	const field = [
		[
			{ square: 'a8', type: 'r', color: 'b' },
			{ square: 'b8', type: 'n', color: 'b' },
			{ square: 'c8', type: 'b', color: 'b' },
			{ square: 'd8', type: 'q', color: 'b' },
			{ square: 'e8', type: 'k', color: 'b' },
			{ square: 'f8', type: 'b', color: 'b' },
			{ square: 'g8', type: 'n', color: 'b' },
			{ square: 'h8', type: 'r', color: 'b' },
		],
		[
			{ square: 'a7', type: 'p', color: 'b' },
			{ square: 'b7', type: 'p', color: 'b' },
			{ square: 'c7', type: 'p', color: 'b' },
			{ square: 'd7', type: 'p', color: 'b' },
			{ square: 'e7', type: 'p', color: 'b' },
			{ square: 'f7', type: 'p', color: 'b' },
			{ square: 'g7', type: 'p', color: 'b' },
			{ square: 'h7', type: 'p', color: 'b' },
		],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[
			{ square: 'a2', type: 'p', color: 'w' },
			{ square: 'b2', type: 'p', color: 'w' },
			{ square: 'c2', type: 'p', color: 'w' },
			{ square: 'd2', type: 'p', color: 'w' },
			{ square: 'e2', type: 'p', color: 'w' },
			{ square: 'f2', type: 'p', color: 'w' },
			{ square: 'g2', type: 'p', color: 'w' },
			{ square: 'h2', type: 'p', color: 'w' },
		],
		[
			{ square: 'a1', type: 'r', color: 'w' },
			{ square: 'b1', type: 'n', color: 'w' },
			{ square: 'c1', type: 'b', color: 'w' },
			{ square: 'd1', type: 'q', color: 'w' },
			{ square: 'e1', type: 'k', color: 'w' },
			{ square: 'f1', type: 'b', color: 'w' },
			{ square: 'g1', type: 'n', color: 'w' },
			{ square: 'h1', type: 'r', color: 'w' },
		],
	];


	const turn = 'white';
	const from = 'e2';
	const to = null;
	const targeted = [];
	const idle = ['e3', 'e4'];

	return (
		<div className="wrapper">
			<div className='board-container'><BoardComponent
				field={field}
				turn={turn}
				view={'white'}
				from={from}
				to={to}
				targeted={targeted}
				idle={idle}
			/>White</div>
			<div className='board-container'><BoardComponent
				field={field}
				turn={turn}
				view={'black'}
				from={from}
				to={to}
				targeted={targeted}
				idle={idle}
			/>Black</div>
			<div className='board-container'><BoardComponent
				field={field}
				turn={turn}
				view={'observer'}
				from={from}
				to={to}
				targeted={targeted}
				idle={idle}
			/>Observer</div>
		</div>
	);
};

export default Board;
