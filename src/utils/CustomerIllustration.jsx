import React from 'react';

const CustomerIllustration = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src="/customer.jpg"
        alt="empty customer"
        style={{ height: '300px' }}
      />
      <h2 style={{ color: 'gray', margin: '15px' }}>There is no Customer</h2>
    </div>
  );
};

export default CustomerIllustration;
