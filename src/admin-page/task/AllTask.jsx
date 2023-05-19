import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getAllTask } from '../../store/thunks/admin';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const AllTask = () => {
  const { tasks, isLoading } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);
  return (
    <>
      <TableContainer component={Paper} className="table">
        {isLoading ? (
          <Skeleton count={5} height={40} />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell x">Title</TableCell>
                <TableCell className="tableCell x">Status</TableCell>
                <TableCell className="tableCell x">Deadline</TableCell>
                <TableCell className="tableCell x">Total Members</TableCell>
                <TableCell className="tableCell x">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                return (
                  <TableRow key={task._id}>
                    <TableCell className="tableCell">
                      {task.task.title}
                    </TableCell>
                    <TableCell className="tableCell">{task.status}</TableCell>
                    <TableCell className="tableCell">
                      {format(new Date(task.task.deadline), 'yyyy-MM-dd')}
                    </TableCell>

                    <TableCell className="tableCell">
                      {task.teamMate?.length}
                    </TableCell>
                    <TableCell className="tableCell">
                      <Link
                        to={`/admin/${task.teamMate[0]._id}/task/${task._id}`}
                      >
                        <button className="view">View More</button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
};

export default AllTask;
