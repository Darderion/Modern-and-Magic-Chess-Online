import React, { useState, useRef } from 'react';
import { useContext } from 'react';
import PieceComponent from './PieceComponent';
import FieldContext from './FieldContext';

const BoardComponent = ({ player }) => {
	const action = useRef([]);

	const { field, setField } = useContext(FieldContext);

	let layout;

	if (player === 'white') {
		layout = [...field].map((elem) => {
			return { ...elem };
		});
	} else {
		layout = [...field].reverse().map((elem) => {
			return { ...elem };
		});
	}

	return (
		<div className="board">
			{layout.map((elem, i) => (
				<PieceComponent
					key={player === 'white' ? i : 63 - i}
					skin={elem.skin}
					color={elem.color}
					name={elem.name}
					selected={elem.selected}
					targeted={elem.targeted}
					idle={elem.idle}
					action={action}
					index={player === 'white' ? i : 63 - i}
				/>
			))}
		</div>
	);
};

export default BoardComponent;
