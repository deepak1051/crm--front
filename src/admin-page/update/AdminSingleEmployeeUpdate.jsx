import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleEmployee, updateEmployee } from '../../store';

const countryOptions = [
  {
    label: 'India',
    value: 'India',
  },
  {
    label: 'USA',
    value: 'USA',
  },
  {
    label: 'UK',
    value: 'UK',
  },
  {
    label: 'Dubai',
    value: 'Dubai',
  },
  {
    label: 'Germany',
    value: 'Germany',
  },
];

const roleOptions = [
  { value: 'Sales' },
  { value: 'Operation' },
  { value: 'Account' },
];

const AdminSingleEmployeeUpdate = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    country: '',
    address: '',
  });
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleEmployee({ id }))
      .unwrap()
      .then((user) => setUser(user))
      .catch((err) => console.log(err));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateEmployee({ ...user, id }))
      .unwrap()
      .then(() => navigate(`/admin/employees/${id}`))
      .catch((err) => console.log(err));
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Update Employee</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Name and surname</label>
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
                <label>Email</label>
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
                <label>Country</label>
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
                <label>Address</label>
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
                <label>Phone No.</label>
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
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={user.role}
                  onChange={handleChange}
                  name="role"
                  required
                >
                  {roleOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="formInput">
                <label>Light Yagami</label>
                <input
                  required
                  type="text"
                  placeholder="Light Yagami"
                  // name="status"
                  // onChange={handleChange}
                  // value={user.status}
                />
              </div> */}

              <br />
              <button>Save</button>
              {/* {error && <div className="error">error</div>} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleEmployeeUpdate;
