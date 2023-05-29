import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkByEmployee } from '../../store';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import useThunk from '../../hooks/useThunk';
import Skeleton from 'react-loading-skeleton';
import TaskIllustration from '../../utils/TaskIllustration';

const DailyTasks = ({ employeeId }) => {
  const { id } = useSelector((state) => state.auth);
  const { workListByEmployee } = useSelector((state) => state.work);

  const [fetchEmployeeWork, isLoading, error] = useThunk(getWorkByEmployee);

  useEffect(() => {
    fetchEmployeeWork(employeeId ? { id: employeeId } : { id });
  }, [employeeId, fetchEmployeeWork, id]);

  let content;
  if (isLoading) {
    content = <Skeleton height={40} count={5} />;
  } else if (error) {
    content = <div>Fetching Daily Tasks Error...</div>;
  } else {
    content =
      workListByEmployee.length === 0 ? (
        <TaskIllustration />
      ) : (
        <>
          <TableHead>
            <TableRow>
              <TableCell className="tableCell x">Date </TableCell>
              <TableCell className="tableCell x">Project Name </TableCell>
              <TableCell className="tableCell x">Title</TableCell>
              <TableCell className="tableCell x">Status</TableCell>
              <TableCell className="tableCell x">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workListByEmployee.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="tableCell">
                  <div className="cellWrapper capital">
                    {format(new Date(item.date), 'yyyy-MM-dd')}
                  </div>
                </TableCell>

                <TableCell className="tableCell">
                  {item.task.task.title}
                </TableCell>

                <TableCell className="tableCell">{item.name}</TableCell>
                <TableCell className="tableCell">{item.status}</TableCell>
                <TableCell className="tableCell">
                  <Link to={`/employee/daily-tasks/${item._id}`}>
                    <button>View</button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      );
  }

  return (
    <TableContainer
      component={Paper}
      className="table"
      style={{ margin: '10px', width: '90%' }}
    >
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        {content}
      </Table>
    </TableContainer>
  );
};

export default DailyTasks;
