import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import { Spreadsheet } from 'react-spreadsheet';

function CalenderTask({ taskId }) {
  const [value, setValue] = useState();
  const [data, setData] = useState([
    [{ value: 'Vanilla' }, { value: 'Chocolate' }],
    [{ value: 'Strawberry' }, { value: 'Cookies' }],
  ]);
  const onChange = useCallback(
    (value) => {
      setValue(value);
    },
    [setValue]
  );
  const handleClick = () => {
    console.log('first');
  };
  const date = new Date();
  const futureDate = date.getDate();
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString('en-CA');
  return (
    // <div>
    //   <h1>Calendar - GeeksforGeeks</h1>
    //   <Calendar value={value} onChange={onChange} onClick={handleClick} />
    // </div>
    <div>
      <input
        type="date"
        // value={new Date().toDateInputValue()}
        defaultValue={defaultValue}
      />

      {/* <Spreadsheet data={data} onChange={setData} /> */}

      <button>
        <Link to={`/employee/add-work/${taskId}`}>Add Today Task</Link>
      </button>
    </div>
  );
}

export default CalenderTask;
