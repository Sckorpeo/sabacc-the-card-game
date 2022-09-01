// External Package Imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';

const url = window.location.origin;
const socket = io.connect(url);

const App = () => {
    return <div>Hello World</div>;
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
