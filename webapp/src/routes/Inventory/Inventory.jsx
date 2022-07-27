import React, { useState } from 'react';
import './Inventory.css';
import { startCase } from 'lodash';
import config from '../../config/index.js';
const server = config.server;

const imageSource = server.serverURL + server.skinFolder + '/';
const figures = ['bishop', 'king', 'knight', 'queen', 'pawn', 'rook'];
const colors = ['black', 'white'];
const stylesSelected = {
	black: {
		bishop: 'go',
		king: 'br',
		knight: 'br',
		queen: 'br',
		pawn: 'default',
		rook: 'go',
	},
	white: {
		bishop: 'go',
		king: 'br',
		knight: 'br',
		queen: 'br',
		pawn: 'default',
		rook: 'go',
	},
};
const packs = ['go', 'br', 'default'];

const allFiguresWithStyles = Object.fromEntries(
	figures.map((figure) => [figure, packs]),
);

const stylesAll = Object.fromEntries(
	colors.map((color) => [color, allFiguresWithStyles]),
);

export default function Inventory() {
	const [showColor, setColor] = useState('black');
	const [showFigure, setFigure] = useState('bishop');
	const [selectedStyle, setStyle] = useState('default');

	const setAll = (color, figure, style) => {
		setColor(() => color);
		setFigure(() => figure);
		setStyle(() => style);
	};

	return (
		<div className="figures">
			<div className="selected">
				{colors.map((color) => {
					return (
						<div className="selected__line" key={`color__${color}`}>
							<p className="color">{startCase(color)} styles:</p>
							{figures.map((figure) => {
								return (
									<label
										className={
											showColor === color && showFigure === figure
												? 'figure checked'
												: 'figure'
										}
										key={`${color}__${figure}`}
										onClick={() =>
											setAll(color, figure, stylesSelected[color][figure])
										}
										id={`${figure}__${color}__${stylesSelected[color][figure]}`}>
										<img
											src={`${imageSource}${
												showColor === color && showFigure === figure
													? selectedStyle
													: stylesSelected[color][figure]
											}/${color}/${figure}.svg`}
											alt={`${color}__${figure}`}
										/>
									</label>
								);
							})}
						</div>
					);
				})}
			</div>
			<div className="selector">
				<p className="colorFigure">
					Select a style for {showColor} {showFigure}:
				</p>
				<div className="show__line">
					{stylesAll[showColor][showFigure].map((style) => {
						return (
							<label
								className={selectedStyle === style ? 'checked' : ''}
								key={`style__${style}`}
								onClick={() => {
									setStyle((prev) => style);
									stylesSelected[showColor][showFigure] = style;
									//later send it to server
								}}
								id={`${showFigure}__${showColor}__${style}`}>
								<img
									src={`${imageSource}${style}/${showColor}/${showFigure}.svg`}
									alt={`${style}`}
								/>
							</label>
						);
					})}
				</div>
			</div>
		</div>
	);
}