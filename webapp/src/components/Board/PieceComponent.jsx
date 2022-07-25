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
	selectColor,
	canSelect,
	anotherSelected,
}) => {
	const isBlackCell = (ind) => {
		const row = Math.floor(ind / 8);
		const col = ind % 8;
		return (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0);
	};

	const getCODE = (ind) => {
		const codes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		return codes[ind % 8] + String(8 - Math.floor(ind / 8));
	};

	const getIND = (code) => {

		const pos = String(code)
			
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

	//   TODO: добавить плучение svg запросом
	const src = {
		'black bishop': require('./black/bishop.svg').default,
		'black king': require('./black/king.svg').default,
		'black knight': require('./black/knight.svg').default,
		'black pawn': require('./black/pawn.svg').default,
		'black queen': require('./black/queen.svg').default,
		'black rook': require('./black/rook.svg').default,
		'white bishop': require('./white/bishop.svg').default,
		'white king': require('./white/king.svg').default,
		'white knight': require('./white/knight.svg').default,
		'white pawn': require('./white/pawn.svg').default,
		'white queen': require('./white/queen.svg').default,
		'white rook': require('./white/rook.svg').default,
	};

	const idleSRC = require('./idle.svg').default;
	const targetedSRC = require('./targeted.svg').default;

	const { chess, setChess } = useContext(ChessContext);
	const { board, setBoard } = useContext(BoardContext);

	const handleClick = () => {
		if (!canSelect) return;

		if (targeted || idle) {
			// alert(`POST a move to ${getCODE(index)}`);
			setChess(prev => {
				const history = prev.fen()
				const next = new Chess(history)
				next.move({from: getCODE(anotherSelected), to: getCODE(index)})
				console.log(getCODE(anotherSelected), getCODE(index))
				return next
			})
		} else if (selectColor === color) {
			// alert(`POST a highlight to ${getCODE(index)}`);
			setBoard((prev) => {
				const next = [...prev].map((elem) => {
					return { ...elem };
				});
				next.map(elem => {
					elem.selected = false;
					elem.targeted = false;
					elem.idle = false;
					return {...elem}
				});
				if (!selected)
				{
					next[index].selected = true;
					const code = getCODE(index)
					const moves = chess.moves({square: code, verbose: true})
					console.log(moves)
					moves.forEach(dict => {
						const pos = dict.to
						const ind = getIND(pos)
						if (next[ind].color === null)
							next[ind].idle = true
						else next[ind].targeted = true
					})
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
					src={src[`${color} ${name}`]}
					alt={`${color} ${name}`}
					className={`${skin}-${name}`}
				/>
			) : null}
		</div>
	);
};

export default PieceComponent;
