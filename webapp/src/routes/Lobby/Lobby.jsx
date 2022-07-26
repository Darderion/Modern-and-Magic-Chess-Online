import React from 'react';
import './Lobby.css';

export default function Main(props) {
  const playGame = (lobbyId) => {
    console.log('Join lobby = ' + lobbyId);
  }
	return (
		<div className="lobby__container">
      <div className="open__lobbies">
        {props.lobbies.map(({id, username, lobbyname}) => {
          return (<div className="lobby__info" key={id}>
            <div className="lobby__info__desc">
              <div className="username">{username}</div>
              <div className="lobbyname">{lobbyname}</div>
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