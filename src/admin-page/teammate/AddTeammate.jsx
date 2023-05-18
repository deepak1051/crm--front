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

  console.log(employeeList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch, currentEmployeeId, taskId]);

  const filteredEmployee = employeeList
    ?.filter((item) => {
      return item._id !== currentEmployeeId;
    })
    ?.filter((o) => !singleTask?.teamMate?.some(({ _id }) => o._id === _id));

  // const thirdArray = [
  //   ...new Set([...filteredEmployee, ...singleTask?.teamMate]),
  // ];

  // let test = [];

  // for (let el of filteredEmployee) {
  //   console.log(el._id);
  //   for (let elem2 of singleTask?.teamMate) {
  //     console.log(elem2._id);
  //     if (el._id !== elem2._id) {
  //       console.log('not match');
  //       test.push(el);
  //     }
  //   }
  // }

  // console.log(test);

  //   for(let el of arr){
  //     for(elem2 of arr2){
  //         if(el.id!==elem2.id){
  //             console.log(el)
  //         }
  //     }
  // }

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
