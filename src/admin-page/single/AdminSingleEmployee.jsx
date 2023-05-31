import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Chart from '../../extra/chart/Chart';
import { fetchSingleEmployee } from '../../store';
import AllTaskByEmployee from '../task/AllTaskByEmployee';
import Skeleton from 'react-loading-skeleton';
import useThunk from '../../hooks/useThunk';

const AdminSingleEmployee = () => {
  const { singleEmployee } = useSelector((state) => state.admin);
  const [fetchEmployee, isLoading, error] = useThunk(fetchSingleEmployee);

  const { id } = useParams();

  useEffect(() => {
    fetchEmployee({ id });
  }, [fetchEmployee, id]);

  let content;
  if (isLoading) {
    content = (
      <>
        <Skeleton
          count={1}
          height={60}
          width={60}
          circle={true}
          style={{
            textAlign: 'center',
            margin: '0 auto',
          }}
        />
        <Skeleton count={1} height={200} width={400} />
      </>
    );
  } else if (error) {
    content = <div>Error Fetching Employee...</div>;
  } else {
    content = (
      <div className="top" style={{ marginRight: '20px' }}>
        <div className="left">
          <Link to={`/admin/employees/${id}/update`}>
            <button className="edit">Edit</button>
          </Link>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              src={`https://picsum.photos/seed/${id}/300/200`}
              alt=""
              className="itemImg"
            />
            <div className="single-list__container">
              <h1 className="itemTitle">
                Employee Name: {singleEmployee.name}
              </h1>
              <div>
                <span className="single-list__container-item-key">Email:</span>
                <span className="single-list__container-item-value">
                  {singleEmployee.email}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">Phone:</span>
                <span className="single-list__container-item-value">
                  {singleEmployee.phone}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Address:
                </span>
                <span className="single-list__container-item-value">
                  {singleEmployee.address}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Country:
                </span>
                <span className="single-list__container-item-value">
                  {singleEmployee.country}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">Role:</span>
                <span className="single-list__container-item-value">
                  {singleEmployee.role}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="single"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {content}
      <AllTaskByEmployee />
    </div>
  );
};

export default AdminSingleEmployee;
