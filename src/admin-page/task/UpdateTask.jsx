import React, { useEffect } from 'react';
import '../styles/add.scss';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSingleTask, updateTask } from '../../store';
import { format, parseISO } from 'date-fns';

const statusOptions = [
  { value: 'comming' },
  { value: 'completed' },
  { value: 'running' },
];

const UpdateTask = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { employeeId, taskId } = useParams();
  const [user, setUser] = useState({
    title: '',
    description: '',
    assignedDate: '',
    deadline: '',
    status: '',
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateTask({ ...user, employeeId, taskId }))
      .unwrap()
      .then(() => navigate(`/admin/task/${taskId}`))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    dispatch(getSingleTask({ employeeId, taskId }))
      .unwrap()
      .then((user) => {
        setUser({
          ...user.task,
          assignedDate: format(parseISO(user.task.assignedDate), 'yyyy-MM-dd'),
          deadline: format(parseISO(user.task.deadline), 'yyyy-MM-dd'),
          status: user.status,
        });
      })
      .catch((err) => setError(err.message));
  }, [dispatch, employeeId, taskId]);
  return (
    <>
      <div className="top">
        <h1>Update Task</h1>
      </div>
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                required
                value={user.title}
              />
            </div>
            <div className="formInput">
              <label>Description</label>
              <textarea
                type="text"
                name="description"
                onChange={handleChange}
                required
                value={user.description}
              ></textarea>
            </div>
            <div className="formInput">
              <label>Assigned Date </label>
              <input
                type="date"
                name="assignedDate"
                onChange={handleChange}
                required
                value={user.assignedDate}
              />
            </div>
            <div className="formInput">
              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                onChange={handleChange}
                required
                value={user.deadline}
              />
            </div>

            <div className="formInput">
              <label htmlFor="role">Status</label>
              <select
                id="role"
                value={user.status}
                onChange={handleChange}
                name="status"
                required
              >
                {statusOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <button>Save</button>
            {error && <div className="error">error</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateTask;
