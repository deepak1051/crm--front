import React, { useState } from 'react';
import './login.scss';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsEye } from 'react-icons/bs';
import { adminLogin } from '../../store';

import ClipLoader from 'react-spinners/ClipLoader';

const Login = () => {
  const { isLoading, token, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }))
      .unwrap()
      .then(() => navigate('/admin/dashboard'))
      .catch((err) => console.log(err));
  };

  const handlePasswordChange = () => {
    if (passwordType === 'password') return setPasswordType('text');
    if (passwordType === 'text') return setPasswordType('password');
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="login">
        <h3>
          Login form for <span>Admin</span>
        </h3>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            id="password"
            type={passwordType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <BsEye
            style={{
              fontSize: '1.4rem',
              cursor: 'pointer',
              position: 'absolute',
              right: '20px',
              top: 0,
              bottom: 0,
              height: '100%',
            }}
            onClick={handlePasswordChange}
          />
        </div>
        <button disabled={isLoading}>
          {isLoading ? <ClipLoader color="#36d7b7" /> : 'Log In'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
