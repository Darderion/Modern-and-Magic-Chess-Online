import React from 'react';
import './Lobby.css';
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { useRef } from 'react';

export default function Main({ lobbies }) {
  const [ lobby, setLobby ] = useState({id: 10, desc: 'TestTestTestTestTestTest dasgh dgsha gd hsg ahfsdg hfjdsa ghjf sgadhjfg shadgf hsadgh fsdagh fsgadh jfasgdj ghj'});
  const playGame = (lobbyId) => {
    console.log('Join lobby = ' + lobbyId);
  }

  const descEl = useRef(null);

  const createLobby = () => {
    // TODO send desc on server;
    setLobby(() => {
      return {id: 1, desc: descEl.current.value}
    });
  }
  const closeLobby = () => {
    //send Toserver lobbyID
    setLobby(() => {
      return {id: undefined, desc: ''}
    });
  }

	return (
		<div className="lobby__container">
      { !(lobby.id + 1) ? 
      <div className="create__lobby">
        <TextareaAutosize className="create__lobby__description" 
          placeholder="Description" ref={descEl}/>
        <button className="create__lobby__btn" onClick={createLobby}>Create lobby</button>
      </div> : 
      <div className="wait__player">
        <div className="player__lobby__info">
          <div className="wait__title">Wait other player connection to your lobby.</div>
          <div className="lobby__desc" id="lobbyDesc">Description: {lobby.desc}</div>
        </div>
        <button className="close__lobby" onClick={closeLobby}>X</button>
      </div>
      }
      <div className="open__lobbies">
        {lobbies.map(({id, userName, lobbyName}) => {
          return (<div className="lobby__info" key={id}>
            <div className="lobby__info__desc">
              <div className="username">{userName}</div>
              <div className="lobbyname">{lobbyName}</div>
            </div>
            <button className="lobby__info__btn" onClick={() => playGame(id)}>
              Play
           </button>
          </div>
          );
        })}
      </div>
    </div>
	);
}
