import './Lobby.css';
import TextareaAutosize from 'react-textarea-autosize';

import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';

import { ConnectorContext } from '../../Connector';

export default function Lobby({ setGameData }) {
  const { lobbyData, sendMessage } = useContext(ConnectorContext);
  const [ lobby, setLobby ] = useState({id: undefined, desc: ''});  
  const [ allLobbies, setAllLobbies ] = useState([]);
  const descEl = useRef(null);

  const sendAllLobbiesMessage = () => {
    try {
      sendMessage({ type: 'allLobbies' });
    } catch (err) {
      setTimeout(sendAllLobbiesMessage, 50);
    }
  }
  
  useEffect(sendAllLobbiesMessage, []);

  const createLobby = () => {
    sendMessage({type: 'openLobby', data: { lobbyName: descEl.current.value }});
  }
  const closeLobby = () => {
    sendMessage({type: 'closeLobby'});
    setLobby(() => {
      return {id: undefined, desc: ''}
    });
  }

  const onJoin = (lobbyID) => {
    sendMessage({type: 'connectToLobby', data: {lobbyID}});
  }

  useEffect(() => {
    switch(lobbyData?.type) {
      case 'allLobbies':
        setAllLobbies(lobbyData.data);
        break;
      case 'openLobby':
        if(lobbyData?.data?.lobbyID)
          setLobby(prev => {
            return {id: lobbyData?.data?.lobbyID, desc: lobbyData?.data?.lobbyName }
          });
        break;
      case 'startGame':
        setGameData(lobbyData?.data);
        break;
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
              {(lobbyID !== lobby.id) ?
                <button className="lobby__info__btn" onClick={() => onJoin(lobbyID)}>
                  Play
               </button> : ''
            }
            </div>
            );
          })}
        </div>
      </div>
    );
  }, [descEl, allLobbies]);
}
