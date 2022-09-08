import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    const response = await axios.get('/api/rooms');
    return response.data;
});

const createRoom = createAsyncThunk('rooms/createRoom', async (room) => {
    const response = await axios.post('/api/rooms', room);
    return response.data;
});

const roomSlice = createSlice({
    name: 'rooms',
    initialState: { rooms: [] },
    reducers: {
        setRooms(state, action) {
            state.rooms = action.payload;
        },
        addRoom(state, action) {
            state.rooms.push(action.payload);
        },
        removeRoom(state, action) {
            state.rooms = state.rooms.filter(
                (item) => item.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.rooms = action.payload;
        });
        builder.addCase(createRoom.fulfilled, (state, action) => {
            state.rooms.push(action.payload);
            window.socket.emit('newRoom');
        });
    },
});

export const { addRoom, removeRoom, setRooms } = roomSlice.actions;
export { fetchRooms, createRoom };
export default roomSlice.reducer;
