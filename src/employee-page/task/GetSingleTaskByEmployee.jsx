import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { deleteTask, getSingleTask, removeTeammate } from '../../store';
import '../styles/single.scss';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import CalenderTask from '../calender-task/CalenderTask';

const GetSingleTaskByEmployee = () => {
  const { singleTask, isSingleTaskLoading } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employeeId, taskId } = useParams();

  useEffect(() => {
    dispatch(getSingleTask({ employeeId, taskId }));
  }, [dispatch, employeeId, taskId]);

  if (isSingleTaskLoading) return <Skeleton count={5} />;
  return (
    <div
      className="single"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="top">
        <div className="left-side">
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              src={`https://images.unsplash.com/photo-1578852612716-854e527abf2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGFza3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60`}
              alt=""
              className="itemImg"
              style={{ height: '200px', width: '100%' }}
            />
            <div className="details">
              <h1 className="itemTitle">{singleTask.employeeId?.name}</h1>
              <div className="detailItem">
                <span className="itemValue">Task Title: </span>
                <span className="itemKey">{singleTask?.task?.title}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Status:</span>
                <span className="itemValue">{singleTask?.status}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Assigned Date:</span>
                {singleTask?.task?.assignedDate && (
                  <span className="itemValue">
                    {format(
                      new Date(singleTask?.task?.assignedDate),
                      'yyyy-MM-dd'
                    )}
                  </span>
                )}
              </div>
              <div className="detailItem">
                <span className="itemKey">Deadline:</span>
                {singleTask?.task?.deadline && (
                  <span className="itemValue">
                    {format(new Date(singleTask?.task?.deadline), 'yyyy-MM-dd')}
                  </span>
                )}
              </div>
              <div className="detailItem">
                <span className="itemKey">Description:</span>
                <span className="itemValue">
                  {singleTask?.task?.description}
                </span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Teammates:</span>
                {/* <span className="itemValue">{singleTask?.teammates}</span> */}
                <div>
                  {singleTask?.teamMate?.map((item) => {
                    return (
                      <div key={item._id}>
                        <h4>Name: {item.name}</h4>
                        <p>Role: {item.role}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalenderTask taskId={taskId} />
    </div>
  );
};

export default GetSingleTaskByEmployee;
