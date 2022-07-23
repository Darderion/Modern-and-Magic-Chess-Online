import React, { useContext } from 'react';
import FieldContext from './FieldContext';

const PieceComponent = ({
	skin,
	color,
	name,
	selected,
	targeted,
	idle,
	action,
	index,
}) => {
	let requiresImg = color !== null;

	const { field, setField } = useContext(FieldContext);

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

	const handleClick = () => {
		action.current.push(index);
		console.log(action.current);
		// в action только один индекс
		if (action.current.length === 1) {
			// индекс указывает на пустую клетку
			if (field[action.current[0]].color === null) action.current = [];
			// TODO: добавить варианты для хода и проверку валидности
			else {
				setField((prev) => {
					let next = prev.map((elem) => {
						return { ...elem };
					});
					next[index].selected = true;
					return next.map((elem) => {
						return { ...elem };
					});
				});
			}
			// в action 2 индекса
		} else {
			const first = action.current[0];
			const second = action.current[1];
			// TODO: проверка валидности
			if (field[second].color === null) {
				action.current = [];
				setField((prev) => {
					let next = prev.map((elem) => {
						return { ...elem };
					});
					next[second] = { ...prev[first] };
					next[first] = { ...prev[second] };
					next[second].selected = false;
					return next.map((elem) => {
						return { ...elem };
					});
				});
			} else {
				action.current = [second];
				setField((prev) => {
					let next = prev.map((elem) => {
						return { ...elem };
					});
					next[first].selected = false;
					next[second].selected = true;
					return next.map((elem) => {
						return { ...elem };
					});
				});
			}
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
				}`}
			/>
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
