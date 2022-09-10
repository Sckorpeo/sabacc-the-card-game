import React, { useEffect } from 'react';
import '../styles/Chat.css';
import { useSelector, useDispatch } from 'react-redux';

import { addMsg } from '../store/reducer/chatReducer';

const Chat = () => {
    const dispatch = useDispatch();

    function handleSubmit(ev) {
        ev.preventDefault();
        const username = window.localStorage.getItem('username');
        dispatch(addMsg({ username, message: ev.target.msg.value }));
        window.socket.emit('message', ev.target.msg.value, username);
        ev.target.msg.value = '';
    }
    useEffect(() => {
        window.socket.on('messageRec', (message) => {
            dispatch(addMsg(message));
        });
    }, []);

    const { chat } = useSelector((state) => state);

    useEffect(() => {
        const lis = document.getElementsByTagName('li');
        lis[lis.length - 1]?.scrollIntoView();
    }, [chat]);
    return (
        <div className="Chat">
            <ul className="Chat-messages" id="chat">
                {chat.map((msg, i) => (
                    <li
                        key={i}
                        className={
                            msg.username ===
                            window.localStorage.getItem('username')
                                ? 'Chatter'
                                : null
                        }
                    >
                        {msg.username}: {msg.message}
                    </li>
                ))}
            </ul>
            <form className="Chat-form" onSubmit={handleSubmit}>
                <input className="Chat-input" type="text" name="msg" />
                <button>Send</button>
            </form>
        </div>
    );
};

export default Chat;
