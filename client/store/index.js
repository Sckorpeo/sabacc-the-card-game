import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducer/chatReducer';
import socketReducer from './reducer/socketReducer';
import usersReducer from './reducer/usersReducer';
import roomsReducer from './reducer/roomsReducer';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        socket: socketReducer,
        users: usersReducer,
        rooms: roomsReducer,
    },
});
