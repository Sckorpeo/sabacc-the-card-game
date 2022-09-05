import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name: 'socket',
    initialState: {},
    reducers: {
        setSocket(state, action) {
            state = action.payload;
        },
        closeSocket(state, action) {
            state = {};
        },
    },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
