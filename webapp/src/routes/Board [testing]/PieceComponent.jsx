import React from 'react';
import { useContext } from 'react';
import ChessContext from './ChessContext';
import BoardContext from './BoardContext';
import { Chess } from 'chess.js';

const PieceComponent = ({
	skin,
	color,
	name,
	selected,
	targeted,
	idle,
	index,
	access,
	from,
}) => {
	const isBlackCell = (ind) => {
		const row = Math.floor(ind / 8);
		const col = ind % 8;
		return (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0);
	};

	const getCODE = (ind) =>
		`${String.fromCharCode(97 + (ind % 8))}${8 - Math.floor(ind / 8)}`;

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

	// console.log({
	// 	'index': index,
	// 	'code': getCODE(index),
	// 	'color': color,
	// 	'name': name,
	// 	'selected': selected,
	// 	'targeted': targeted,
	// 	'idle': idle,
	// 	'access': access,
	// 	'from': from,
	// })

	//   TODO: добавить плучение svg запросом
	const src = {
		'default black bishop': require('./default/black/bishop.svg').default,
		'default black king': require('./default/black/king.svg').default,
		'default black knight': require('./default/black/knight.svg').default,
		'default black pawn': require('./default/black/pawn.svg').default,
		'default black queen': require('./default/black/queen.svg').default,
		'default black rook': require('./default/black/rook.svg').default,
		'default white bishop': require('./default/white/bishop.svg').default,
		'default white king': require('./default/white/king.svg').default,
		'default white knight': require('./default/white/knight.svg').default,
		'default white pawn': require('./default/white/pawn.svg').default,
		'default white queen': require('./default/white/queen.svg').default,
		'default white rook': require('./default/white/rook.svg').default,
		'wikipedia black bishop': require('./wikipedia/black/bishop.svg').default,
		'wikipedia black king': require('./wikipedia/black/king.svg').default,
		'wikipedia black knight': require('./wikipedia/black/knight.svg').default,
		'wikipedia black pawn': require('./wikipedia/black/pawn.svg').default,
		'wikipedia black queen': require('./wikipedia/black/queen.svg').default,
		'wikipedia black rook': require('./wikipedia/black/rook.svg').default,
		'wikipedia white bishop': require('./wikipedia/white/bishop.svg').default,
		'wikipedia white king': require('./wikipedia/white/king.svg').default,
		'wikipedia white knight': require('./wikipedia/white/knight.svg').default,
		'wikipedia white pawn': require('./wikipedia/white/pawn.svg').default,
		'wikipedia white queen': require('./wikipedia/white/queen.svg').default,
		'wikipedia white rook': require('./wikipedia/white/rook.svg').default,
	};

	const idleSRC = require('./idle.svg').default;
	const targetedSRC = require('./targeted.svg').default;

	const { chess, setChess } = useContext(ChessContext);
	const { board, setBoard } = useContext(BoardContext);

	const SideEnum = String(chess.turn()) === 'b' ? 'black' : 'white';

	const handleClick = () => {
		if (!access) return;

		if (targeted || idle) {
			setChess((prev) => {
				const history = prev.fen();
				const next = new Chess(history);
				next.move({ from: getCODE(from), to: getCODE(index) });
				console.log(getCODE(from), getCODE(index));
				return next;
			});
		} else if (SideEnum === color) {
			setBoard((prev) => {
				const next = [...prev].map((elem) => {
					return { ...elem };
				});
				next.map((elem) => {
					if (elem.color === SideEnum)
						elem.selected = false;
					elem.targeted = false;
					elem.idle = false;
					return { ...elem };
				});
				if (!selected) {
					next[index].selected = true;
					const code = getCODE(index);
					const moves = chess.moves({ square: code, verbose: true });
					console.log(moves);
					moves.forEach((dict) => {
						const pos = dict.to;
						const ind = getIND(pos);
						if (next[ind].color === null) next[ind].idle = true;
						else next[ind].targeted = true;
					});
				}

				return [...next].map((elem) => {
					return { ...elem };
				});
			});
		}
	};

	return (
		<div className="box">
			<div
				className={`underlay ${
					selected
						? isBlackCell(index)
							? 'selected-black'
							: 'selected-white'
						: null
				}`}>
				{idle ? <img src={idleSRC} alt="idle" className="idle" /> : null}
				{targeted ? (
					<img src={targetedSRC} alt="targeted" className="targeted" />
				) : null}
			</div>
			<div className="overlay" onClick={handleClick} />
			{color !== null ? (
				<img
					src={src[`${skin} ${color} ${name}`]}
					alt={`${color} ${name}`}
					className={`${skin}-${name}`}
				/>
			) : null}
		</div>
	);
};

export default PieceComponent;
