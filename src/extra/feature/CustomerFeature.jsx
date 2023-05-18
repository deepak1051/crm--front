import { useEffect } from 'react';
import './feature.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from '../../store/thunks/admin';

const CustomerFeature = () => {
  const { customerList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Customers</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <img
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
          style={{ width: '100%', height: '100px', color: 'red' }}
        />
        {/* <div className="featuredChart">
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div> */}
        <p className="title">Total Active Customers</p>
        <p className="amount">{customerList?.length}</p>
      </div>
    </div>
  );
};

export default CustomerFeature;
