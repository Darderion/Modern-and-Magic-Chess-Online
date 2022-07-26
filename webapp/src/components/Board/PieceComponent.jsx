import React, { useContext } from 'react';
import axios from 'axios';
import BoardContext from './BoardContext';

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
	lobbyID,
	chess,
}) => {
	/**
	 * Вернет true, если клетка черная
	 * @param {int} ind 0 - 63
	 * @returns
	 */
	const isBlackCell = (ind) => {
		const row = Math.floor(ind / 8);
		const col = ind % 8;
		return (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0);
	};
	/**
	 * Преобразует индекс клетки в классическую нотацию
	 * @param {int} ind 0 - 63
	 * @returns
	 */
	const getCODE = (ind) =>
		`${String.fromCharCode(97 + (ind % 8))}${8 - Math.floor(ind / 8)}`;

	/**
	 * Преобразует индекс клетки из классической нотации в число от 0 до 63
	 * @param {String} code
	 * @returns
	 */
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

	//   Приблизительно так будет выглядеть запрос
	const src = axios.get(`localhost:5000/skins/${skin}/${color}/${name}.svg`);

	const idleSRC = require('./idle.svg').default;
	const targetedSRC = require('./targeted.svg').default;

	const { board, setBoard } = useContext(BoardContext);

	const SideEnum = String(chess.turn()) === 'b' ? 'black' : 'white';

	const handleClick = () => {
		// Если нет доступа, ничего не делаем
		if (!access) return;
		// Если нажатая клетка уже помечена как таргетед или свободная для хода, то просто делаем туда ход
		if (targeted || idle) {
			// Приблизительно так будет выглядеть запрос
			axios({
				method: 'POST',
				url: '/api/makeMove',
				data: {
					lobbyId: lobbyID,
					from: getCODE(from),
					to: getCODE(index),
				},
			});
			// Если нажал на непомеченную клетку своего цвета, то надо для этого игрока изменить доску из BoardComponent
		} else if (turn === color) {
			setBoard((prev) => {
				const next = [...prev].map((elem) => {
					return { ...elem };
				});
				// Убрать все отметки
				next.map((elem) => {
					elem.selected = false;
					elem.targeted = false;
					elem.idle = false;
					return { ...elem };
				});
				// Если она не была подсвечена после предыдущего нажатия
				if (!selected) {
					next[index].selected = true; // пометим как нажатую
					const code = getCODE(index); // получим код в классической нотации
					const moves = chess.moves({ square: code, verbose: true }); // получим все возможные ходы из нее
					console.log(moves);
					moves.forEach((dict) => {
						const pos = dict.to;
						const ind = getIND(pos);
						if (next[ind].color === null)
							next[ind].idle = true; // если клетка путсая, отметим как idle
						else next[ind].targeted = true; // иначе не пустая, значит targeted
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
				<img src={src} alt={`${color} ${name}`} className={`${skin}-${name}`} />
			) : null}
		</div>
	);
};

export default PieceComponent;
