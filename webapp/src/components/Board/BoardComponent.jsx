import React, { useState, useRef } from 'react';
import PieceComponent from './PieceComponent';
import FieldContext from './FieldContext';

const BoardComponent = () => {
    const yourColor = "white"
    const enemyColor = "black"
	const [field, setField] = useState(
		[].concat(
			[
				{
					skin: 'default',
					color: enemyColor,
					name: 'rook',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: enemyColor,
					name: 'knight',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: enemyColor,
					name: 'bishop',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: enemyColor,
					name: 'queen',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: enemyColor,
					name: 'king',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: enemyColor,
					name: 'bishop',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: enemyColor,
					name: 'knight',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: enemyColor,
					name: 'rook',
					selected: false,
					targeted: false,
					idle: false,
				},
			],
			Array(8).fill({
				skin: 'default',
				color: enemyColor,
				name: 'pawn',
				selected: false,
				targeted: false,
				idle: false,
			}),
			Array(4 * 8).fill({...{
                skin: 'default',
                color: null,
                name: null,
                selected: false,
				targeted: false,
				idle: false,
            }}),
			Array(8).fill({...{
				skin: 'default',
				color: yourColor,
				name: 'pawn',
				selected: false,
				targeted: false,
				idle: false,
			}}),
			[
				{
					skin: 'default',
					color: yourColor,
					name: 'rook',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: yourColor,
					name: 'knight',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: yourColor,
					name: 'bishop',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: yourColor,
					name: 'queen',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: yourColor,
					name: 'king',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: yourColor,
					name: 'bishop',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: yourColor,
					name: 'knight',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: yourColor,
					name: 'rook',
					selected: false,
					targeted: false,
					idle: false,
				},
			],
		),
	);

	const action = useRef([]);

	return (
		<FieldContext.Provider value={{ field, setField }}>
			<div className="board">
				{[...field].map((elem, i) => (
					<PieceComponent
						key={i}
                        skin={elem.skin}
						color={elem.color}
						name={elem.name}
                        selected={elem.selected}
                        targeted={elem.targeted}
                        idle={elem.idle}
						action={action}
						index={i}
					/>
				))}
			</div>
		</FieldContext.Provider>
	);
};

export default BoardComponent;
