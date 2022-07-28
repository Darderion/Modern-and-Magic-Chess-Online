import './Lobby.css';
import TextareaAutosize from 'react-textarea-autosize';

import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';

import { ConnectorContext } from '../../Connector';

export default function Lobby() {
  const { lobbyData, sendMessage } = useContext(ConnectorContext);
  const [ lobby, setLobby ] = useState({id: undefined, desc: ''});  
  const [ allLobbies, setAllLobbies ] = useState([]);
  const descEl = useRef(null);

  useEffect(() => {
    try{
      sendMessage({type: 'allLobbies'});
    } catch(err) {
      setTimeout(() => sendMessage({type: 'allLobbies'}), 1000);
    }
    
  }, []);

  const playGame = (lobbyId) => {
    console.log('Join lobby = ' + lobbyId);
  }
  const createLobby = () => {
    sendMessage({type: 'openLobby', data: { lobbyName: descEl.current.value }});
    setLobby(() => {
      return {id: 1, desc: descEl.current.value}
    });
  }
  const closeLobby = () => {
    sendMessage({type: 'closeLobby'});
    setLobby(() => {
      return {id: undefined, desc: ''}
    });
  }

  return useMemo(() => {
    switch(lobbyData?.type) {
      case 'allLobbies':
        setAllLobbies(lobbyData.data);
        break;
      case 'openLobby':
        if(lobbyData?.data?.lobbyID)
          setLobby(prev => {
            return {...prev, id: lobbyData?.data?.lobbyID}
          });
        break;
      default:
        break;
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
            <div className="wait__title">Wait  other player connection to your lobby.</div>
            <div className="lobby__desc" id="lobbyDesc">Description: {lobby.desc}</div>
          </div>
          <button className="close__lobby" onClick={closeLobby}>X</button>
        </div>
        }
        <div className="open__lobbies">
          {allLobbies.map(({lobbyID, userName, lobbyName}) => {
            return (<div className="lobby__info" key={lobbyID}>
              <div className="lobby__info__desc">
                <div className="username">{userName}</div>
                <div className="lobbyname">{lobbyName}</div>
              </div>
              <button className="lobby__info__btn" onClick={() => playGame(lobbyID)}>
                Play
             </button>
            </div>
            );
          })}
        </div>
      </div>
    );
  }, [lobbyData, descEl, allLobbies]);
}
