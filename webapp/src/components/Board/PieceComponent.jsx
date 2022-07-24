import React from 'react';

const PieceComponent = ({
	skin,
	color,
	name,
	selected,
	targeted,
	idle,
	index,
}) => {
	const isBlackCell = (ind) => {
		const row = Math.floor(ind / 8);
		const col = ind % 8;
		return (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0);
	};

	//   Placeholder
	const src = {
		'black bishop': require('./images/skins/default/black/bishop.svg').default,
		'black king': require('./images/skins/default/black/king.svg').default,
		'black knight': require('./images/skins/default/black/knight.svg').default,
		'black pawn': require('./images/skins/default/black/pawn.svg').default,
		'black queen': require('./images/skins/default/black/queen.svg').default,
		'black rook': require('./images/skins/default/black/rook.svg').default,
		'white bishop': require('./images/skins/default/white/bishop.svg').default,
		'white king': require('./images/skins/default/white/king.svg').default,
		'white knight': require('./images/skins/default/white/knight.svg').default,
		'white pawn': require('./images/skins/default/white/pawn.svg').default,
		'white queen': require('./images/skins/default/white/queen.svg').default,
		'white rook': require('./images/skins/default/white/rook.svg').default,
	};
	//   Placeholder

	const idleSRC = require('./idle.svg').default;
	const targetedSRC = require('./targeted.svg').default;

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
			<div className="overlay" onClick={null} />
			{color !== null ? (
				<img
					src={src[`${color} ${name}`]}
					alt={`${color} ${name}`}
					className={name}
				/>
			) : null}
		</div>
	);
};

export default PieceComponent;
