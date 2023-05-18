import { useEffect, useState } from 'react';
import './widget.scss';
import { useSelector } from 'react-redux';
import { GiCrosshairArrow } from 'react-icons/gi';

const CompletedWidget = () => {
  const { tasks } = useSelector((state) => state.admin);
  const [completedTask, setCompletedTask] = useState([]);

  useEffect(() => {
    const filteredData = tasks.filter((item) => item.status === 'completed');
    setCompletedTask(filteredData?.length);
  }, [tasks]);

  return (
    <div
      className="widget"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p style={{ color: 'gray', fontWeight: '500' }}>Completed Projects</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <GiCrosshairArrow style={{ color: 'teal', fontSize: '2rem' }} />
        <p>{completedTask}</p>
      </div>
    </div>
  );
};

export default CompletedWidget;
