import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../utils/instance';

const fetchAllCustomersRelatedToEmployee = createAsyncThunk(
  'fetchAllCustomers/RelatedToEmployee',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.get('/employee/customer', {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      });

      console.log(data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const AddNewCustomerByEmployee = createAsyncThunk(
  'byEmployee/addNewCustomer',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.post(
        '/employee/customer',
        {
          ...userData,
        },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      console.log(data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const getSingleCustomer = createAsyncThunk(
  'customer/getSingle',
  async ({ id }, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.get(`/customer/${id}`, {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      });

      console.log(data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const updateSingleCustomerByEmployee = createAsyncThunk(
  'customer/updateSingle',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.patch(
        `employee/customer/${userData.id}`,
        { ...userData },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      console.log(data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const deleteSingleCustomer = createAsyncThunk(
  'customer/deleteSingle',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.delete(
        `/employee/customer/${userData.id}`,

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      console.log(data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const updatePassword = createAsyncThunk(
  'password/update',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.patch(
        `/employee/updatePassword`,
        { ...userData },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      console.log(data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export {
  fetchAllCustomersRelatedToEmployee,
  AddNewCustomerByEmployee,
  getSingleCustomer,
  updateSingleCustomerByEmployee,
  deleteSingleCustomer,
  updatePassword,
};
