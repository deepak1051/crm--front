import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSingleProject,
  updateSingleProject,
} from '../../store/thunks/project';
import { format, parseISO } from 'date-fns';

const UpdateProject = () => {
  const [workDetails, setWorkDetails] = useState({
    name: '',
    description: '',
    projectDate: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProject({ id }))
      .unwrap()
      .then(({ name, description, projectDate }) =>
        setWorkDetails({
          name,
          description,
          projectDate: format(parseISO(projectDate), 'yyyy-MM-dd'),
        })
      );
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setWorkDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateSingleProject({ ...workDetails, id }))
      .unwrap()
      .then(() => navigate(`/employee/projects/${id}`))
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <div className="top">
        <h1>Update Daily Work</h1>
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
            <button>Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProject;
