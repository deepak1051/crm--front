import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../utils/instance';

const createWork = createAsyncThunk(
  'work/create',
  async (userData, { rejectWithValue, getState, signal }) => {
    const state = getState();

    try {
      const { data } = await instance.post(
        `/work/${userData.id}`,
        { ...userData },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
          signal,
        }
      );

      console.log(data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const getWorkByEmployee = createAsyncThunk(
  'byEmployee/getWork',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/work/employee/${userData.id}`,

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

const getSingleWork = createAsyncThunk(
  'work/getSingle',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/work/${userData.id}`,

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      console.log(data?.data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const updateSingleWork = createAsyncThunk(
  'work/updateSingle',
  async (userData, { rejectWithValue, getState, signal }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/work/${userData.id}`,
        { ...userData },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
          signal,
        }
      );

      console.log(data?.data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const deleteSingleWork = createAsyncThunk(
  'work/deleteSingle',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.delete(
        `/work/${userData.workId}`,

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
         
        }
      );

      console.log(data);
      return data?.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export {
  createWork,
  getWorkByEmployee,
  getSingleWork,
  updateSingleWork,
  deleteSingleWork,
};
