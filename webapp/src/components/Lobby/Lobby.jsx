import './Lobby.css';
import TextareaAutosize from 'react-textarea-autosize';

import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';

import { ConnectorContext } from '../../Connector';

export default function Lobby({ setGameData }) {
  const { lobbyData, sendMessage } = useContext(ConnectorContext); 
  const [ allLobbies, setAllLobbies ] = useState([]);
  const [desc, setDesc] = useState('');
  const descEl = useRef(null);
  
  const createLobby = () => {
    sendMessage({type: 'openLobby', data: { lobbyName: descEl.current.value }});
  }
  const closeLobby = () => {
    sendMessage({type: 'closeLobby'});
  }

  const onJoin = (lobbyID) => {
    sendMessage({type: 'connectToLobby', data: {lobbyID}});
  }

  const hasMy = () => {
    return allLobbies.filter(el => {
      if(el.isMy)
        setDesc(el.lobbyName);
      return el.isMy;
    }).length !== 0;
  }

  useEffect(() => {
    switch(lobbyData?.type) {
      case 'allLobbies':
        setAllLobbies(lobbyData.data);
        break;
      case 'startGame':
      case 'createGame':
        setGameData(lobbyData?.data);
        break;
      default:
        break;
    }
  }, [lobbyData]);

  return useMemo(() => {
    return (
      <div className="lobby__container">
        {(!hasMy()) ? 
        <div className="create__lobby">
            <TextareaAutosize className="create__lobby__description" 
              placeholder="Description" ref={descEl}/>
            <button className="create__lobby__btn" onClick={createLobby}>Create lobby</button>
        </div> : 
        <div className="wait__player">
          <div className="player__lobby__info">
            <div className="wait__title">Wait  other player connection to your lobby.</div>
            <div className="lobby__desc" id="lobbyDesc">Description: {desc}</div>
          </div>
          <button className="close__lobby" onClick={closeLobby}>X</button>
        </div>
        }
        <div className="open__lobbies">
          {allLobbies.map(({ lobbyID, userName, lobbyName, isMy }) => {
            return (<div className="lobby__info" key={lobbyID}>
              <div className="lobby__info__desc">
                <div className="username">{userName}</div>
                <div className="lobbyname">{lobbyName}</div>
              </div>
              {(!isMy) ?
                <button className="lobby__info__btn" onClick={() => onJoin(lobbyID)}>
                  Play
               </button> : ''}
            </div>
            );
          })}
        </div>
      </div>
    );
  }, [descEl, allLobbies]);
}
