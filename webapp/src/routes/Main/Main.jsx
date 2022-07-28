import React from 'react';
import { useState } from 'react';
import Lobby from '../../components/Lobby/Lobby';
import Game from '../../components/Game/Game';

export default function Main() {

	const [inGame, setInGame] = useState(false); 

	const moveToGame = (lobbyId) => {
		console.log('Game: ' + lobbyId);
		setInGame(true);
	}

	return (!inGame ? 
			<Lobby onJoin={moveToGame} /> :
			<Game />
	);
}
