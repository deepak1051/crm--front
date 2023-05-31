import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../store';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [workDetails, setWorkDetails] = useState({
    name: '',
    description: '',
    projectDate: '',
  });
  const { id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setWorkDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject({ ...workDetails, employeeId: id }))
      .unwrap()
      .then(() => navigate('/employee/projects'))
      .catch((err) => console.log(err.message));
  };

  console.log(workDetails);
  return (
    <>
      <div className="top">
        <h1>Add Daily Work</h1>
      </div>
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Name </label>
              <input
                type="text"
                placeholder="john doe"
                name="name"
                onChange={handleChange}
                required
                value={workDetails.name}
              />
            </div>
            <div className="formInput">
              <label>Description</label>
              <textarea
                type="text"
                placeholder="work details..."
                name="description"
                onChange={handleChange}
                required
                value={workDetails.description}
              />
            </div>

            <div className="formInput">
              <label htmlFor="projectDate">Work Date</label>
              <input
                id="projectDate"
                type="date"
                name="projectDate"
                onChange={handleChange}
                value={workDetails.projectDate}
              />
            </div>

            <br />
            <button>Add</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
