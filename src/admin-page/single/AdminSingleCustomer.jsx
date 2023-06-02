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
                <div className="item">
                  <div className="single-list__container">
                    <h1 className="itemTitle">{singleCustomer.name}</h1>
                    <div>
                      <span className="single-list__container-item-key">
                        Email:
                      </span>
                      <span className="single-list__container-item-value">
                        {singleCustomer.email}
                      </span>
                    </div>
                    <div>
                      <span className="single-list__container-item-key">
                        Phone:
                      </span>
                      <span className="single-list__container-item-value">
                        {singleCustomer.phone}
                      </span>
                    </div>
                    <div>
                      <span className="single-list__container-item-key">
                        Address:
                      </span>
                      <span className="single-list__container-item-value">
                        {singleCustomer.address}
                      </span>
                    </div>
                    <div>
                      <span className="single-list__container-item-key">
                        Country:
                      </span>
                      <span className="single-list__container-item-value">
                        {singleCustomer.country}
                      </span>
                    </div>
                    <div>
                      <span className="single-list__container-item-key">
                        Status:
                      </span>
                      <span className="single-list__container-item-value">
                        {singleCustomer.status}
                      </span>
                    </div>

                    <div>
                      <span className="single-list__container-item-key">
                        Business Name:
                      </span>
                      <span className="single-list__container-item-value">
                        {singleCustomer?.businessName}
                      </span>
                    </div>

                    <div>
                      <span className="single-list__container-item-key">
                        Business Description:
                      </span>
                      <span className="single-list__container-item-value">
                        {singleCustomer?.businessDescription}
                      </span>
                    </div>
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
