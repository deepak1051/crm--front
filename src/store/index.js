import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { adminReducer } from './slices/adminSlice';
import { employeeReducer } from './slices/employeeSlice';
import { workReducer } from './slices/workSlice';
import { chatReducer } from './slices/chatSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    employee: employeeReducer,
    work: workReducer,
    chat: chatReducer,
  },
});

export { store };
export * from './slices/authSlice';
export * from './slices/adminSlice';
export * from './thunks/authDetails';
export * from './thunks/admin';
export * from './thunks/employee';
export * from './slices/employeeSlice';
export * from './thunks/work';
export * from './slices/chatSlice';
export * from './thunks/chat';
