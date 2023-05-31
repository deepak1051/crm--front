import { createSlice } from '@reduxjs/toolkit';
import {
  getAllProject,
  getAllProjectByEmployee,
  getSingleProject,
} from '../thunks/project';

const projectSlice = createSlice({
  name: 'work',
  initialState: {
    allWorkByEmployee: [],
    isLoading: false,
    error: null,
    singleProject: {},
    allWork: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllProjectByEmployee.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllProjectByEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allWorkByEmployee = action.payload;
    });
    builder.addCase(getAllProjectByEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //get single project
    builder.addCase(getSingleProject.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSingleProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProject = action.payload;
    });
    builder.addCase(getSingleProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //all work

    builder.addCase(getAllProject.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allWork = action.payload;
    });
    builder.addCase(getAllProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const projectReducer = projectSlice.reducer;
