import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";

import { format } from "date-fns";
import { getAllTaskByEmployee } from "../../store";
import useThunk from "../../hooks/useThunk";
import Skeleton from "react-loading-skeleton";
import ProjectIllustration from "../../utils/ProjectIllustration";
import ErrorPage from "../../utils/ErrorPage";

const GetAllTaskByEmployee = () => {
  const { taskByEmployee } = useSelector((state) => state.admin);
  const [fetchTasks, isLoading, error] = useThunk(getAllTaskByEmployee);

  const { id } = useParams();
  useEffect(() => {
    fetchTasks({ employeeId: id });
  }, [fetchTasks, id]);

  let content;
  if (isLoading) {
    content = <Skeleton height={40} count={4} />;
  } else if (error) {
    content = (
      <>
        Fetching Task Details Error...
        <ErrorPage />
      </>
    );
  } else {
    content =
      taskByEmployee.length === 0 ? (
        <ProjectIllustration />
      ) : (
        <>
          <TableHead>
            <TableRow>
              <TableCell className="tableCell x">Project Name</TableCell>
              <TableCell className="tableCell x">Project Status</TableCell>
              <TableCell className="tableCell x">Project Deadline</TableCell>
              <TableCell className="tableCell x">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskByEmployee.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell className="tableCell">{item.task.title}</TableCell>
                  <TableCell className="tableCell">{item.status}</TableCell>
                  <TableCell className="tableCell">
                    {format(new Date(item.task.deadline), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell className="tableCell">
                    <Link to={`/employee/${id}/task/${item._id}`}>
                      <button
                        className="primary"
                        style={{ marginRight: "20px" }}
                      >
                        Project Details
                      </button>
                    </Link>
                    <Link to={`/employee/daily-tasks/${item._id}`}>
                      <button className="edit">Project Work</button>
                    </Link>
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
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {content}
        </Table>
      </TableContainer>
    </>
  );
};

export default GetAllTaskByEmployee;
