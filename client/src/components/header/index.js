import React, { useContext } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './style.css';
import { Modal, Menu, Dropdown } from 'antd';
import { FaBookmark, FaUserAlt, AiFillHome, IoMdLogOut } from 'react-icons/all';
import Logo from '../../assets/Logo.svg';
import { AuthContext } from '../../container/authContext';

const Header = ({ history }) => {
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
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => history.push('/')}>
        <AiFillHome />
        Home
      </Menu.Item>

      {isAuth && (
        <Menu.Item key="2" onClick={() => history.push('/FavoritePage')}>
          <FaBookmark />
          FavoritePage
        </Menu.Item>
      )}
      {isAuth && (
        <Menu.Item
          key="3"
          // onClick={logout}
        >
          <IoMdLogOut />
          logout
        </Menu.Item>
      )}
    </Menu>
  );
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
              <button
                className="header__list__button"
                type="button"
                onClick={info}
              >
                About
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="header-right">
        {/* <button className="header_Right__button" type="button">
          <FaBookmark />
        </button> */}

        {isAuth ? (
          <>
            <Dropdown.Button
              className="header-right__dropdown-menu"
              overlay={menu}
              icon={<FaUserAlt />}
            >
              <AuthContext>{() => `Hello, ${userInfo.name}!`}</AuthContext>
            </Dropdown.Button>
            {/* Hi {userInfo.name}
            <button
              type="button"
              // onClick={logout}
            >
              Logout
            </button> */}
          </>
        ) : (
          <button
            className="header_Right__button"
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

export default withRouter(Header);
