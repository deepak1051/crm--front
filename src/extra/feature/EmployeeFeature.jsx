import { useEffect } from 'react';
import './feature.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees } from '../../store/thunks/admin';

const EmployeeFeature = () => {
  const { employeeList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Employee</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <img
          src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
          style={{ width: '100%', height: '100px', color: 'red' }}
        />
        {/* <div className="featuredChart">
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div> */}
        <p className="title">Total Active Employees</p>
        <p className="amount">{employeeList?.length}</p>
      </div>
    </div>
  );
};

export default EmployeeFeature;
