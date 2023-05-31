import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getSingleTask } from '../../store';
import '../styles/single.scss';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';

import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const GetSingleTaskByEmployee = () => {
  const { singleTask, isSingleTaskLoading } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

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
          <div
            className="item"
            style={{
              display: 'flex',
              gap: '200px',
              justifyContent: 'space-between',

              width: '100%',
            }}
          >
            <div>
              <img
                src={`https://images.unsplash.com/photo-1578852612716-854e527abf2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGFza3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60`}
                alt=""
                className="itemImg"
                style={{ height: '200px', width: '100%' }}
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
                  <span className="single-list__container-item-key">
                    Status:
                  </span>
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
                      {format(
                        new Date(singleTask?.task?.deadline),
                        'yyyy-MM-dd'
                      )}
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
              </div>
            </div>
            <div>
              <span className="single-list__container-item-key">
                Teammates:
              </span>
              <div>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="tableCell x"
                      style={{ fontSize: '18px' }}
                    >
                      Employee Name
                    </TableCell>
                    <TableCell
                      className="tableCell x"
                      style={{ fontSize: '18px' }}
                    >
                      Role
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {singleTask?.teamMate?.map((item) => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell
                          className="tableCell"
                          style={{ fontSize: '18px' }}
                        >
                          <div className="cellWrapper">{item.name}</div>
                        </TableCell>
                        <TableCell
                          className="tableCell"
                          style={{ fontSize: '18px' }}
                        >
                          <div className="cellWrapper">{item.role}</div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </div>

              <button className="edit" style={{ marginTop: '30px' }}>
                <Link to={`/employee/add-work/${taskId}`}>Add Today Task</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSingleTaskByEmployee;
