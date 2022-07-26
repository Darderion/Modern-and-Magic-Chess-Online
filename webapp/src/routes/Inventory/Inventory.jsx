import React, { useState } from 'react';
import './Inventory.css'

const imageSource = "http://localhost:5000/skins/";
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
const stylesAll = {
    black: {
        bishop: ['go', 'br', 'default'],
        king: ['go', 'br', 'default'],
        knight: ['go', 'br', 'default'],
        queen: ['go', 'br', 'default'],
        pawn: ['go', 'br', 'default'],
        rook: ['go', 'br', 'default'],
    },
    white: {
        bishop: ['go', 'br', 'default'],
        king: ['go', 'br', 'default'],
        knight: ['go', 'br', 'default'],
        queen: ['go', 'br', 'default'],
        pawn: ['go', 'br', 'default'],
        rook: ['go', 'br', 'default'],
    },
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export default function Inventory() {
    
    const [showColor, changeColor] = useState('black');
    const [showFigure, changeFigure] = useState('bishop');
    const [selectedStyle, changeStyle] = useState('default');
	return (
		<div className="figures">
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
		</div>
	);
}
