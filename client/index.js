// External Package Imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { store } from './store';

import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import Chat from './components/Chat';

import './styles/App.css';

const App = () => {
    return (
        <div>
            <NavBar />
            <MainPage>
                <div>Hello World</div>
                <Chat />
            </MainPage>
        </div>
    );
};

const root = createRoot(document.querySelector('#root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
