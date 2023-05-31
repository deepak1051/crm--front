import React from 'react';
import '../styles/add.scss';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNewTask } from '../../store';
import Spinner from '../../utils/Spinner';

const AddNewTask = () => {
  const { isLoading, error } = useSelector((state) => state.admin);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    title: '',
    description: '',
    assignedDate: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);

    dispatch(addNewTask(user))
      .unwrap()
      .then(() => navigate(`/admin/projects`))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="top">
        <h1>Add New Task</h1>
      </div>
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Title</label>
              <input
                type="text"
                placeholder="title..."
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
                placeholder="description..."
                name="description"
                onChange={handleChange}
                required
                value={user.description}
              ></textarea>
            </div>
            <div className="formInput">
              <label>Assigned Date</label>
              <input
                type="date"
                name="assignedDate"
                onChange={handleChange}
                value={user.assignedDate}
              />
            </div>

            <div className="formInput">
              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                onChange={handleChange}
                value={user.deadline}
              />
            </div>

            <br />
            <button disabled={isLoading}>
              {' '}
              {isLoading ? <Spinner /> : 'Save'}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewTask;
