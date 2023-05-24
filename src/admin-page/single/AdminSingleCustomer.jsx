import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleCustomer } from '../../store';
import '../styles/single.scss';
import Skeleton from 'react-loading-skeleton';
import useThunk from '../../hooks/useThunk';

const AdminSingleCustomer = () => {
  const { singleCustomer } = useSelector((state) => state.admin);

  const [fetchCustomer, isLoading, error] = useThunk(fetchSingleCustomer);

  const { id } = useParams();

  useEffect(() => {
    fetchCustomer({ id });
  }, [fetchCustomer, id]);

  let content;
  if (isLoading) {
    content = (
      <>
        <Skeleton count={1} height={60} width={60} circle={true} />
        <Skeleton count={1} height={200} width={400} />
      </>
    );
  } else if (error) {
    content = <div>Error Fetching Customer...</div>;
  } else {
    content = (
      <div
        className="single"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div className="top">
          <div className="left-side">
            <Link to={`/admin/customers/${id}/update`}>
              <button className="edit">Edit</button>
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
  }

  return <>{content}</>;
};

export default AdminSingleCustomer;
