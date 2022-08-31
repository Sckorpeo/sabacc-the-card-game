// External Package Imports
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return <div>Hello World</div>;
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
