import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { SiTask } from 'react-icons/si';
import { useSelector } from 'react-redux';

const CompleteTaskWidget = () => {
  const { taskByEmployee } = useSelector((state) => state.admin);

  const [activeTask, setActiveTask] = useState([]);

  useEffect(() => {
    const filteredData = taskByEmployee.filter(
      (item) => item.status === 'running'
    );
    setActiveTask(filteredData?.length);
  }, [taskByEmployee]);
  return (
    <div
      className="widget"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p style={{ color: 'gray', fontWeight: '500' }}>Active Projects</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SiTask style={{ color: 'teal', fontSize: '2rem' }} />
        <p>{activeTask}</p>
      </div>
    </div>
  );
};

export default CompleteTaskWidget;
