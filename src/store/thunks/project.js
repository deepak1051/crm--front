import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../utils/instance';

const createProject = createAsyncThunk(
  'project/create',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.post(
        `/project`,
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

const getAllProjectByEmployee = createAsyncThunk(
  'projectByEmployee/getAll',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/project/employee`,

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

const getSingleProject = createAsyncThunk(
  'project/getSingle',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/project/${userData.id}`,

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

const updateSingleProject = createAsyncThunk(
  'project/updateSingle',
  async (userData, { rejectWithValue, getState, signal }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/project/${userData.id}`,
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

const deleteSingleProject = createAsyncThunk(
  'project/deleteSingle',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.delete(
        `/project/${userData.id}`,

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

// get all work
const getAllProject = createAsyncThunk(
  'allProject/get',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.get(`/project`, {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      });

      console.log(data);
      return data?.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export {
  createProject,
  getAllProjectByEmployee,
  getSingleProject,
  updateSingleProject,
  deleteSingleProject,
  getAllProject,
};
