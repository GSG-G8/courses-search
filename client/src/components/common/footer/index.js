import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import Logo from '../../../assets/icons/Logo';

import './style.css';

const info = () => {
  Modal.info({
    title: 'Course Search',
    content: (
      <div>
        <p>
          {' '}
          The place where you will find the best courses on the internet. With
          our app we want to help the people through searching among different
          platform about their favorite courses, by one click you will find all
          the top courses.
        </p>
      </div>
    ),
    onOk() {},
  });
};

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
      <div>
        <ul>
          <li>
            <a
              href="https://www.coursera.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coursera
            </a>
          </li>
          <li>
            <a
              href="https://www.udemy.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Udemy
            </a>
          </li>
          <li>
            <a
              href="https://www.futurelearn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              FutureLearn
            </a>
          </li>
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button type="button" onClick={info} className="footer__button">
              About
            </button>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
