import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../store';
import ClipLoader from 'react-spinners/ClipLoader';

import './login.scss';

const EmployeeLogin = () => {
  const { isLoading, token, error } = useSelector((state) => state.auth);

  console.log(token);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }))
      .unwrap()
      .then(() => navigate('/employee/dashboard'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login">
        <h3>
          Login form for <span>Employee</span>
        </h3>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={isLoading}>
          {isLoading ? <ClipLoader color="#36d7b7" /> : 'Log In'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default EmployeeLogin;
