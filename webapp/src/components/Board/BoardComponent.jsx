import React from 'react';
import PieceComponent from './PieceComponent';
/**
 * Для рендера доски принимает параметры для корректного отбражения игровой ситуации
 * @param {Array.<{field: Array.<Array.<{squre: String, type: String, color: String}>>, turn: String, view: String, from: String, to: String, targeted: Array.<String>, idle: Array.<String>}>} props
 * @returns
 */
const BoardComponent = ({ field, turn, view, from, to, targeted, idle }) => {

	console.log("from", from)
	console.log("to", to)

	const codes = {
		"h" : 7,
		"g" : 6,
		"f" : 5,
		"e" : 4,
		"d" : 3,
		"c" : 2,
		"b" : 1,
		"a" : 0
	}

	const names = {
		"k" : "king",
		"n" : "knight",
		"r" : "rook",
		"q" : "queen",
		"p" : "pawn",
		"b" : "bishop"
	}

	const transform = (code) => {
		return codes[code[0]] + (8 - Number(code[1])) * 8
	}

	const Board = []

	field.forEach(row => {
		[...row].map(elem => {
			const tmp = {
				skin: "default",
				color: elem === null ? null : (elem.color === 'b' ? "black" : "white"),
				name: elem === null ? null : names[elem.type],
				selected: false,
				targeted: false,
				idle: false
			}
			return {...tmp}
		}).forEach(dict => {
			Board.push({...dict})
		})
	});

	const i = transform(from)

	if (to === null) {
		if (turn === view) {
			Board[i].selected = true
			targeted.forEach(code => {
				Board[transform(code)].targeted = true
			})
			idle.forEach(code => {
				Board[transform(code)].idle = true
			})
		}
	}
	else {
		const j = transform(to)
		Board[j].color = Board[i].color
		Board[j].name = Board[i].name
		Board[j].skin = Board[i].skin
		Board[i].color = null
		Board[i].name = null
		if (view !== turn) {
			Board[i].selected = true
			Board[j].selected = true
		}
	}

	let layout;

	if (view === "black") {
		layout = [...Board].reverse().map((elem) => {
			return { ...elem };
		});
	} else {
		layout = [...Board].map((elem) => {
			return { ...elem };
		});
	}

	return (
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
				/>
			))}
		</div>
	);
};

export default BoardComponent;
