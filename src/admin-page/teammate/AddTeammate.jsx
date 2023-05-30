import React, { useEffect, useState } from 'react';
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

const roleOptions = [
  { value: 'All' },
  { value: 'Sales' },
  { value: 'Operation' },
  { value: 'Account' },
];

const AddTeammate = ({ taskId }) => {
  const [role, setRole] = useState('All');

  const { employeeList, singleTask } = useSelector((state) => state.admin);
  const [fetchEmployees, isLoading, error] = useThunk(fetchAllEmployees);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployee = employeeList?.filter(
    (o) => !singleTask?.teamMate?.some(({ _id }) => o._id === _id)
  );

  const deepFilteredEmployee = filteredEmployee?.filter((c) => {
    if (role === 'All') return true;
    return c.role === role;
  });

  const handleTeammate = (employeeId) => {
    dispatch(addTeammate({ employeeId, taskId }))
      .unwrap()
      .then(() => dispatch(getSingleTask({ taskId })))
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
        {deepFilteredEmployee?.map((item) => {
          return (
            <TableRow key={item._id}>
              <TableCell className="tableCell">
                <div className="cellWrapper">{item.name}</div>
              </TableCell>

              <TableCell className="tableCell">
                <div className="cellWrapper">{item.role}</div>
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
      <div>
        <h3 style={{ color: '#333', padding: '10px' }}>Add Teammate</h3>
        <div className="formInput">
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            name="role"
            required
            style={{ width: '100%' }}
          >
            {roleOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <TableHead>
        <TableRow>
          <TableCell className="tableCell x">Employee Name</TableCell>
          <TableCell className="tableCell x">Role</TableCell>
          <TableCell className="tableCell x">Action</TableCell>
        </TableRow>
      </TableHead>

      {content}
    </div>
  );
};

export default AddTeammate;
