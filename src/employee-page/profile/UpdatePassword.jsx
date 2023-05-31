import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePassword } from '../../store';
import Spinner from '../../utils/Spinner';
import { toast } from 'react-toastify';

const EmployeeAddCustomer = () => {
  const { isLoading } = useSelector((state) => state.employee);
  const [error, setError] = useState(null);

  console.log(isLoading, error);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updatePassword({
        currentPassword: user.currentPassword,
        password: user.newPassword,
        confirmPassword: user.confirmNewPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast('Wow so easy!');
        navigate('/employee/customers-list');
      })
      .catch((err) => setError(err));
  };

  return (
    <>
      <div className="top">
        <h1>Update Password</h1>
      </div>
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                onChange={handleChange}
                required
                value={user.currentPassword}
              />
            </div>
            <div className="formInput">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                onChange={handleChange}
                required
                value={user.newPassword}
              />
            </div>

            <div className="formInput">
              <label>Confirm New Password</label>
              <input
                required
                type="password"
                name="confirmNewPassword"
                onChange={handleChange}
                value={user.confirmNewPassword}
              />
            </div>

            <br />
            <button disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Update'}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeAddCustomer;
