import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Lobby from '../../components/Lobby/Lobby';
import GameComponent from '../../components/Game/GameComponent';

export default function Main() {
	const [gameData, setGameData] = useState(undefined);
	const [state, setState] = useState(undefined);
	const prevId = useRef(-1);
	useEffect(() => {
		switch(state) {
			case undefined:
				break;
			case 'win':
				alert('You won!');
				break;
			case 'left':
				alert('You left!');
				break;
			case 'draw':
				alert('It\'s draw!');
				break;
			default:
				break;
		}
		setGameData(() => undefined);
		setState(() => undefined);
	}, [state]);

	return (gameData === undefined ? 
			<Lobby setGameData={setGameData} /> : 
			<GameComponent pgn={gameData.pgn} 
				skins={gameData.styles} view={gameData.isFirst ? 
				'white' : 'black'} onClose={ (state) => setState(() => state)}
				prevId={prevId}/>
	);
}

/*{/*  */