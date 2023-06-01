import { createSlice } from '@reduxjs/toolkit';
import { getAllMessages, getRoom } from '../thunks/chat';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isLoading: false,
    error: null,
    roomId: null,
    messages: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRoom.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomId = action.payload;
    });
    builder.addCase(getRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //message array
    builder.addCase(getAllMessages.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    });
    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const chatReducer = chatSlice.reducer;
