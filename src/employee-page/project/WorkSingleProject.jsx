import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getSingleProject } from '../../store';
import '../styles/single.scss';
import { format } from 'date-fns';

const WorkSingleProject = () => {
  const { singleProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProject({ id }));
  }, [dispatch, id]);

 

  return (
    <div
      className="single"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="top">
        <div className="left-side">
          <div>
            <Link to={`/employee/update-project/${id}`}>
              <button className="edit" style={{ marginRight: '5px' }}>
                Edit
              </button>
            </Link>
          </div>
          <h1 className="title">Daily Work Information</h1>
          <h2 style={{ margin: '20px 0', fontWeight: 500, color: 'gray' }}>
            Employee Name: {singleProject.employee.name}
          </h2>
          <div className="item">
            <img
              src={`https://picsum.photos/seed/${id}/300/200`}
              alt=""
              className="itemImg"
            />
            <div className="single-list__container">
              <div>
                <span className="single-list__container-item-key">
                  Work Name:
                </span>
                <span className="single-list__container-item-value">
                  {singleProject.name}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Description:
                </span>
                <span className="single-list__container-item-value">
                  {singleProject.description}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Work Date:
                </span>
                {singleProject?.projectDate && (
                  <span className="single-list__container-item-value">
                    {format(new Date(singleProject?.projectDate), 'yyyy-MM-dd')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSingleProject;
