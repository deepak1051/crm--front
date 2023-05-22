import { Link } from 'react-router-dom';

function CalenderTask({ taskId }) {
  const date = new Date();
  const futureDate = date.getDate();
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString('en-CA');
  return (
    <div>
      <input type="date" defaultValue={defaultValue} />

      <button className="edit">
        <Link to={`/employee/add-work/${taskId}`}>Add Today Task</Link>
      </button>
    </div>
  );
}

export default CalenderTask;
