import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useParams } from 'react-router-dom';
import { getAllTaskByEmployee } from '../../store';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import useThunk from '../../hooks/useThunk';

const AllTaskByEmployee = () => {
  const { taskByEmployee } = useSelector((state) => state.admin);

  const [fetchTask, isLoading, error] = useThunk(getAllTaskByEmployee);

  const { id } = useParams();

  useEffect(() => {
    fetchTask({ id });
  }, [fetchTask, id]);

  let content;
  if (isLoading) {
    content = <Skeleton height={40} count={4} />;
  } else if (error) {
    content = <div>Error Fetching Tasks...</div>;
  } else {
    content = (
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell x">Task Name</TableCell>
            <TableCell className="tableCell x">Status</TableCell>
            <TableCell className="tableCell x">Deadline</TableCell>
            <TableCell className="tableCell x">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskByEmployee.map((item) => {
            return (
              <TableRow key={item._id}>
                <TableCell className="tableCell">{item.task.title}</TableCell>
                <TableCell className="tableCell">{item.status}</TableCell>
                <TableCell className="tableCell">
                  {format(new Date(item.task.deadline), 'yyyy-MM-dd')}
                </TableCell>
                <TableCell className="tableCell">
                  <Link to={`/admin/${id}/task/${item._id}`}>
                    <button className="view">View More</button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <TableContainer component={Paper} className="table">
        {content}
      </TableContainer>
    </>
  );
};

export default AllTaskByEmployee;
