import React, { useRef, useState, useEffect, useContext } from 'react';
import './Inventory.css';
import { startCase } from 'lodash';
import config from '../../config/index.js';
import Figure from '../../components/Figure/Figure';
import axios from 'axios';
import accTokenFuncs from '../../sharedFuncs/accToken';

import { ConnectorContext } from "../../Connector";

const { server, game } = config;
const { figures, colors } = game;
const imageSource = server.serverURL + server.skinFolder + '/';
const allStylesURL = server.serverURL + server.allStylesFolder + '/';
const setStyleURL = server.serverURL + server.setStyleFolder + '/';

const defaultStyle = { id: -1, packName: 'default' };

const allFiguresWithStylesInit = Object.fromEntries(
	figures.map((figure) => [figure, [defaultStyle]]),
);

const stylesAllInit = Object.fromEntries(
	colors.map((color) => [color, allFiguresWithStylesInit]),
);

const selectedFiguresWithStylesInit = Object.fromEntries(
	figures.map((figure) => [figure, defaultStyle]),
);

const stylesSelectedInit = Object.fromEntries(
	colors.map((color) => [color, selectedFiguresWithStylesInit]),
);

const setStyle = (styleId) => {
	axios
		.post(
			setStyleURL,
			{ id: styleId },
			{
				headers: {
					Authorization: accTokenFuncs.getToken(),
				},
			},
		)
		.catch((err) => console.log(err));
};

const getStyles = (isSelected = true, setter) => {
	axios
		.post(
			allStylesURL,
			{ isSelected: isSelected },
			{
				headers: {
					Authorization: accTokenFuncs.getToken(),
				},
			},
		)
		.then((res) => {
			if (res?.statusText === 'OK') {
				const styles = res?.data?.styles;
				setter(styles);
			} else {
				console.log('Something went wrong!');
			}
		})
		.catch((err) => {
			console.log(err);
			//const message = err?.response?.data?.message;
			//alert(message ? message : 'Something went wrong!');
			const allFiguresWithStyles = Object.fromEntries(
				figures.map((figure) => [
					figure,
					isSelected
						? { style: 'default', id: -1 }
						: [{ style: 'default', id: -1 }],
				]),
			);
			const stylesAll = Object.fromEntries(
				colors.map((color) => [color, allFiguresWithStyles]),
			);
			setter(stylesAll);
		});
};

export default function Inventory() {
	const [current, setCurrent] = useState({
		id: -1,
		color: 'black',
		figure: 'bishop',
		style: 'default',
	});
	const [stylesSelected, setStylesSelected] = useState(stylesSelectedInit);
	const [stylesAll, setStylesAll] = useState(stylesAllInit);

	const { connect } = useContext(ConnectorContext);

	useEffect(
		() => {
			// Reconnect when entered
			connect();
		}, []
	);

	useEffect(() => {
		if (accTokenFuncs.isAuth()) {
			getStyles(true, setStylesSelected);
			getStyles(false, setStylesAll);
		}
	}, []);
	return (
		<div className="figures">
			<div className="selector">
				{colors.map((color) => (
					<div className="selected__line" key={`color__${color}`}>
						<p className="color">{startCase(color)} styles:</p>
						{figures.map((figure) => {
							const isSelected = () =>
								current.color === color && current.figure === figure;
							const figureInfo = {
								color,
								figure,
								style: stylesSelected[color][figure].packName,
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
							isSelected={() => current.style === style.packName}
							key={`style_${style.packName}`}
							onClick={() => {
								setStyle(style.id);
								setCurrent((prev) => ({
									...prev,
									style: style.packName,
									id: style.id,
								}));
								stylesSelected[current.color][current.figure] = style;
								// send request to save selected color
							}}
							figureInfo={{
								...current,
								style: style.packName,
							}}
							imageSource={imageSource}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
