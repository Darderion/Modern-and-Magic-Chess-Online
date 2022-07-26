import React, { useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bbdc10c (Refactor Inventory, add install guide for webapp in README, delete .vscode, package-lock.js)
import './Inventory.css';
import { startCase } from 'lodash';
import config from '../../config/index.js';
<<<<<<< HEAD
const server = config.server;
<<<<<<< HEAD
=======

const { server } = config;
>>>>>>> 833c915 (Huge code refactoring: inventary, lobby, readme, new install_web.hs)

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

function Figure({ isSelected, figureInfo, onClick }) {
	const { color, figure, style } = figureInfo;
	return (
		<label
			className={isSelected() ? 'selected' : ''}
			onClick={onClick}
			id={`${figure}__${color}__${style}`}>
			<img
				src={`${imageSource}${style}/${color}/${figure}.svg`}
				alt={`${style}`}
			/>
		</label>
	);
}

export default function Inventory() {
	const [current, setCurrent] = useState({
		color: 'black',
		figure: 'bishop',
		style: 'default',
	});

	return (
		<div className="figures">
			<div className="selected">
				{colors.map((color) => (
					<div className="selected__line" key={`color__${color}`}>
						<p className="color">{startCase(color)} styles:</p>
						{figures.map((figure) => {
							const isSelected = () =>
								current.color === color && current.figure === figure;
							const figureInfo = {
								color,
								figure,
								style: stylesSelected[color][figure],
							};
							return (
								<Figure
									isSelected={isSelected}
									key={`${color}__${figure}`}
									onClick={() => setCurrent(() => figureInfo)}
									figureInfo={figureInfo}
								/>
							);
						})}
					</div>
				))}
			</div>
			<div className="selector">
				<p className="colorFigure">
					Select a style for {current.color} {current.figure}:
				</p>
				<div className="show__line">
					{stylesAll[current.color][current.figure].map((style) => (
						<Figure
							isSelected={() => current.style === style}
							key={`style_${style}`}
							onClick={() => {
								setCurrent((prev) => ({ ...prev, style }));
								stylesSelected[current.color][current.figure] = style;
								// send request to save selected color
							}}
							figureInfo={{
								...current,
								style,
							}}
						/>
					))}
				</div>
			</div>
=======
import './Inventory.css'
=======
>>>>>>> bbdc10c (Refactor Inventory, add install guide for webapp in README, delete .vscode, package-lock.js)

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
<<<<<<< HEAD
            <div className="selected">
                {colors.map((color) => {
                    return (<div className="selected__line">
                        <p className="color">{capitalizeFirstLetter(color)} styles:</p>
                        {figures.map(figure => {
                            return (<label className={showColor === color && showFigure === figure ? 'figure checked' : 'figure'} key={`${color}__${figure}`} onClick={() => {
                                changeColor(prev => color);
                                changeFigure(prev => figure);
                                changeStyle(prev => stylesSelected[color][figure]);
                                console.log(showColor, showFigure);
                            }} id={`${figure}__${color}__${stylesSelected[color][figure]}`}>
                            <img src={`${imageSource}${showColor === color && showFigure === figure ? selectedStyle : stylesSelected[color][figure]}/${color}/${figure}.svg`} alt={`${color}__${figure}`}/>
                        </label>);
                        })}
                    </div>)
                })}
            </div>
            <div className="selector">
                <p className="colorFigure">Select a style for {showColor} {showFigure}:</p>
                <div className="show__line">
                {stylesAll[showColor][showFigure].map(style => {
                    return (
                    <label className={selectedStyle === style ? 'checked' : ''} key={`style__${style}`} onClick={() => {
                        changeStyle(prev => style);
                        stylesSelected[showColor][showFigure] = style;
                        console.log(stylesSelected[showColor][showFigure]); 
                        //later it send to server
                        console.log(selectedStyle);
                    }} id={`${showFigure}__${showColor}__${style}`}>
                        <img src={`${imageSource}${style}/${showColor}/${showFigure}.svg`} alt={`${style}`}/>
                    </label>);
                })}
                </div>
            </div>
>>>>>>> 6750ffd (Add inventory, add styles on server, add static support on server, add webSocketSuppert on server.)
=======
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
>>>>>>> bbdc10c (Refactor Inventory, add install guide for webapp in README, delete .vscode, package-lock.js)
		</div>
	);
}
