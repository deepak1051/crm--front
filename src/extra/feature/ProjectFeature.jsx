import { useEffect } from "react";
import "./feature.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "../../store/thunks/admin";
import { Link } from "react-router-dom";

const ProjectFeature = () => {
  const { tasks } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Project</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <img
          src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGVtcGxveWVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
          style={{ width: "100%", height: "100px", color: "red" }}
        />

        <Link to="/admin/projects">
          <p className="title">All Projects</p>
        </Link>
        <p className="amount">{tasks?.length}</p>
      </div>
    </div>
  );
};

export default ProjectFeature;
