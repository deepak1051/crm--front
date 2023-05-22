import './confirm-email.css';
import instance from '../../utils/instance';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const ConfirmEmail = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const { id } = useParams();

  const handleClick = async () => {
    try {
      const { data } = await instance.post(
        `employee/confirmEmployeeMail/${id}`
      );
      setResult(data.message);
    } catch (error) {
      if (error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };
  return (
    <div className="confirmEmail-container">
      <div className="confirmEmail-wrapper">
        {/* <h2>Confirm Your Email Address</h2> */}
        <h2>Thank you for Confirming your account</h2>

        <p>
          Congratulations! Your email has been confirmed and your account is
          ready. Please close this page and go back to the mobile app to login.
        </p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!result && <button onClick={handleClick}>Confirm Email </button>}
        {result === 'Email Verified' && (
          <div style={{ color: 'teal', textAlign: 'center' }}>
            <h3>
              Your Email is Confirmed. Go to{' '}
              <Link
                to="/employee-login"
                style={{ textDecoration: 'underline' }}
              >
                login
              </Link>{' '}
              page
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
