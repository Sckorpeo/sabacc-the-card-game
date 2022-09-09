import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
    name: 'game',
    initialState: { game: {} },
    reducers: {
        setGame(state, action) {
            state.game = action.payload;
        },
    },
});

export const { setGame } = gameSlice.actions;
export default gameSlice.reducer;
