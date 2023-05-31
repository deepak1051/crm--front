import React from 'react';

const EmployeeIllustration = () => {
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
        src="/employee.jpg"
        alt="empty customer"
        style={{ height: '300px' }}
      />
      <h2 style={{ color: 'gray', margin: '15px' }}>There is no Employee</h2>
    </div>
  );
};

export default EmployeeIllustration;
