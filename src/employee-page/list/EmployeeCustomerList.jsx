import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchAllCustomersRelatedToEmployee,
  deleteSingleCustomer,
} from '../../store';
import Skeleton from 'react-loading-skeleton';
import '../styles/list.scss';

const EmployeeCustomerList = () => {
  const { employeeCustomerList, isLoading } = useSelector(
    (state) => state.employee
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCustomersRelatedToEmployee());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to remove this customer.')) {
      dispatch(deleteSingleCustomer({ id }))
        .unwrap()
        .then(() => dispatch(fetchAllCustomersRelatedToEmployee()))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="addNew">
        <Link to="/employee/add-customer">
          <button>Add New</button>
        </Link>
      </div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell x">Employee Name</TableCell>
              <TableCell className="tableCell x">Email</TableCell>
              <TableCell className="tableCell x">Status</TableCell>

              <TableCell className="tableCell x">Country</TableCell>
              <TableCell className="tableCell x">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Skeleton count={5} />
            ) : (
              employeeCustomerList.map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell className="tableCell">
                      <div className="cellWrapper capital">{row.name}</div>
                    </TableCell>
                    <TableCell className="tableCell">{row.email}</TableCell>
                    <TableCell className="tableCell">{row.status}</TableCell>

                    <TableCell className="tableCell">{row.country}</TableCell>
                    <TableCell className="tableCell">
                      <Link to={`/employee/customer/${row._id}`}>
                        <button className="view">View</button>
                      </Link>

                      <Fragment>
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="delete"
                        >
                          Delete
                        </button>
                      </Fragment>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeCustomerList;
