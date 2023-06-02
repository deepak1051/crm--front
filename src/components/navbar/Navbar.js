import './navbar.scss';
import { GiCrossMark } from 'react-icons/gi';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import { useState } from 'react';

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

const Navbar = () => {
  const [postImage, setPostImage] = useState(() =>
    localStorage.getItem('logo')
  );

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // const base64 = await convertToBase64(file);

    setPostImage(base64);

    localStorage.setItem('logo', base64);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div
          className="left"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '2rem',
            color: 'royalblue',
          }}
        >
          <GiCrossMark />
          <img
            src="https://pacifencesolutions.com/wp-content/uploads/2021/11/300x300-px.png"
            alt=""
          />
        </div>

        <div className="items">
          <a
            href="https://pacifencesolutions.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'inherit' }}
          >
            <div
              className="item"
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
            >
              <LanguageOutlinedIcon className="icon" />
              Pacifence Solutions
            </div>{' '}
          </a>
          <div style={{ margin: '0 10px' }}>
            {/* <p>{singleEmployee.name}</p> */}
            {/* <p>{singleEmployee.email}</p> */}
          </div>
          {/* <div className="item">
            <img
              src={localStorage.getItem('logo') }
              alt=""
              className="avatar"
            />
          </div> */}

          <div>
            <label
              htmlFor="pic"
              style={{
                cursor: 'pointer',

                background: 'white',

                borderRadius: '15px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <img
                src={postImage ? postImage : default_img}
                alt=""
                style={{ width: '42px', height: '42px', borderRadius: '50%' }}
              />
              {/* Edit
              <AiOutlineEdit /> */}
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;

//"https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
