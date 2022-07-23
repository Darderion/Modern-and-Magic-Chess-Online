import React, { useContext } from 'react';
import FieldContext from './FieldContext';

const PieceComponent = ({ color, name, action, index }) => {
	let requiresImg = !(color === '_');

	const { field, setField } = useContext(FieldContext);

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

	const handleClick = () => {
		action.current.push(index)
        console.log(action.current)
		if (action.current.length === 1){
            if (field[action.current[0]] === '_')
                action.current = []
            // Подсветить и добавить варианты для хода
            return
        }
		const first = action.current[0];
		const second = action.current[1];
		if (field[first][0] !== '_' && field[second][0] === '_') {
			setField((prev) => {
				let next = [...prev];
				next[second] = prev[first];
				next[first] = prev[second];
				return [...next];
			});
		}
		action.current = [];
	};

	return (
		<div className="box">
			<div className="overlay" onClick={handleClick} />
			{requiresImg ? (
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
