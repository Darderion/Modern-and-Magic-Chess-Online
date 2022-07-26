import React, { useEffect, useState, useRef } from 'react';

const ConnectorContext = React.createContext();
const ChatTypes = [];
const BoardTypes = ['myStep', 'otherStep', 'closeGame'];
const LobbyTypes = ['allLobbies', 'unsubAllLobbies', 'openLobby', 'closeLobby', 'connectToLobby'];

function Connector(props) {
    const ws = useRef(null);
    const [chatData, setChatData] = useState({});
    const [boardData, setBoardData] = useState({});
    const [lobbyData, setLobbyData] = useState({});
    const [generalData, setGeneralData] = useState({});

    function connect() {
        ws.current = new WebSocket("ws://localhost:5000/main");
        ws.current.onopen = onOpen;
        ws.current.onclose = onClose;
        ws.current.onmessage = onMessage;
        ws.current.onerror = onError;
    }

    function onOpen(event) {
        // console.log(event);
        // setGeneralData(event);
    }

    function onClose(event) {
        // console.log(event);
        // setGeneralData(event);
        setChatData({});
        setBoardData({});
        setLobbyData({});
        setGeneralData({});
        setTimeout(() => { connect(); }, 5000)
    }

    function onMessage(event) {
        console.log(event);
        if (event.data) {
            const data = JSON.parse(event.data);
            const dataType = data.type;
            if (ChatTypes.includes(dataType)) {
                setChatData(data);
            } else if (BoardTypes.includes(dataType)) {
                setBoardData(data);
            } else if (LobbyTypes.includes(dataType)) {
                setLobbyData(data);
            } else {
                setGeneralData(data);
            }
        }
    }

    function onError(error) {
        console.error(error);
        // setGeneralData(error);
    }

    useEffect(
        () => {
            connect();
        }, []
    );

    function sendMessage(message) {
        // console.log(message);
        if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message || {}));
        }
    }

    const outvalue = {
        chatData,
        boardData,
        lobbyData,
        generalData,
        sendMessage
    }

    return (
        <ConnectorContext.Provider value={outvalue}>
            {props.children}
        </ConnectorContext.Provider>
    );
}

export { Connector, ConnectorContext };