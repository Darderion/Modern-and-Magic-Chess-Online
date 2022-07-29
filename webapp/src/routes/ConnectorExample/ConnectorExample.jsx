import React, { useContext, useMemo } from 'react';
import { ConnectorContext } from '../../Connector';
import Chat from '../../components/Chat/Chat';

export default function ConnectorExample() {
    const { lobbyData, chatData, sendMessage } = useContext(ConnectorContext);

    function callback() {
        sendMessage({ "type": "allLobbies" });
    }

    return useMemo(
        () => {
            return (
                <div>
                    <h1>Connector Example</h1>
                    <div>{JSON.stringify(lobbyData)}</div>
                    <button onClick={callback}>Subscribe</button>
                    <div style={{height: '200px', width: '200px'}}>
                        <Chat />
                    </div>
                </div>
            )
        }, [lobbyData, chatData]
    );
}
