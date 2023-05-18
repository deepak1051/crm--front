import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GiShardSword } from 'react-icons/gi';
import { useSelector } from 'react-redux';

const CompleteTaskWidget = () => {
  const { taskByEmployee } = useSelector((state) => state.admin);

  const [completedTask, setCompletedTask] = useState([]);

  useEffect(() => {
    const filteredData = taskByEmployee.filter(
      (item) => item.status === 'completed'
    );
    setCompletedTask(filteredData?.length);
  }, [taskByEmployee]);
  return (
    <div
      className="widget"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p style={{ color: 'gray', fontWeight: '500' }}>Completed Projects</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <GiShardSword style={{ color: 'teal', fontSize: '2rem' }} />
        <p>{completedTask}</p>
      </div>
    </div>
  );
};

export default CompleteTaskWidget;
