import React, { useContext, useEffect, useMemo, useState } from "react";
import { ConnectorContext } from "../../Connector";

import './Chat.css'

function Chat() {
    const { chatData, sendMessage } = useContext(ConnectorContext);
    const [ inputText, setInputText ] = useState('');
    const [ messages, setMessages ] = useState([]);

    useEffect(
        () => {
            console.log(chatData);
            if (chatData.type == 'message') {
                setMessages(prev => [...prev, chatData.data.message]);
                console.log(chatData.data.message)
            }
        }, [chatData]
    )

    function sendChatMessage() {
        sendMessage(JSON.parse(inputText));
        setMessages(prev => [...prev, inputText]);
        console.log(JSON.parse(inputText));
        // setInputText('');
    }

    function handleChange(event) {
        setInputText(event.target.value);
    }

    return useMemo(
        () => {
            return (
                <div className="ChatContainer">
                    <div className="ChatMessages">
                        {
                            messages.map(
                                (message) => {
                                    return (
                                        <div className="ChatMessage">{ message }</div>
                                    );
                                }
                            )
                        }
                    </div>
                    <div className="ChatInputContainer">
                        <input onChange={handleChange} value={inputText} type="text" className="ChatTextInput" />
                        <button onClick={sendChatMessage} className="ChatSendButton">Send</button>
                    </div>
                </div>
            )
        }, [chatData, inputText]
    );
}

export default Chat;