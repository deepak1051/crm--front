import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const AllTaskByEmployee = () => {
  const { taskByEmployee } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllTaskByEmployee({ id }));
  }, [dispatch, id]);

  return (
    <>
      <TableContainer component={Paper} className="table">
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
      </TableContainer>
    </>
  );
};

export default AllTaskByEmployee;
