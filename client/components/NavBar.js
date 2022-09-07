import React, { useEffect } from 'react';
import '../styles/NavBar.css';
import { useDispatch, useSelector } from 'react-redux';

import { setUsers } from '../store/reducer/usersReducer';

import Username from './Username';

const NavBar = () => {
    const dispatch = useDispatch();
    const { online } = useSelector((state) => state.users);
    useEffect(() => {
        window.socket.on('onlineUsers', (onlineUsers) => {
            dispatch(setUsers(onlineUsers));
        });
    }, []);
    return (
        <nav className="NavBar">
            <div>Home</div>
            <div>Online ({Object.keys(online).length})</div>
            <Username />
        </nav>
    );
};

export default NavBar;
