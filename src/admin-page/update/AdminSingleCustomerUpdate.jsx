import React, { useEffect } from 'react';
import '../styles/add.scss';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  addNewCustomer,
  fetchSingleCustomer,
  updateCustomer,
} from '../../store';

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
const statusOptions = [
  { value: 'Success' },
  { value: 'Pending' },
  { value: 'Rejected' },
];

const AdminSingleCustomerUpdate = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    address: '',
    status: 'Success',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleCustomer({ id }))
      .unwrap()
      .then((user) => setUser(user))
      .catch((err) => console.log(err));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateCustomer({ ...user, id }))
      .unwrap()
      .then(() => navigate(`/admin/customers/${id}`))
      .catch((err) => setError(err));
  };

  return (
    <>
      <div className="top">
        <h1>Update Customer</h1>
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
              <label htmlFor="role">Status</label>
              <select
                id="role"
                value={user.status}
                onChange={handleChange}
                name="status"
                required
              >
                {statusOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <button>Save</button>
            {error && <div className="error">error</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSingleCustomerUpdate;
