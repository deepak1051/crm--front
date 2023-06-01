import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit, AiOutlineUser } from 'react-icons/ai';
import Chart from '../../extra/chart/Chart';
import { fetchSingleEmployee } from '../../store';

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

const default_img =
  'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=740&t=st=1685609599~exp=1685610199~hmac=c8d8f239a28668434bbcd8177d2141a2495fa383861c41077b42e5f381ebedf8';
const EmployeeProfile = () => {
  const [postImage, setPostImage] = useState(() =>
    localStorage.getItem('logo')
  );
  const { singleEmployee } = useSelector((state) => state.admin);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleEmployee({ id }));
  }, [dispatch, id]);

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // const base64 = await convertToBase64(file);

    setPostImage(base64);

    localStorage.setItem('logo', base64);
  };

  return (
    <div
      className="single"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="top">
        <div className="left">
          <h1 className="title">Information</h1>

          <div style={{ position: 'relative' }}>
            <img
              src={postImage ? postImage : default_img}
              alt=""
              style={{ width: '125px', height: '125px' }}
            />
            <label
              htmlFor="pic"
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '70%',
                right: '20%',
                border: '1px solid black',
                background: 'white',
                padding: '5px',
                borderRadius: '5px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Edit
              <AiOutlineEdit />
            </label>
            <input
              type="file"
              label="Image"
              accept=".png, .jpg, .jpeg"
              name="profilePic"
              id="pic"
              onChange={handlePhoto}
              style={{ display: 'none' }}
            />
          </div>

          <div className="item">
            {/* <img
              src={`https://picsum.photos/seed/${id}/300/200`}
              alt=""
              className="itemImg"
            /> */}
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
