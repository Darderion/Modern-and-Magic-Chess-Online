import React from 'react';
import { useState } from 'react';
import Lobby from '../../components/Lobby/Lobby';
import Game from '../../components/Game/Game';

export default function Main() {
	const [gameData, setGameData] = useState(undefined);

	const joinLobby = (lobbyId) => {
		console.log('Game: ' + lobbyId);
		// TODO send req to server and wait answer
	}

	return (!gameData ? 
			<Lobby onJoin={joinLobby} setGameData={setGameData} /> :
			<Game startData={'Some start data'}/>
	);
}
