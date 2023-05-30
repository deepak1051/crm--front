import React from 'react';

const TaskIllustration = ({ title = 'Task' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="/task.jpg" alt="empty customer" style={{ height: '300px' }} />
      <h2 style={{ color: 'gray', margin: '15px' }}>There is no {title}</h2>
    </div>
  );
};

export default TaskIllustration;
