import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCustomersRelatedToEmployee,
  getSingleCustomer,
} from '../thunks/employee';

const adminSlice = createSlice({
  name: 'employee',
  initialState: {
    employeeCustomerList: [],
    isLoading: false,
    error: null,
    singleCustomer: {},
    tasks: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchAllCustomersRelatedToEmployee.pending,
      (state, action) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    builder.addCase(
      fetchAllCustomersRelatedToEmployee.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.employeeCustomerList = action.payload;
      }
    );
    builder.addCase(
      fetchAllCustomersRelatedToEmployee.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    //single customer detail
    builder.addCase(getSingleCustomer.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSingleCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleCustomer = action.payload;
    });
    builder.addCase(getSingleCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const employeeReducer = adminSlice.reducer;
