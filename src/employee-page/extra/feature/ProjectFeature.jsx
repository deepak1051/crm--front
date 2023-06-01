import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTaskByEmployee } from '../../../store';
import { Link } from 'react-router-dom';
const ProjectFeature = () => {
  const { taskByEmployee } = useSelector((state) => state.admin);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTaskByEmployee({ id }));
  }, [dispatch, id]);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Projects</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <img
          src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGVtcGxveWVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
          style={{ width: '100%', height: '100px', color: 'red' }}
        />
        <Link to={`/employee/${id}/tasks`}>
          <p className="title">Total Active Projects</p>
        </Link>
        <p className="amount">{taskByEmployee?.length}</p>
      </div>
    </div>
  );
};

export default ProjectFeature;
