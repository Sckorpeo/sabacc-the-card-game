import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: [],
    reducers: {
        setChat(state, action) {
            state = [...action.payload];
        },
    },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
