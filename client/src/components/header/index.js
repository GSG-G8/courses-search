import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style.css';
import { Modal } from 'antd';
import { FaBookmark, FaUserAlt } from 'react-icons/all';
// import Axios from 'axios';
import Logo from '../../assets/Logo.svg';
import { AuthContext } from '../../container/authContext';

const Header = () => {
  const { userInfo, isAuth, showLoginModal } = useContext(AuthContext);

  // const logout = () => Axios.get('/api/v1/logout');

  const info = () => {
    Modal.info({
      title: 'Course Search',
      content: (
        <div>
          <p>
            {' '}
            The place where you will find the best courses on the internet. With
            our app we want to help the people through searching among different
            platform about their favorite courses, by one click you will find
            all the top courses.
          </p>
        </div>
      ),
      onOk() {},
    });
  };
  return (
    <div className="header-container">
      <div className="header-left">
        <Link to="/">
          <img className="header__logo" src={Logo} alt=" logo" />
        </Link>
        <div className="header__list">
          <ul>
            <li>
              <NavLink
                className="home__list"
                exact
                to="/"
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li>
              <button className="about" type="button" onClick={info}>
                About
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="header-left">
        <button className="header_left__button" type="button">
          <FaBookmark />
        </button>
        {isAuth ? (
          <>
            Hi {userInfo.name}
            <button
              type="button"
              // onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="header_left__button"
            type="button"
            onClick={showLoginModal}
          >
            <FaUserAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
