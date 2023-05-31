import React from 'react';

const ProjectIllustration = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="/project.jpg" alt="empty project" style={{ height: '300px' }} />
      <h2 style={{ color: 'gray', margin: '15px' }}>
        There is no Project Currently
      </h2>
    </div>
  );
};

export default ProjectIllustration;
