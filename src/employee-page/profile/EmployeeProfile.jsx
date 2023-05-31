import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Chart from '../../extra/chart/Chart';
import { fetchSingleEmployee } from '../../store';

const EmployeeProfile = () => {
  const { singleEmployee } = useSelector((state) => state.admin);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleEmployee({ id }));
  }, [dispatch, id]);

  return (
    <div
      className="single"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="top">
        <div className="left">
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              src={`https://picsum.photos/seed/${id}/300/200`}
              alt=""
              className="itemImg"
            />
            <div className="single-list__container">
              <h1
                className="itemTitle"
                style={{
                  textAlign: 'center',

                  width: '100%',
                  padding: '5px 0',
                }}
              >
                {singleEmployee.name}
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
    </div>
  );
};

export default EmployeeProfile;
