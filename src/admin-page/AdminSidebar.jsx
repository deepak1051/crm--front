import {
  MoneyOffCsredRounded,
  SupervisedUserCircleOutlined,
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { FiLogOut } from 'react-icons/fi';
import { RiCustomerService2Line } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import './styles/sidebar.scss';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };

  return (
    <div
      className="sidebar"
      style={{ position: 'sticky', top: 0, left: 0, height: '100%' }}
    >
      <div className="top">
        <span className="logo">Admin CRM</span>
      </div>

      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/admin/dashboard" className="nav-container">
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          <p className="title">LISTS</p>
          <NavLink
            to="admin/employees-list"
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            {' '}
            <SupervisedUserCircleOutlined />
            <span>Employees</span>
          </NavLink>
          <NavLink
            to="admin/customers-list"
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            {' '}
            <RiCustomerService2Line />
            <span>Customers</span>
          </NavLink>
          <NavLink
            to={`/admin/projects`}
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            <MoneyOffCsredRounded />
            <span>Projects</span>
          </NavLink>

          <button
            onClick={logoutHandler}
            className="logout"
            style={{
              position: 'fixed',
              bottom: '10px',
              left: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '1.4rem',
              color: 'red',
              border: '1px solid red',
              borderRadius: '5px',
              padding: '5px',
            }}
          >
            <FiLogOut />
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
