import './navbar.scss';
import { GiCrossMark } from 'react-icons/gi';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const Navbar = () => {
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

          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
