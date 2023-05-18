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
import { useEffect, useState } from 'react';
import { fetchAllEmployees, deleteEmployee } from '../../store';
import Skeleton from 'react-loading-skeleton';
import Model from '../../utils/Model';
import '../styles/list.scss';

const AdminEmployeeList = () => {
  const [showModel, setShowModel] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    country: '',
  });
  const { employeeList, isLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteEmployee({ id }))
      .unwrap()
      .then(() => {
        setShowModel(false);
        dispatch(fetchAllEmployees());
      })
      .catch((err) => console.log(err));
  };

  const onClose = () => {
    setShowModel(false);
  };

  return (
    <>
      <div className="addNew">
        <Link to="/admin/add-employee">
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
              <TableCell className="tableCell x">Employee Name</TableCell>
              <TableCell className="tableCell x">Email</TableCell>
              <TableCell className="tableCell x">Role</TableCell>

              <TableCell className="tableCell x">Country</TableCell>
              <TableCell className="tableCell x">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Skeleton count={5} />
            ) : (
              employeeList.map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell className="tableCell">
                      <div className="cellWrapper capital">{row.name}</div>
                    </TableCell>
                    <TableCell className="tableCell">{row.email}</TableCell>
                    <TableCell className="tableCell">{row.role}</TableCell>

                    <TableCell className="tableCell">{row.country}</TableCell>
                    <TableCell className="tableCell">
                      <Link to={`/admin/employees/${row._id}`}>
                        <button className="view">View</button>
                      </Link>

                      <Fragment>
                        <button
                          onClick={() => setShowModel(true)}
                          className="delete"
                        >
                          Delete
                        </button>
                        {showModel && (
                          <Model
                            onClose={onClose}
                            ActionBar={
                              <button onClick={() => handleDelete(row._id)}>
                                I Accept
                              </button>
                            }
                          >
                            <p>Do You Really Want To Delete This Employee</p>
                          </Model>
                        )}
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

export default AdminEmployeeList;
