import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  deleteTask,
  fetchSingleEmployee,
  getSingleTask,
  removeTeammate,
} from '../../store';
import '../styles/single.scss';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import AddTeammate from '../teammate/AddTeammate';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import WorkList from '../employee-work/SingleTaskWorkList';
import useThunk from '../../hooks/useThunk';
const SingleTask = () => {
  const { singleTask, isSingleTaskLoading, singleEmployee } = useSelector(
    (state) => state.admin
  );

  console.log(singleTask);

  // const [fetchEmployee, isFetchEmployeeLoading, fetchEmployeeError] =
  //   useThunk(fetchSingleEmployee);
  const [fetchTask, isFetchTaskLoading, fetchTaskError] =
    useThunk(getSingleTask);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    fetchTask({ taskId });
  }, [fetchTask, taskId]);

  // useEffect(() => {
  //   fetchEmployee({ id: employeeId });
  // }, [fetchEmployee, employeeId]);

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this Task permanently?')) {
      dispatch(deleteTask({ taskId }))
        .unwrap()
        .then(() => navigate(`/admin/projects`))
        .catch((err) => console.log(err));
    }
  };

  const handleRemove = (id) => {
    if (
      window.confirm(
        'Do you really want to remove this employee from teammates.'
      )
    )
      dispatch(
        removeTeammate({
          employeeId: id,

          taskId,
        })
      )
        .unwrap()
        .then(() => dispatch(getSingleTask({ taskId })))
        .catch((err) => console.log(err));
  };

  let taskContent;

  if (isFetchTaskLoading) {
    taskContent = <Skeleton count={4} height={40} />;
  } else if (fetchTaskError) {
    taskContent = <div>Fetching Task Error...</div>;
  } else {
    taskContent = (
      <>
        <div className="left-side">
          <div style={{ marginBottom: '20px' }}>
            <Link to={`/admin/updateTask/${taskId}`}>
              <button className="edit " style={{ marginRight: '5px' }}>
                Edit Task
              </button>
            </Link>

            <button onClick={handleDelete} className="delete">
              Delete Task
            </button>
          </div>

          <div className="item">
            <img
              src={`https://images.unsplash.com/photo-1634078111133-a1e12d6131b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGFza3xlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60`}
              alt=""
              className="itemImg"
              style={{ height: '200px', width: '100%', objectFit: 'contain' }}
            />
            <div className="single-list__container">
              <h1 className="itemTitle">{singleTask.employeeId?.name}</h1>
              <div>
                <span className="single-list__container-item-key">
                  Task Title:{' '}
                </span>
                <span className="single-list__container-item-value">
                  {singleTask?.task?.title}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">Status:</span>
                <span className="single-list__container-item-value">
                  {singleTask?.status}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Assigned Date:
                </span>
                {singleTask?.task?.assignedDate && (
                  <span className="single-list__container-item-value">
                    {format(
                      new Date(singleTask?.task?.assignedDate),
                      'yyyy-MM-dd'
                    )}
                  </span>
                )}
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Deadline:
                </span>
                {singleTask?.task?.deadline && (
                  <span className="single-list__container-item-value">
                    {format(new Date(singleTask?.task?.deadline), 'yyyy-MM-dd')}
                  </span>
                )}
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Description:
                </span>
                <span className="single-list__container-item-value">
                  {singleTask?.task?.description}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Teammates:
                </span>

                <div>
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableCell x">
                        Employee Name
                      </TableCell>
                      <TableCell className="tableCell x">Role</TableCell>
                      <TableCell className="tableCell x">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {singleTask?.teamMate?.map((item) => {
                      return (
                        <TableRow key={item._id}>
                          <TableCell className="tableCell">
                            <div className="cellWrapper">{item.name}</div>
                          </TableCell>
                          <TableCell className="tableCell">
                            <div className="cellWrapper">{item.role}</div>
                          </TableCell>

                          <TableCell className="tableCell">
                            <button
                              onClick={() => handleRemove(item._id)}
                              className="remove"
                            >
                              Remove
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isSingleTaskLoading) return <Skeleton count={5} />;
  return (
    <div>
      <div className="single" style={{ display: 'flex' }}>
        <div className="top" style={{ flex: 1 }}>
          {taskContent}
        </div>

        <div style={{ flex: 1 }} className="top">
          {isFetchTaskLoading} <AddTeammate taskId={taskId} />
        </div>
      </div>

      <hr />
      {/* <WorkList employeeId={employeeId} taskId={taskId} /> */}
    </div>
  );
};

export default SingleTask;
