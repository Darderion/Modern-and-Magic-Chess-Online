import React from 'react';

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
}) => {
	const isBlackCell = (ind) => {
		const row = Math.floor(ind / 8);
		const col = ind % 8;
		return (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0);
	};

	const codes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	const transform = (ind) => {
		return codes[ind % 8] + String(8 - Math.floor(ind / 8));
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

	const handleClick = () => {
		if (!canSelect) return;

		if (targeted || idle) {
			alert(`POST a move to ${transform(index)}`);
		} else if (selectColor === color && !selected) {
			alert(`POST a highlight to ${transform(index)}`);
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
