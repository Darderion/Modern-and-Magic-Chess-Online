import React, { useEffect, useContext, useState  } from 'react';
import PieceComponent from './PieceComponent';
import BoardContext from './BoardContext';
import ChessContext from './ChessContext';

const BoardComponent = ({ view }) => {

	const names = {
		k: 'king',
		n: 'knight',
		r: 'rook',
		q: 'queen',
		p: 'pawn',
		b: 'bishop',
	};

	const { chess, setChess } = useContext(ChessContext);

	const turn = String(chess.turn()) === 'b' ? 'black' : 'white';

	const field = chess.board();

	const Board = [];

	field.forEach((row) => {
		[...row]
			.map((elem) => {
				const tmp = {
					skin: 'default',
					color: elem === null ? null : elem.color === 'b' ? 'black' : 'white',
					name: elem === null ? null : names[elem.type],
					selected: false,
					targeted: false,
					idle: false,
				};
				return { ...tmp };
			})
			.forEach((dict) => {
				Board.push({ ...dict });
			});
	});

	const selectColor = turn;
	const canSelect = turn === view;

	const [board, setBoard] = useState(
		[...Board].map((elem) => {
			return { ...elem };
		}),
	);

	useEffect(() => {
		setBoard((prev) => {
			return [...Board].map((elem) => {
				return { ...elem };
			});
		});
	}, [chess]);

	let anotherSelected = null;
	board.forEach((elem, i) => {
		if (elem.selected && elem.color === turn) anotherSelected = i;
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
						selectColor={selectColor}
						canSelect={canSelect}
						anotherSelected={anotherSelected}
					/>
				))}
			</div>
		</BoardContext.Provider>
	);
};

export default BoardComponent;
