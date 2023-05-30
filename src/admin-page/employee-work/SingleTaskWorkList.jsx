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
import { Link, useLocation, useParams } from 'react-router-dom';
import TaskIllustration from '../../utils/TaskIllustration';

const SingleTaskWorkList = () => {
  const { workListByEmployee } = useSelector((state) => state.work);

  const { taskId } = useParams();
  const { state } = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkByEmployee({ id: taskId }));
  }, [dispatch, taskId]);

  if (workListByEmployee.length === 0) return <TaskIllustration title="Work" />;

  return (
    <>
      <h2
        style={{
          margin: '10px',
          color: 'gray',
          fontWeight: '500',
          fontSize: '18px',
        }}
      >
        Daily Work Details For Project{' '}
        <span style={{ color: 'teal', fontSize: '22px' }}>
          {state?.taskTitle}
        </span>
      </h2>
      <TableContainer
        component={Paper}
        className="table"
        style={{ margin: '10px', width: '90%' }}
      >
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell x">Date </TableCell>
              <TableCell className="tableCell x">Name</TableCell>
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
                <TableCell className="tableCell">{item.name}</TableCell>
                <TableCell className="tableCell">{item.status}</TableCell>
                <TableCell className="tableCell">
                  <Link to={`/admin/daily-tasks/${item._id}`}>
                    <button>View</button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SingleTaskWorkList;
