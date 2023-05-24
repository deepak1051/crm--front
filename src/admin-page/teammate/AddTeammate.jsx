import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {
  addTeammate,
  fetchAllEmployees,
  getSingleTask,
} from '../../store/thunks/admin';
import '../styles/list.scss';
import useThunk from '../../hooks/useThunk';
import Skeleton from 'react-loading-skeleton';

const AddTeammate = ({ currentEmployeeId, taskId }) => {
  const { employeeList, singleTask } = useSelector((state) => state.admin);
  const [fetchEmployees, isLoading, error] = useThunk(fetchAllEmployees);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployee = employeeList
    ?.filter((item) => {
      return item._id !== currentEmployeeId;
    })
    ?.filter((o) => !singleTask?.teamMate?.some(({ _id }) => o._id === _id));

  const handleTeammate = (employeeId) => {
    dispatch(addTeammate({ currentEmployeeId, employeeId, taskId }))
      .unwrap()
      .then(() =>
        dispatch(getSingleTask({ employeeId: currentEmployeeId, taskId }))
      )
      .catch((err) => console.log(err));
  };

  let content;
  if (isLoading) {
    content = <Skeleton count={4} height={40} />;
  } else if (error) {
    content = 'Feching Teammates Error';
  } else {
    content = (
      <TableBody>
        {filteredEmployee?.map((item) => {
          return (
            <TableRow key={item._id}>
              <TableCell className="tableCell">
                <div className="cellWrapper">{item.name}</div>
              </TableCell>

              <TableCell className="tableCell">
                <button onClick={() => handleTeammate(item._id)}>
                  Add To Team
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

  return (
    <div>
      <h2>AddTeammate</h2>
      <TableHead>
        <TableRow>
          <TableCell className="tableCell x">Employee Name</TableCell>
          <TableCell className="tableCell x">Action</TableCell>
        </TableRow>
      </TableHead>

      {content}
    </div>
  );
};

export default AddTeammate;
