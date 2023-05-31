import { createSlice } from '@reduxjs/toolkit';
import { getSingleWork, getWorkByEmployee } from '../thunks/work';

const workSlice = createSlice({
  name: 'work',
  initialState: {
    workListByEmployee: [],
    singleWorkDetailByEmployee: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getWorkByEmployee.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getWorkByEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.workListByEmployee = action.payload;
    });
    builder.addCase(getWorkByEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //TODO: single work detail...
    builder.addCase(getSingleWork.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSingleWork.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleWorkDetailByEmployee = action.payload;
    });
    builder.addCase(getSingleWork.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const workReducer = workSlice.reducer;
