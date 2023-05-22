import { createAsyncThunk } from '@reduxjs/toolkit';

import instance from '../../utils/instance';

const adminLogin = createAsyncThunk(
  'admin/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/admin/login', {
        email: userData.email,
        password: userData.password,
      });
      console.log(data);
      localStorage.setItem('token', data.token);
      return data.token;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authLogin = createAsyncThunk(
  'admin/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/employee/login', {
        email: userData.email,
        password: userData.password,
      });

      console.log(data);
      localStorage.setItem('token', data.token);
      return data.token;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export { adminLogin, authLogin };
