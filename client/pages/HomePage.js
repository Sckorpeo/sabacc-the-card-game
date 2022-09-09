import React from 'react';
import MainPage from './MainPage';
import Chat from '../components/Chat';
import Lobby from '../components/Lobby';
import NavBar from '../components/NavBar';

const HomePage = () => {
    return (
        <>
            <NavBar />
            <MainPage>
                <Lobby />
                <Chat />
            </MainPage>
        </>
    );
};

export default HomePage;
