import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getSingleCustomer, deleteSingleCustomer } from "../../store";
import "../styles/single.scss";

const EmployeeSingleCustomer = () => {
  const { singleCustomer } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleCustomer({ id }));
  }, [dispatch, id]);
  const handleDelete = () => {
    if (window.confirm("Do you really want to remove this customer.")) {
      dispatch(deleteSingleCustomer({ id }))
        .unwrap()
        .then(() => navigate("/employee/customers-list"))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div
      className="single"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="top">
        <div className="left-side">
          <div>
            <Link to={`/employee/customers/${id}/update`}>
              <button className="edit" style={{ marginRight: "5px" }}>
                Edit
              </button>
            </Link>
            <button onClick={() => handleDelete()} className="remove">
              Delete
            </button>
          </div>
          <h1 className="title">Customer Information</h1>
          <div className="item">
            <img
              src={`https://picsum.photos/seed/${id}/300/200`}
              alt=""
              className="itemImg"
            />
            <div className="single-list__container">
              <h1 className="itemTitle">{singleCustomer.name}</h1>
              <div>
                <span className="single-list__container-item-key">Email:</span>
                <span className="single-list__container-item-value">
                  {singleCustomer.email}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">Phone:</span>
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
                <span className="single-list__container-item-key">Status:</span>
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
  );
};

export default EmployeeSingleCustomer;
