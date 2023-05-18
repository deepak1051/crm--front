import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleCustomer } from '../../store';
import '../styles/single.scss';

const AdminSingleCustomer = () => {
  const { singleCustomer } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleCustomer({ id }));
  }, [dispatch, id]);

  return (
    <div
      className="single"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="top">
        <div className="left-side">
          <Link to={`/admin/customers/${id}/update`}>
            <button className="editButton">Edit</button>
          </Link>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              src={`https://picsum.photos/seed/${id}/300/200`}
              alt=""
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">{singleCustomer.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{singleCustomer.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                <span className="itemValue">{singleCustomer.phone}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Address:</span>
                <span className="itemValue">{singleCustomer.address}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Country:</span>
                <span className="itemValue">{singleCustomer.country}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Status:</span>
                <span className="itemValue">{singleCustomer.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleCustomer;
