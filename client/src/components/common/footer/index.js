import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/icons/Logo';

import './style.css';

const Footer = () => (
  <footer className="footer container">
    <section className="app-info">
      <Logo />
      <p className="footer__p1">
        The place where you will find the best courses on the internet.
      </p>
      <p className="footer__p2">
        With our app we want to help the people through searching among
        different platform about their favorite courses, by one click you will
        find all the top courses.{' '}
      </p>
    </section>
    <div className="footer__lists">
      <div className="footer__list1">
        <ul>
          <li>
            <Link to="./">Home</Link>
          </li>
          <li>
            <Link to="./">Team Members</Link>
          </li>
          <li>
            <a href="https://www.coursera.org/">Coursera</a>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <a href="https://www.udemy.com/">Udemy</a>
          </li>
          <li>
            <a href="https://www.futurelearn.com">Future Learn</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
