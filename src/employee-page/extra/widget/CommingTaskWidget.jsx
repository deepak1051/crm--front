import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GiEvilComet } from 'react-icons/gi';
import { useSelector } from 'react-redux';

const CommingTaskWidget = () => {
  const { taskByEmployee } = useSelector((state) => state.admin);

  const [commingTask, setCommingTask] = useState([]);

  useEffect(() => {
    const filteredData = taskByEmployee.filter(
      (item) => item.status === 'comming'
    );
    setCommingTask(filteredData?.length);
  }, [taskByEmployee]);
  return (
    <div
      className="widget"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p style={{ color: 'gray', fontWeight: '500' }}>Comming Projects</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <GiEvilComet style={{ color: 'teal', fontSize: '2rem' }} />
        <p>{commingTask}</p>
      </div>
    </div>
  );
};

export default CommingTaskWidget;
