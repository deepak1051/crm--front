import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit, AiOutlineUser } from 'react-icons/ai';
import Chart from '../../extra/chart/Chart';
import { fetchSingleEmployee } from '../../store';
import instance from '../../utils/instance';

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// }

const default_img =
  'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=740&t=st=1685609599~exp=1685610199~hmac=c8d8f239a28668434bbcd8177d2141a2495fa383861c41077b42e5f381ebedf8';

const EmployeeProfile = () => {
  const [postImage, setPostImage] = useState('');
  const { singleEmployee } = useSelector((state) => state.admin);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleEmployee({ id }));
  }, [dispatch, id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    console.log('file', file);
    setPostImage(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(postImage);
    const formData = new FormData();
    formData.append('profilePic', postImage);

    console.log(postImage);

    await instance.patch('/employee/updateProfilePic', formData, {
      headers: {
        'content-type': 'multipart/form-data',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmIzNDgxZmY5YjE4YWZhNGY4NTM2OSIsInJvbGUiOiJBY2NvdW50IiwiaWF0IjoxNjg1NjE1MTY4LCJleHAiOjE2ODYyMTk5Njh9.R0WW8czaq0hKSx8hdkj6ZI2o2aYUQ1BioA1tINUzpCI',
      },
    });
  };

  console.log(singleEmployee);

  return (
    <div
      className="single"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="top">
        <div className="left">
          <h1 className="title">Information</h1>

          <form style={{ position: 'relative' }}>
            <img
              // src={postImage ? postImage : default_img}
              src={
                singleEmployee.image
                  ? `https://api.pacifencesolutions.com/${singleEmployee.image}`
                  : default_img
              }
              alt=""
              style={{ width: '125px', height: '125px' }}
            />
            {/* <label
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
            </label> */}
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="profilePic"
              id="pic"
              onChange={handleChange}
              // style={{ display: 'none' }}
            />

            <button onClick={handleUpload}>upload</button>
          </form>

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
