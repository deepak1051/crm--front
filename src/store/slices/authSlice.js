import { createSlice } from '@reduxjs/toolkit';
import { adminLogin, authLogin, authSignup } from '../thunks/authDetails';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    id: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state, action) {
      localStorage.removeItem('token');
      state.token = null;
    },
    changeId(state, action) {
      state.id = action.payload;
    },
  },
  extraReducers(builder) {
    //FIXME:  login
    // builder.addCase(authLogin.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(authLogin.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isLoggedIn = true;
    //   state.error = null;
    //   state.token = action.payload;
    // });
    // builder.addCase(authLogin.rejected, (state, action) => {
    //   state.isLoading = false;

    //   state.error = action.payload;
    // });

    //TODO:  signup
    // builder.addCase(authSignup.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(authSignup.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isLoggedIn = true;
    //   state.token = action.payload;
    //   state.error = null;
    // });
    // builder.addCase(authSignup.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });

    //TODO: admin login
    builder.addCase(adminLogin.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logout, changeId } = authSlice.actions;
