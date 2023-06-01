import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../utils/instance';

const getRoom = createAsyncThunk(
  'room/get',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/chat/publicRoom`,

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      return data?.data?._id;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const addUserToRoom = createAsyncThunk(
  'addUser/ToRoom',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/chat/publicRoom`,
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

const getAllMessages = createAsyncThunk(
  'messages/getAll',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    console.log(userData);
    try {
      const { data } = await instance.post(
        `/chat/getAllMessage`,
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
      console.log('err', err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const sendMessage = createAsyncThunk(
  'message/send',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.post(
        `/chat/message`,
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

const deleteMessage = createAsyncThunk(
  'message/delete',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/chat/deleteMessage`,
        { ...userData },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export { getRoom, addUserToRoom, sendMessage, getAllMessages, deleteMessage };
