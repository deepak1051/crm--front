import { createAsyncThunk } from '@reduxjs/toolkit';

import instance from '../../utils/instance';

const pause = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timer);
  });
};

const fetchAllEmployees = createAsyncThunk(
  'fetch/employees',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.get('/employee', {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      });

      await pause(2000);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const fetchAllCustomers = createAsyncThunk(
  'fetch/customers',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const { data } = await instance.get('/customer', {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      });

      await pause(1000);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const addNewEmployee = createAsyncThunk(
  'add/employees',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.post(
        '/employee',
        {
          ...userData,
        },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const addNewCustomer = createAsyncThunk(
  'add/customer',
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

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const fetchSingleEmployee = createAsyncThunk(
  'fetch/SingleEmployee',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/employee/${userData.id}`,

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      await pause(2000);

      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const fetchSingleCustomer = createAsyncThunk(
  'fetch/SingleCustomer',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/customer/${userData.id}`,

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

const updateEmployee = createAsyncThunk(
  'update/employee',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/employee/${userData.id}`,
        {
          ...userData,
        },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const updateCustomer = createAsyncThunk(
  'update/customer',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/customer/${userData.id}`,
        {
          ...userData,
        },
        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const deleteEmployee = createAsyncThunk(
  'delete/employee',
  async ({ id }, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.delete(
        `/employee/${id}`,

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const deleteCustomer = createAsyncThunk(
  'delete/customer',
  async ({ id }, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.delete(
        `/employee/customer/${id}`,

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const getAllTask = createAsyncThunk(
  'task/getAll',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(`/admin/getalltask`, {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      });

      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const addNewTask = createAsyncThunk(
  'newTask/add',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.post(
        `/employee/${userData.id}/addTask`,
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

const getAllTaskByEmployee = createAsyncThunk(
  'taskByEmployee/getAll',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/employee/${userData.id}/getTask`,

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      await pause(2000);

      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const getSingleTask = createAsyncThunk(
  'task/getSingle',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.get(
        `/employee/${userData.employeeId}/getSingleTask/${userData.taskId}`, ///:employeeId/getSingleTask/:taskId

        {
          headers: {
            authorization: `Bearer ${state.auth.token}`,
          },
        }
      );

      return { ...data?.data, employeeId: userData.employeeId };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const updateTask = createAsyncThunk(
  'task/update',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/employee/${userData.employeeId}/updateTask/${userData.taskId}`, ///:employeeId/getSingleTask/:taskId
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

const deleteTask = createAsyncThunk(
  'task/update',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.delete(
        `/employee/${userData.employeeId}/updateTask/${userData.taskId}`, ///:employeeId/getSingleTask/:taskId

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

const addTeammate = createAsyncThunk(
  'teammate/add',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/employee/${userData.currentEmployeeId}/addTeamMate/${userData.taskId}`, //:employeeId/getSingleTask/:taskId
        { employeeId: userData.employeeId },
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

const removeTeammate = createAsyncThunk(
  'teammate/remove',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await instance.patch(
        `/employee/${userData.currentEmployeeId}/removeTeamMate/${userData.taskId}`, //:employeeId/getSingleTask/:taskId
        { employeeId: userData.employeeId },
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

///:employeeId/addTeamMate/:taskId

export {
  fetchAllEmployees,
  addNewEmployee,
  addNewCustomer,
  fetchAllCustomers,
  fetchSingleEmployee,
  fetchSingleCustomer,
  updateEmployee,
  updateCustomer,
  deleteEmployee,
  deleteCustomer,
  getAllTask,
  addNewTask,
  getAllTaskByEmployee,
  getSingleTask,
  deleteTask,
  updateTask,
  addTeammate,
  removeTeammate,
};
