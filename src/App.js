import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeId } from './store';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import AdminDashboard from './admin-page/AdminDashboard';

import EmployeeLogin from './auth/login/EmployeeLogin';

import WebsiteHomepage from './admin-page/WebsiteHomepage';

import AdminAddEmployee from './admin-page/add/AdminAddEmployee';

import AdminAddCustomer from './admin-page/add/AdminAddCustomer';

import AdminEmployeeList from './admin-page/list/AdminEmployeeList';

import AdminCustomerList from './admin-page/list/AdminCustomerList';

import AdminSingleCustomer from './admin-page/single/AdminSingleCustomer';

import AdminSingleCustomerUpdate from './admin-page/update/AdminSingleCustomerUpdate';

import AdminSingleEmployee from './admin-page/single/AdminSingleEmployee';

import AdminSingleEmployeeUpdate from './admin-page/update/AdminSingleEmployeeUpdate';

import Navbar from './components/navbar/Navbar';
import EmployeeDashboard from './employee-page/EmployeeDashboard';

import EmployeeSidebar from './employee-page/util/EmployeeSidebar';

import EmployeeCustomerList from './employee-page/list/EmployeeCustomerList';

import EmployeeAddCustomer from './employee-page/add/EmployeeAddCustomer';

import EmployeeSingleCustomer from './employee-page/single/EmployeeSingleCustomer';

import AllTask from './admin-page/task/AllTask';
import SingleTask from './admin-page/task/SingleTask';
import AddNewTask from './admin-page/task/AddNewTask';

import UpdateTask from './admin-page/task/UpdateTask';
import UpdateSingleCustomer from './employee-page/update/UpdateSingleCustomer';

import GetAllTaskByEmployee from './employee-page/task/GetAllTaskByEmployee';

import GetSingleTaskByEmployee from './employee-page/task/GetSingleTaskByEmployee';

import UpdatePassword from './employee-page/profile/UpdatePassword';

import AdminSidebar from './admin-page/AdminSidebar';
import EditorTask from './employee-page/calender-task/EditorTask';

import DailyTasks from './employee-page/calender-task/DailyTasks';

import SingleDailyTask from './employee-page/calender-task/SingleDailyTask';

import EditWork from './employee-page/calender-task/EditWork';
import UpdateSingleWork from './admin-page/employee-work/UpdateSingleWork';

import SingleWork from './admin-page/employee-work/SingleWork';

import EmployeeProfile from './employee-page/profile/EmployeeProfile';

import AdminLogin from './auth/login/AdminLogin';
import ResetPassword from './employee-page/password/ResetPassword';
import PasswordRedirectPage from './employee-page/password/PasswordRedirectPage';
import ConfirmEmail from './employee-page/confirm-email/ConfirmEmail';

function App() {
  const [role, setRole] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const { role, id } = jwtDecode(token);
      setRole(role);
      dispatch(changeId(id));
    }
  }, [token, role, dispatch]);

  if (role === 'Admin') {
    return (
      <BrowserRouter>
        <div className="home">
          <AdminSidebar />
          <div className="homeContainer">
            <Navbar />
            <Routes>
              <Route element={<AdminDashboard />} path="/admin/dashboard" />
              <Route
                element={<AdminEmployeeList />}
                path="/admin/employees-list"
              />
              <Route
                element={<AdminCustomerList />}
                path="/admin/customers-list"
              />

              <Route element={<AllTask />} path="/admin/projects" />
              <Route
                element={<SingleTask />}
                path="/admin/:employeeId/task/:taskId"
              />
              <Route element={<AddNewTask />} path="/admin/:id/addTask" />
              <Route
                element={<UpdateTask />}
                path="/admin/:employeeId/updateTask/:taskId"
              />
              <Route
                element={<AdminAddEmployee />}
                path="/admin/add-employee"
              />
              <Route
                element={<AdminAddCustomer />}
                path="/admin/add-customer"
              />
              <Route
                element={<AdminSingleCustomer />}
                path="/admin/customers/:id"
              />
              <Route
                element={<AdminSingleCustomerUpdate />}
                path="/admin/customers/:id/update"
              />

              <Route
                element={<AdminSingleEmployee />}
                path="/admin/employees/:id"
              />
              <Route
                element={<AdminSingleEmployeeUpdate />}
                path="/admin/employees/:id/update"
              />
              <Route
                element={<AdminSingleCustomerUpdate />}
                path="/admin/customers/:id/update"
              />
              {/* task route */}
              <Route
                element={<UpdateSingleWork />}
                path="/admin/:employeeId/daily-tasks/:id/update"
              />

              <Route
                element={<SingleWork />}
                path="/admin/:employeeId/daily-tasks/:id"
              />

              {/* task route end */}
              <Route element={<Navigate to="/admin/dashboard" />} path="*" />
              {/* <Route element={<h1>not found</h1>} path="*" /> */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  if (role === 'Operation' || role === 'Sales' || role === 'Account') {
    return (
      <BrowserRouter>
        <div className="home">
          <EmployeeSidebar />
          <div className="homeContainer">
            <Navbar />
            <Routes>
              <Route
                element={<EmployeeDashboard />}
                path="/employee/dashboard"
              />

              <Route
                element={<EmployeeCustomerList />}
                path="/employee/customers-list"
              />

              <Route
                element={<EmployeeAddCustomer />}
                path="/employee/add-customer"
              />
              <Route
                element={<EmployeeSingleCustomer />}
                path="/employee/customer/:id"
              />
              <Route
                element={<UpdateSingleCustomer />}
                path="/employee/customers/:id/update"
              />

              <Route
                element={<GetAllTaskByEmployee />}
                path="employee/:id/tasks"
              />
              <Route
                element={<GetSingleTaskByEmployee />}
                path="/employee/:employeeId/task/:taskId"
              />
              {/* <Route element={<AddTodayWork />} path="/employee/today-task" /> */}
              <Route element={<EditorTask />} path="/employee/add-work/:id" />
              <Route
                element={<EditWork />}
                path="/employee/daily-tasks/:id/update"
              />
              <Route element={<DailyTasks />} path="/employee/daily-tasks" />
              <Route
                element={<SingleDailyTask />}
                path="/employee/daily-tasks/:id"
              />
              <Route
                element={<UpdatePassword />}
                path="/employee/update-password"
              />
              {/* profile */}
              <Route element={<EmployeeProfile />} path="/employee/profile" />

              {/* forgot password */}

              {/* <Route element={<Navigate to="/employee/dashboard" />} path="*" /> */}

              {/* confirm email */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  if (!role) {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <WebsiteHomepage />
                </Suspense>
              }
              path="/"
            />
            <Route
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminLogin />
                </Suspense>
              }
              path="/admin-login"
            />
            <Route
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <EmployeeLogin />
                </Suspense>
              }
              path="/employee-login"
            />

            {/* forgot password */}
            <Route
              element={<ResetPassword />}
              path="/employee/reset-password"
            />
            <Route
              element={<PasswordRedirectPage />}
              path="/employee/resetPassword/:token"
            />

            <Route
              element={<ConfirmEmail />}
              path="/employee/confirmEmail/:id"
            />

            <Route element={<h2>Not Found</h2>} path="*" />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;

//hello
//jjf
