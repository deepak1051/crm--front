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

import { deleteCustomer, fetchAllCustomers } from '../../store';
import FilterViaName from '../../utils/filter/FilterViaName';
import useFilter from '../../hooks/useFilter';
import Skeleton from 'react-loading-skeleton';
import useThunk from '../../hooks/useThunk';
import CustomerIllustration from '../../utils/CustomerIllustration';

const AdminCustomerList = () => {
  const { customerList } = useSelector((state) => state.admin);
  const { data, handleChange, name } = useFilter(customerList);
  const [fetchCustomers, isLoading, error] = useThunk(fetchAllCustomers);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (
      window.confirm('Do you really want to delete this customer permanently?')
    ) {
      dispatch(deleteCustomer({ id }))
        .unwrap()
        .then(() => dispatch(fetchAllCustomers()))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  let content;
  if (isLoading) {
    content = <Skeleton count={5} height={40} />;
  } else if (error) {
    content = <div>Error Fetching Customers...</div>;
  } else {
    content =
      customerList.length === 0 ? (
        <CustomerIllustration />
      ) : (
        <>
          <TableHead>
            <TableRow>
              <TableCell className="tableCell x">Customer Name</TableCell>
              <TableCell className="tableCell x">Email</TableCell>
              <TableCell className="tableCell x">Status</TableCell>

              <TableCell className="tableCell x">Country</TableCell>
              <TableCell className="tableCell x">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(name.trim().length === 0 ? customerList : data).map((row) => {
              return (
                <TableRow key={row._id}>
                  <TableCell className="tableCell">
                    <div className="cellWrapper capital">{row.name}</div>
                  </TableCell>
                  <TableCell className="tableCell">{row.email}</TableCell>
                  <TableCell className="tableCell">{row.status}</TableCell>

                  <TableCell className="tableCell">{row.country}</TableCell>
                  <TableCell className="tableCell">
                    <Link to={`/admin/customers/${row._id}`}>
                      <button className="view">View</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </>
      );
  }

  return (
    <>
      <div className="addNew">
        <Link to="/admin/add-customer">
          <button>Add New</button>
        </Link>
      </div>

      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <FilterViaName name={name} handleChange={handleChange} />
          {content}
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminCustomerList;
