import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    const response = await axios.get('/api/rooms');
    return response.data;
});

const roomSlice = createSlice({
    name: 'rooms',
    initialState: [],
    reducers: {
        addRoom(state, action) {
            state.push(action.payload);
        },
        removeRoom(state, action) {
            state = state.filter((item) => item.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state = action.payload;
        });
    },
});

export const { addRoom, removeRoom } = roomSlice.actions;
export { fetchRooms };
export default roomSlice.reducer;
