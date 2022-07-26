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

	const history = chess.history({ verbose: true });

	const getIND = (code) => {
		const pos = String(code);

		const codes = {
			h: 7,
			g: 6,
			f: 5,
			e: 4,
			d: 3,
			c: 2,
			b: 1,
			a: 0,
		};
		return codes[pos[0]] + (8 - Number(pos[1])) * 8;
	};

	const field = chess.board();

	const Board = [];

	field.forEach((row) => {
		row.forEach((it) => {
			Board.push({
				skin: Math.floor(Math.random() * 2) === 1 ? 'wikipedia' : 'default',
				color: it === null ? null : it.color === 'b' ? 'black' : 'white',
				name: it === null ? null : PiecesEnum[it.type],
				selected: false,
				targeted: false,
				idle: false,
			});
		});
	});

	if (history.length > 0 && (view === SideEnum || view === 'observer')) {
		Board[getIND(history.at(-1).from)].selected = true;
		Board[getIND(history.at(-1).to)].selected = true;
	}

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
