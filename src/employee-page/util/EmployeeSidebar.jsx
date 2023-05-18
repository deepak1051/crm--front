import {
  MoneyOffCsredRounded,
  SupervisedUserCircleOutlined,
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  AiOutlineHeart,
  AiOutlineProfile,
  AiOutlineUser,
} from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';

const EmployeeSidebar = () => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">CRM</span>
      </div>

      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/employee/dashboard" className="nav-container">
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          <p className="title">LISTS</p>

          <NavLink
            to="employee/customers-list"
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            {' '}
            <SupervisedUserCircleOutlined />
            <span>Customers</span>
          </NavLink>
          <NavLink
            to={`/employee/${id}/tasks`}
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            <MoneyOffCsredRounded />
            <span>Projects</span>
          </NavLink>

          <p className="title">Profile</p>

          <NavLink
            to={`/employee/profile`}
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            <AiOutlineProfile />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to={`/employee/update-password`}
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            <AiOutlineUser />
            <span>Update Password</span>
          </NavLink>

          <NavLink
            to={`/employee/daily-tasks`}
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            <AiOutlineHeart />
            <span>Daily Tasks </span>
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
              fontSize: '1.6rem',
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

export default EmployeeSidebar;
