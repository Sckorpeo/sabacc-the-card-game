import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: { online: {} },
    reducers: {
        setUsers(state, action) {
            const newState = action.payload;
            state.online = newState;
        },
    },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
