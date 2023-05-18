import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSingleWork, updateSingleWork } from '../../store';

const EditWork = ({ placeholder }) => {
  const [taskDetail, setTaskDetail] = useState({
    name: '',
    status: '',
    description: '',
  });
  const [error, setError] = useState(null);

  const editor = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleWork({ id }))
      .unwrap()
      .then(({ name, status, description }) =>
        setTaskDetail({ name, status, description })
      )
      .catch((err) => setError(err));
  }, [dispatch, id]);

  console.log(taskDetail);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typings...',
    }),
    [placeholder]
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetail((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSingleWork({ ...taskDetail, id }))
      .unwrap()
      .then(() => navigate(`/employee/daily-tasks/${id}`))
      .catch((err) => setError(err));
  };
  return (
    <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={taskDetail.name}
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <input
          type="text"
          name="status"
          onChange={handleChange}
          value={taskDetail.status}
        />
      </div>

      <JoditEditor
        ref={editor}
        value={taskDetail.description}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) =>
          setTaskDetail((prev) => ({ ...prev, description: newContent }))
        } // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />

      <hr style={{ margin: '20px 0' }} />
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <button>Save Work</button>
    </form>
  );
};

export default EditWork;
