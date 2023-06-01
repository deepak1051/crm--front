import { useEffect, useState } from 'react';
import './widget.scss';
import { useSelector } from 'react-redux';
import { GiGriffinSymbol } from 'react-icons/gi';

const RunningWidget = () => {
  const { tasks } = useSelector((state) => state.admin);

  const [runningTask, setRunningTask] = useState([]);

  useEffect(() => {
    const filteredData = tasks.filter((item) => item.status === 'running');
    setRunningTask(filteredData?.length);
  }, [tasks]);

  return (
    <div
      className="widget"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p style={{ color: 'gray', fontWeight: '500' }}>Active Projects</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <GiGriffinSymbol style={{ color: 'teal', fontSize: '2rem' }} />
        <p>{runningTask}</p>
      </div>
    </div>
  );
};

export default RunningWidget;
