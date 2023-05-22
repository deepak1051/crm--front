import React from 'react';
import instance from '../../utils/instance';
import { useState } from 'react';
import '../confirm-email/confirm-email.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      const { data } = await instance.post('/employee/forgetPassword', {
        email,
      });
      console.log(data);
      setInfo(data.message);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="confirmEmail-container">
      <form onSubmit={handleSubmit} className="confirmEmail-wrapper">
        <h2>Reset Your Password</h2>
        <div>
          <label htmlFor="email">Enter Your Email</label>
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button>Submit</button>

        {info && <h2>{info}</h2>}
      </form>
    </div>
  );
};

export default ResetPassword;
