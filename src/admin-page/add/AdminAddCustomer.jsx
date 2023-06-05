import React from "react";
import "../styles/add.scss";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewCustomer } from "../../store";

const countryOptions = [
  {
    label: "India",
    value: "India",
  },
  {
    label: "USA",
    value: "USA",
  },
  {
    label: "UK",
    value: "UK",
  },
  {
    label: "Dubai",
    value: "Dubai",
  },
  {
    label: "Germany",
    value: "Germany",
  },
];
const statusOptions = [
  { value: "Success" },
  { value: "Pending" },
  { value: "Rejected" },
];

const AdminAddCustomer = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    country: "India",
    address: "",
    status: "Success",
    businessName: "",
    businessDescription: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewCustomer(user))
      .unwrap()
      .then(() => navigate("/admin/customers-list"))
      .catch((err) => setError(err));
  };

  return (
    <>
      <div className="top">
        <h1>Add New Customer</h1>
      </div>
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Customer Full Name </label>
              <input
                type="text"
                placeholder="john doe"
                name="name"
                onChange={handleChange}
                required
                value={user.name}
              />
            </div>
            <div className="formInput">
              <label>Customer Email</label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
              />
            </div>

            <div className="formInput">
              <label>Customer Country</label>
              <select
                id="favColor"
                value={user.country}
                onChange={handleChange}
                name="country"
                required
              >
                {countryOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="formInput">
              <label>Customer Full Address</label>
              <input
                required
                type="text"
                placeholder="Elton st. 216 NewYork"
                name="address"
                onChange={handleChange}
                value={user.address}
              />
            </div>
            <div className="formInput">
              <label>Customer Phone No.</label>
              <input
                required
                type="text"
                placeholder="9784823451"
                name="phone"
                onChange={handleChange}
                value={user.phone}
              />
            </div>

            <div className="formInput">
              <label htmlFor="role">Status</label>
              <select
                id="role"
                value={user.status}
                onChange={handleChange}
                name="status"
                required
              >
                {statusOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            {/* business Name */}
            <div className="formInput">
              <label htmlFor="businessName">Customer Business Name</label>
              <input
                id="businessName"
                value={user.businessName}
                onChange={handleChange}
                name="businessName"
                required
              />
            </div>
            {/* business description */}
            <div className="formInput">
              <label htmlFor="businessDescription">
                Customer Business Detail
              </label>
              <textarea
                id="businessDescription"
                value={user.businessDescription}
                onChange={handleChange}
                name="businessDescription"
                required
              />
            </div>

            <br />
            <button>Save Customer</button>
            {error && <div className="error">error</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddCustomer;
