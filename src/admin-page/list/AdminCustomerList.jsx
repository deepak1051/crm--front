import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { deleteCustomer, fetchAllCustomers } from '../../store';

const AdminCustomerList = () => {
  const { customerList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
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
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  return (
    <>
      <div className="addNew">
        <Link to="/admin/add-customer">
          <button>Add New</button>
        </Link>
      </div>

      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell x">
                <label
                  htmlFor="filter"
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Filter via name
                </label>
                <input
                  id="filter"
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={user.name}
                />
              </TableCell>
            </TableRow>
          </TableHead>

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
            {customerList.map((row) => {
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
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminCustomerList;
