import React from 'react';
import '../styles/add.scss';

// import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNewEmployee } from '../../store';
import Spinner from '../../utils/Spinner';

const countryOptions = [
  {
    label: 'India',
    value: 'India',
  },
  {
    label: 'USA',
    value: 'USA',
  },
  {
    label: 'UK',
    value: 'UK',
  },
  {
    label: 'Dubai',
    value: 'Dubai',
  },
  {
    label: 'Germany',
    value: 'Germany',
  },
];
const roleOptions = [
  { value: 'Sales' },
  { value: 'Operation' },
  { value: 'Account' },
];

const AdminAddEmployee = () => {
  const { isLoading } = useSelector((state) => state.admin);

  const [error, setError] = useState(null);
  console.log('loading ', isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Sales',
    phone: '',
    country: 'India',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(addNewEmployee(user))
      .unwrap()
      .then(() => navigate('/admin/employees-list'))
      .catch((err) => setError(err));
  };
  console.log(user);
  return (
    <>
      <div className="top">
        <h1>Add New Employee</h1>
      </div>
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Name and surname</label>
              <input
                type="text"
                placeholder="john doe"
                name="name"
                onChange={handleChange}
                required
                value={user.name}
              />
            </div>
            <div className="formInput">
              <label>Email</label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
              />
            </div>
            <div className="formInput">
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={user.password}
              />
            </div>

            <div className="formInput">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="confirm password"
                name="confirmPassword"
                onChange={handleChange}
                value={user.confirmPassword}
              />
            </div>

            <div className="formInput">
              <label>Country</label>
              <select
                id="favColor"
                value={user.country}
                onChange={handleChange}
                name="country"
                required
              >
                {countryOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="formInput">
              <label>Address</label>
              <input
                required
                type="text"
                placeholder="Elton st. 216 NewYork"
                name="address"
                onChange={handleChange}
                value={user.address}
              />
            </div>
            <div className="formInput">
              <label>Phone No.</label>
              <input
                required
                type="text"
                placeholder="9784823451"
                name="phone"
                onChange={handleChange}
                value={user.phone}
              />
            </div>

            <div className="formInput">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={user.roles}
                onChange={handleChange}
                name="roles"
                required
              >
                {roleOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <button disabled={isLoading}>
              {' '}
              {isLoading ? <Spinner /> : 'Save'}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddEmployee;
