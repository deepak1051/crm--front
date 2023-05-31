import { AiOutlineHeart, AiOutlineProfile } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';
import { RxDashboard } from 'react-icons/rx';
import { RiCustomerService2Line, RiTodoLine } from 'react-icons/ri';
import { BsChatDots } from 'react-icons/bs';

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
            <RxDashboard />
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
            <RiCustomerService2Line />
            <span>Customers</span>
          </NavLink>
          <NavLink
            to={`/employee/${id}/tasks`}
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            <RiTodoLine style={{ color: '#000', fill: 'black' }} />
            <span>Projects</span>
          </NavLink>

          <NavLink
            to={`/employee/chat`}
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            <BsChatDots style={{ color: '#000', fill: 'black' }} />
            <span>Chats</span>
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
            <MdPassword />
            <span>Update Password</span>
          </NavLink>

          <NavLink
            to={`/employee/projects`}
            className={({ isActive }) =>
              isActive ? 'active nav-container' : 'inactive nav-container'
            }
          >
            <AiOutlineHeart />
            <span>Daily Tasks </span>
          </NavLink>

          <button
            onClick={logoutHandler}
            className="logout remove"
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
