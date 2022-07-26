import React, { useEffect, useContext, useState } from 'react';
import PieceComponent from './PieceComponent';
import BoardContext from './BoardContext';
import ChessContext from './ChessContext';

const BoardComponent = ({ view }) => {
	const PiecesEnum = {
		k: 'king',
		n: 'knight',
		r: 'rook',
		q: 'queen',
		p: 'pawn',
		b: 'bishop',
	};

	const { chess, setChess } = useContext(ChessContext);

	const SideEnum = String(chess.turn()) === 'b' ? 'black' : 'white';

	const field = chess.board();

	const Board = [];

	field.forEach((row) => {
		row.forEach((it) => {
			Board.push({
				skin: 'default',
				color: it === null ? null : it.color === 'b' ? 'black' : 'white',
				name: it === null ? null : PiecesEnum[it.type],
				selected: false,
				targeted: false,
				idle: false,
			});
		});
	});
	const access = SideEnum === view;

	const [board, setBoard] = useState(Board.map((it) => ({ ...it })));

	useEffect(() => {
		setBoard(Board.map((it) => ({ ...it })));
	}, [chess]);

	let from = null;
	board.forEach((elem, i) => {
		if (elem.selected && elem.color === SideEnum) from = i;
	});

	let layout;
	if (view === 'black') {
		layout = [...board].reverse().map((elem) => {
			return { ...elem };
		});
	} else {
		layout = [...board].map((elem) => {
			return { ...elem };
		});
	}

	return (
		<BoardContext.Provider value={{ board, setBoard }}>
			<div className="board">
				{layout.map((elem, i) => (
					<PieceComponent
						key={view === 'black' ? 63 - i : i}
						skin={elem.skin}
						color={elem.color}
						name={elem.name}
						selected={elem.selected}
						targeted={elem.targeted}
						idle={elem.idle}
						index={view === 'black' ? 63 - i : i}
						access={access}
						from={from}
					/>
				))}
			</div>
		</BoardContext.Provider>
	);
};

export default BoardComponent;
