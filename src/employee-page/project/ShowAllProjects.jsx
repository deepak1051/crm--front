import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { deleteSingleProject, getAllProjectByEmployee } from '../../store';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CustomerIllustration from '../../utils/CustomerIllustration';

const ShowAllProjects = () => {
  const { allWorkByEmployee } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectByEmployee());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to remove this work.')) {
      dispatch(deleteSingleProject({ id }))
        .unwrap()
        .then(() => dispatch(getAllProjectByEmployee()))
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <>
      <div className="addNew">
        <Link to="/employee/create-project">
          <button>create work</button>
        </Link>
      </div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {allWorkByEmployee.length === 0 ? (
            <CustomerIllustration />
          ) : (
            <>
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell x">Work Date</TableCell>
                  <TableCell className="tableCell x">Name</TableCell>
                  <TableCell className="tableCell x">Description</TableCell>
                  <TableCell className="tableCell x">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allWorkByEmployee.map((row) => {
                  return (
                    <TableRow key={row._id}>
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
                        <Link to={`/employee/projects/${row._id}`}>
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
                })}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default ShowAllProjects;
