import { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

const Password = ({ onChange, id, value }) => {
  const [passwordType, setPasswordType] = useState('password');

  const handlePasswordChange = () => {
    if (passwordType === 'password') return setPasswordType('text');
    if (passwordType === 'text') return setPasswordType('password');
  };
  return (
    <div style={{ position: 'relative' }}>
      <input id={id} type={passwordType} value={value} onChange={onChange} />
      {passwordType === 'password' ? (
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
      ) : (
        <AiOutlineEyeInvisible
          style={{
            fontSize: '1.6rem',
            cursor: 'pointer',
            position: 'absolute',
            right: '20px',
            top: 0,
            bottom: 0,
            height: '100%',
          }}
          onClick={handlePasswordChange}
        />
      )}
    </div>
  );
};

export default Password;
