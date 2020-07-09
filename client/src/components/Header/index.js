import React, { useContext } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './style.css';
import { Modal, Menu, Dropdown } from 'antd';
import { FaBookmark, FaUserAlt, AiFillHome, IoMdLogOut } from 'react-icons/all';
import Logo from '../../assets/Logo.svg';
import { AuthContext } from '../../container/authContext';
import { FAVORITEPAGE, LANDING } from '../../constants/router';

const Header = ({ history }) => {
  const { userInfo, isAuth, signOut, signIn, loaded } = useContext(AuthContext);

  const info = () => {
    Modal.info({
      title: 'Course Search',
      content: (
        <p>
          The place where you will find the best courses on the internet. With
          our app we want to help the people through searching among different
          platform about their favorite courses, by one click you will find all
          the top courses.
        </p>
      ),
    });
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => history.push(LANDING)}>
        <AiFillHome />
        Home
      </Menu.Item>

      {isAuth && (
        <Menu.Item key="2" onClick={() => history.push(FAVORITEPAGE)}>
          <FaBookmark />
          Favorite
        </Menu.Item>
      )}
      {isAuth && (
        <Menu.Item key="3" onClick={signOut}>
          <IoMdLogOut />
          logout
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <div className="header-container">
      <div className="header-left">
        <Link to={LANDING}>
          <img className="header__logo" src={Logo} alt=" logo" />
        </Link>
        <div className="header__list">
          <ul>
            <li>
              <NavLink
                className="header__list--home"
                exact
                to={LANDING}
                activeClassName="header__list--active"
              >
                Home
              </NavLink>
            </li>
            {isAuth && (
              <li>
                <NavLink
                  className="header__list--home"
                  exact
                  to={FAVORITEPAGE}
                  activeClassName="header__list--active"
                >
                  Favorite
                </NavLink>
              </li>
            )}
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
        {isAuth ? (
          <Dropdown.Button overlay={menu} icon={<FaUserAlt />}>
            {`Hello, ${userInfo.givenName}!`}
          </Dropdown.Button>
        ) : (
          <button
            className="header-right__button"
            type="button"
            onClick={signIn}
            disabled={!loaded}
          >
            <FaUserAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
