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

const AddTeammate = ({ currentEmployeeId, taskId }) => {
  const { employeeList, singleTask } = useSelector((state) => state.admin);
  console.log(singleTask.teamMate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch, currentEmployeeId, taskId]);

  const filteredEmployee = employeeList?.filter((item) => {
    return item._id !== currentEmployeeId;
  });

  // const x = filteredEmployee.filter((item) =>
  //   singleTask.teamMate.some((teammate) => teammate._id !== item._id)
  // );
  // let x = [];
  // const teammates = singleTask.teamMate;
  // console.log(teammates);

  // for (let i = 0; i < filteredEmployee.length; i++) {
  //   for (let j = 0; j < teammates.length; j++) {
  //     if (filteredEmployee[i]._id !== teammates[j]._id) {
  //       x.find((t) => t.AddTeammate);
  //       x.push(teammates[j]);
  //     }
  //   }
  // }
  // console.log(x);

  const handleTeammate = (employeeId) => {
    dispatch(addTeammate({ currentEmployeeId, employeeId, taskId }))
      .unwrap()
      .then(() =>
        dispatch(getSingleTask({ employeeId: currentEmployeeId, taskId }))
      )
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>AddTeammate</h2>
      <TableHead>
        <TableRow>
          <TableCell className="tableCell x">Employee Name</TableCell>
          <TableCell className="tableCell x">Action</TableCell>
        </TableRow>
      </TableHead>

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
    </div>
  );
};

export default AddTeammate;
