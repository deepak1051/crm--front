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
                <h1 className="itemTitle" style={{ color: 'teal' }}>
                  {singleCustomer.name}
                </h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '10px',
                    fontSize: '18px',
                  }}
                >
                  <div>
                    <span>Email:</span>
                    <span>{singleCustomer.email}</span>
                  </div>
                  <div>
                    <span>Phone:</span>
                    <span>{singleCustomer.phone}</span>
                  </div>
                  <div>
                    <span>Address:</span>
                    <span>{singleCustomer.address}</span>
                  </div>
                  <div>
                    <span>Country:</span>
                    <span>{singleCustomer.country}</span>
                  </div>
                  <div>
                    <span>Status:</span>
                    <span>{singleCustomer.status}</span>
                  </div>
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
