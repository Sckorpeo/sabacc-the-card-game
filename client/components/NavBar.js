import React from 'react';
import '../styles/NavBar.css';

import Username from './Username';

const NavBar = () => {
    return (
        <nav className="NavBar">
            <div>Home</div>
            <div>Chat</div>
            <Username />
        </nav>
    );
};

export default NavBar;
