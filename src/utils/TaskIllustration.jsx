import React from 'react';

const TaskIllustration = () => {
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
      <h2 style={{ color: 'gray', margin: '15px' }}>There is no Task</h2>
    </div>
  );
};

export default TaskIllustration;
