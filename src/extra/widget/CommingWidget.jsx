import { useEffect, useState } from 'react';
import './widget.scss';
import { useSelector } from 'react-redux';

import { SiCodeproject } from 'react-icons/si';

const CommingWidget = () => {
  const { tasks } = useSelector((state) => state.admin);

  const [commingTask, setCommingTask] = useState([]);

  useEffect(() => {
    const filteredData = tasks.filter((item) => item.status === 'comming');
    setCommingTask(filteredData?.length);
  }, [tasks]);
  return (
    <div
      className="widget"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p style={{ color: 'gray', fontWeight: '500' }}>Comming Projects</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SiCodeproject style={{ color: 'teal', fontSize: '2rem' }} />
        <p>{commingTask}</p>
      </div>
    </div>
  );
};

export default CommingWidget;
