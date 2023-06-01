import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
const AdminWrapper = () => {
  const [role, setRole] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);

      setRole(role);
    }
  }, [token, role]);

  if (!role)
    return (
      <h1>
        you are not authenticate to see this route{' '}
        <Link to="/">Go to homepage </Link> first.
      </h1>
    );
  if (role === 'Admin') {
    return (
      <div className="home">
        <Sidebar />

        <div className="home-container">
          <Navbar />

          <Outlet />
        </div>
      </div>
    );
  }
};

export default AdminWrapper;
