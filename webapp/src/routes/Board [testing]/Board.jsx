import React, { useState } from 'react';
import BoardComponent from '../../components/Board/BoardComponent';
import '../../components/Board/style.css';
import FieldContext from '../../components/Board/FieldContext';

const Board = () => {
	const [field, setField] = useState(
		[].concat(
			[
				{
					skin: 'default',
					color: 'black',
					name: 'rook',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'black',
					name: 'knight',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'black',
					name: 'bishop',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'black',
					name: 'queen',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'black',
					name: 'king',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'black',
					name: 'bishop',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'black',
					name: 'knight',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'black',
					name: 'rook',
					selected: false,
					targeted: false,
					idle: false,
				},
			],
			Array(8).fill({
				skin: 'default',
				color: 'black',
				name: 'pawn',
				selected: false,
				targeted: false,
				idle: false,
			}),
			Array(4 * 8).fill({
				...{
					skin: 'default',
					color: null,
					name: null,
					selected: false,
					targeted: false,
					idle: false,
				},
			}),
			Array(8).fill({
				...{
					skin: 'default',
					color: 'white',
					name: 'pawn',
					selected: false,
					targeted: false,
					idle: false,
				},
			}),
			[
				{
					skin: 'default',
					color: 'white',
					name: 'rook',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'white',
					name: 'knight',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'white',
					name: 'bishop',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'white',
					name: 'queen',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'white',
					name: 'king',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'white',
					name: 'bishop',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'white',
					name: 'knight',
					selected: false,
					targeted: false,
					idle: false,
				},
				{
					skin: 'default',
					color: 'white',
					name: 'rook',
					selected: false,
					targeted: false,
					idle: false,
				},
			],
		),
	);
	console.log(field);

	return (
		<FieldContext.Provider value={{ field, setField }}>
			<div className="wrapper">
				<BoardComponent player={'white'} />
				<BoardComponent player={'black'} />
			</div>
		</FieldContext.Provider>
	);
};

export default Board;
