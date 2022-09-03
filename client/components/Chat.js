import React from 'react';
import '../styles/Chat.css';

const url = window.location.origin;
const socket = io.connect(url);

function handleSubmit(ev) {
    ev.preventDefault();
    socket.emit('message', ev.target.msg.value, socket.id);
    ev.target.msg.value = '';
}

const Chat = () => {
    return (
        <div className="Chat">
            <ul className="Chat-messages"></ul>
            <form className="Chat-form" onSubmit={handleSubmit}>
                <input className="Chat-input" type="text" name="msg" />
                <button>Send</button>
            </form>
        </div>
    );
};

export default Chat;
