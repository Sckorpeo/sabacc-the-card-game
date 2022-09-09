// External Package Imports
import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';

import { setRooms } from './store/reducer/roomsReducer';

import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

import './styles/App.css';

import { generateRandomUsername } from './utils/username';

window.socket = io.connect();

if (!window.localStorage.getItem('username')) {
    window.localStorage.setItem('username', generateRandomUsername('Guest', 5));
}

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const username = window.localStorage.getItem('username');
        window.socket.emit('user-joined', username);
    }, []);
    useEffect(() => {
        window.socket.on('roomsUpdate', (rooms) => {
            console.log('Received', { rooms });
            dispatch(setRooms(rooms));
        });
    }, []);
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:roomId" element={<GamePage />} />
            </Routes>
        </div>
    );
};

const root = createRoot(document.querySelector('#root'));
root.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);
