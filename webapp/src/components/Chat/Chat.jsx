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
            if (chatData?.type == 'message') {
                setMessages(prev => [...prev, { fromYou: false, message: chatData.data.message }]);
                console.log(chatData.data.message)
            }
        }, [chatData]
    )

    function sendChatMessage() {
        sendMessage({ type: "sendMessage", data: { message: inputText }});
        setMessages(prev => [...prev, { fromYou: true, message: inputText }]);
        setInputText('');
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
                                (fromYou, message) => {
                                    return (
                                        <div className={`ChatMessage ${fromYou ? 'ChatYourMessage' : 'ChatOpponentMessage'}`}>{ message }</div>
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
        }, [chatData, inputText, messages]
    );
}

export default Chat;