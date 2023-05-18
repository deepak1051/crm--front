import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCustomers,
  fetchAllEmployees,
  fetchSingleCustomer,
  fetchSingleEmployee,
  getAllTask,
  getAllTaskByEmployee,
  getSingleTask,
} from '../thunks/admin';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    employeeList: [],
    customerList: [],
    singleEmployee: {},
    singleCustomer: {},
    singleTask: {},
    tasks: [],
    taskByEmployee: [],
    isLoading: false,
    error: null,
    isSingleTaskLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllEmployees.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employeeList = action.payload.data.filter(
        (p) => p.roles !== 'admin'
      );
    });
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //fetching customers data
    builder.addCase(fetchAllCustomers.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCustomers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customerList = action.payload.data.filter(
        (p) => p.roles !== 'admin'
      );
    });
    builder.addCase(fetchAllCustomers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //fetching single employee
    builder.addCase(fetchSingleEmployee.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleEmployee = action.payload;
    });
    builder.addCase(fetchSingleEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //fetch single customer
    builder.addCase(fetchSingleCustomer.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleCustomer = action.payload;
    });
    builder.addCase(fetchSingleCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //get all task
    builder.addCase(getAllTask.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(getAllTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //get task by single employee
    builder.addCase(getAllTaskByEmployee.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllTaskByEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.taskByEmployee = action.payload;
    });
    builder.addCase(getAllTaskByEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //single task by employee
    builder.addCase(getSingleTask.pending, (state, action) => {
      state.isSingleTaskLoading = true;
      state.error = null;
    });
    builder.addCase(getSingleTask.fulfilled, (state, action) => {
      state.isSingleTaskLoading = false;
      const filteredTeammates = action.payload.teamMate.filter(
        (teammate) => teammate._id !== action.payload.employeeId
      );
      const filteredTask = { ...action.payload, teamMate: filteredTeammates };
      state.singleTask = filteredTask;
    });
    builder.addCase(getSingleTask.rejected, (state, action) => {
      state.isSingleTaskLoading = false;
      state.error = action.payload;
    });
  },
});

export const adminReducer = adminSlice.reducer;
