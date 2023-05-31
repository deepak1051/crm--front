import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProject } from '../../store';
import { Fragment } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import CustomerIllustration from '../../utils/CustomerIllustration';

const AllDailyWorkList = () => {
  const { allWork } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {allWork.length === 0 ? (
          <CustomerIllustration />
        ) : (
          <>
            <TableHead>
              <TableRow>
                <TableCell className="tableCell x">Employee Name</TableCell>
                <TableCell className="tableCell x">Work Date</TableCell>
                <TableCell className="tableCell x">Work Name</TableCell>
                <TableCell className="tableCell x">Description</TableCell>
                <TableCell className="tableCell x">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allWork?.map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell className="tableCell">
                      {row.employee.name}
                    </TableCell>

                    <TableCell className="tableCell">
                      <div className="cellWrapper capital">
                        {format(new Date(row.projectDate), 'yyyy-MM-dd')}
                      </div>
                    </TableCell>

                    <TableCell className="tableCell">{row.name}</TableCell>

                    <TableCell className="tableCell">
                      {row.description}
                    </TableCell>

                    <TableCell className="tableCell">
                      <Link to={`/admin/daily-work-list/${row._id}`}>
                        <button className="view">View</button>
                      </Link>

                      <Fragment>
                        {/* <button
                          onClick={() => handleDelete(row._id)}
                          className="delete"
                        >
                          Delete
                        </button> */}
                      </Fragment>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        )}
      </Table>
    </TableContainer>
  );
};

export default AllDailyWorkList;
