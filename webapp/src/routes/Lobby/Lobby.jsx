import React from 'react';
import './Lobby.css';

export default function Main({ lobbies }) {
  const playGame = (lobbyId) => {
    console.log('Join lobby = ' + lobbyId);
  }
	return (
		<div className="lobby__container">
      <div className="open__lobbies">
        {lobbies.map(({id, userName, lobbyName}) => {
          return (<div className="lobby__info" key={id}>
            <div className="lobby__info__desc">
              <div className="username">{userName}</div>
              <div className="lobbyname">{lobbyName}</div>
            </div>
            <button className="lobby__info__btn" onClick={() => playGame(id)}>
                Играть
             </button>
          </div>
          );
        })}
      </div>
    </div>
	);
}
