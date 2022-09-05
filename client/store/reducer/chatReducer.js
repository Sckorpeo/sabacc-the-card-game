import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: [],
    reducers: {
        setChat(state, action) {
            state = [...action.payload];
        },
        addMsg(state, action) {
            state.push(action.payload);
        },
    },
});

export const { setChat, addMsg } = chatSlice.actions;
export default chatSlice.reducer;
