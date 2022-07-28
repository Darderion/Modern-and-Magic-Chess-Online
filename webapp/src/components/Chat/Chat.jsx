import React, { useContext, useEffect, useMemo, useState } from "react";
import { ConnectorContext } from "../../Connector";

function Chat() {
    const { chatData, sendMessage } = useContext(ConnectorContext);
    const [inputText, setInputText] = useState('');

    useEffect(
        () => {

        }, [chatData]
    )

    function sendChatMessage() {
        sendMessage({ type: 'sendMessage', message: inputText });
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