import React, { useState } from 'react';
import './Inventory.css';
import { startCase } from 'lodash';
import config from '../../config/index.js';
import Figure from '../../components/Figure/Figure';

const { server, game } = config;
const { figures, colors } = game;
const imageSource = server.serverURL + server.skinFolder + '/';


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
									imageSource={imageSource}
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
							imageSource={imageSource}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
