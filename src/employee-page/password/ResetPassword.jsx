import React from 'react';
import instance from '../../utils/instance';
import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h2>Enter your Email</h2>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button>Submit</button>

      {info && <h2>{info}</h2>}
    </form>
  );
};

export default ResetPassword;
