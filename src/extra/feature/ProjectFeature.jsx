import { useEffect } from 'react';
import './feature.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { getAllTask } from '../../store/thunks/admin';

const ProjectFeature = () => {
  const { tasks } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Projects</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        {/* <div className="featuredChart"> */}
        {/* <CircularProgressbar value={70} text={'70%'} strokeWidth={5} /> */}
        <img
          src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGVtcGxveWVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
          style={{ width: '100%', height: '100px', color: 'red' }}
        />
        {/* </div> */}
        <p className="title">Total Active Projects</p>
        <p className="amount">{tasks?.length}</p>
      </div>
    </div>
  );
};

export default ProjectFeature;
