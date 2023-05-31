import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getAllTask } from '../../store/thunks/admin';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import useThunk from '../../hooks/useThunk';
import ProjectIllustration from '../../utils/ProjectIllustration';

const AllTask = () => {
  const { tasks } = useSelector((state) => state.admin);

  const [fetchTasks, isLoading, error] = useThunk(getAllTask);

  console.log(tasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  let content;
  if (isLoading) {
    content = <Skeleton count={5} height={40} />;
  } else if (error) {
    content = <div>Error Fetching Tasks...</div>;
  } else {
    content =
      tasks.length === 0 ? (
        <ProjectIllustration />
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell x">Title</TableCell>
              <TableCell className="tableCell x">Status</TableCell>
              <TableCell className="tableCell x">Deadline</TableCell>
              <TableCell className="tableCell x">Total Members</TableCell>
              <TableCell className="tableCell x">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              return (
                <TableRow key={task._id}>
                  <TableCell
                    className="tableCell"
                    style={{ fontSize: '16px', fontWeight: 'bold' }}
                  >
                    {task.task.title}
                  </TableCell>
                  <TableCell className="tableCell">{task.status}</TableCell>
                  <TableCell className="tableCell">
                    {format(new Date(task.task.deadline), 'yyyy-MM-dd')}
                  </TableCell>

                  <TableCell className="tableCell">
                    {task.teamMate?.length}
                  </TableCell>
                  <TableCell className="tableCell">
                    <Link to={`/admin/task/${task._id}`}>
                      <button className="view">Project Setting</button>
                    </Link>
                    <Link
                      to={`/admin/work-list/${task._id}`}
                      state={{ taskTitle: task.task.title }}
                    >
                      <button className="delete">Project Work</button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
  }
  return (
    <>
      <div className="addNew">
        <Link to="/admin/addTask">
          <button>Add New</button>
        </Link>
      </div>
      <TableContainer component={Paper} className="table">
        {content}
      </TableContainer>
    </>
  );
};

export default AllTask;
