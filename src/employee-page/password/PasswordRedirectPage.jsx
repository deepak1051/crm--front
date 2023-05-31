import { useState } from 'react';
import instance from '../../utils/instance';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordRedirectPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const { token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError(`password doesn't match`);
      return;
    }

    try {
      const { data } = await instance.post(`/employee/resetPassword/${token}`, {
        password,
        confirmPassword,
      });
      navigate('/employee-login');
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
      <h2>Enter your New Password</h2>
      <div>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div>
        <label htmlFor="password">Confirm New Password</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button>Submit</button>
      {<h2></h2>}
    </form>
  );
};

export default PasswordRedirectPage;
