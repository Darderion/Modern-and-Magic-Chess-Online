import React, { useEffect, useState, useRef } from 'react';

import config from './config/index'

const ConnectorContext = React.createContext();

function Connector(props) {
    const ws = useRef(null);

    const [chatData, setChatData] = useState({});
    const [boardData, setBoardData] = useState({});
    const [lobbyData, setLobbyData] = useState({});
    const [generalData, setGeneralData] = useState({});

    const webSocketMessageTypes = [
        [setChatData,
            ['sendMessage', 'message']],
        [setBoardData,
            ['myStep', 'otherStep', 'closeGame']],
        [setLobbyData,
            [
                'allLobbies',
                'unsubAllLobbies',
                'openLobby',
                'closeLobby',
                'connectToLobby',
            ],
        ],
    ];

    function connect() {
        // TODO get url from config file
        // console.log(config);
        ws.current = new WebSocket("ws://localhost:5000/main");
        ws.current.onopen = onOpen;
        ws.current.onclose = onClose;
        ws.current.onmessage = onMessage;
        ws.current.onerror = onError;
    }

    function onOpen(event) {
        setGeneralData({ status: "opened" })
    }

    function reset(event) {
        webSocketMessageTypes.forEach(([setData]) => setData({}));
    }

    function onClose(event) {
        reset();
        setGeneralData({ status: "closed" })
        
        setTimeout(() => { connect(); }, 5000)
    }

    function onMessage(event) {
        console.log(event);
        if (event.data) {
            const data = JSON.parse(event.data);
            const { type } = data;
            const value = webSocketMessageTypes.find(([_, types]) =>
                types.includes(type),
            );
            const setData = value ? value[0] : setGeneralData;
            setData(data);
        }
    }

    function onError(error) {
        console.error(error);
        setGeneralData({ status: "error" })
    }

    useEffect(connect, []);

    function sendMessage(message) {
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
