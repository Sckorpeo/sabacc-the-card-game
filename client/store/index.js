import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducer/chatReducer';
import socketReducer from './reducer/socketReducer';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        socket: socketReducer,
    },
});
