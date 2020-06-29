import React, { useState, useEffect } from 'react';
import { notification, Button, Spin, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useHistory } from 'react-router-dom';
// import { object } from 'prop-types';
import axios from 'axios';
import categories from '../../assets/categories';
import './style.css';

const { SubMenu } = Menu;

const HomePage = () => {
  const rootSubmenuKeys = ['sub1'];

  const [loading, isLoading] = useState(true);
  const [topCourses, setTopCourses] = useState([]);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const history = useHistory();

  const onOpenChange = (openKeysParams) => {
    const latestOpenKey = openKeysParams.find(
      (key) => openKeys.indexOf(key) === -1
    );

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys([...openKeysParams]);
    } else {
      const test = latestOpenKey ? [latestOpenKey] : [];
      setOpenKeys([...test]);
    }
  };

  const fetchTopCourses = async () => {
    try {
      const { data } = await axios.get(`/api/v1/topCourses`);
      setTopCourses(data);
      isLoading(false);
    } catch (err) {
      notification.error(err);
    }
  };
  const handleClick = (id) => {
    history.push(`/detailsPage/${id}`);
  };
  useEffect(() => {
    fetchTopCourses();
  }, []);

  const fetchCategoryCourses = async (categoryId) => {
    try {
      const { data } = await axios.get(`/api/v1/${categoryId}/courses`);
      setTopCourses(data);
      isLoading(false);
    } catch (err) {
      notification.error(err);
    }
  };

  return (
    <>
      <div className="Home">
        {loading && <Spin />}

        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 256 }}
        >
          {categories.map(({ title: main, children }) => (
            <SubMenu
              key={main}
              title={
                <span>
                  <span>{main}</span>
                </span>
              }
            >
              {children.map(({ title, value }) => (
                <Menu.Item
                  icon={<MenuOutlined />}
                  key={value}
                  onClick={({ key }) => fetchCategoryCourses(key)}
                >
                  {title}
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </div>

      {topCourses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <img alt="courseImg" src={course.image} />
          <p>Rate: {course.rate}</p>
          <h3>{course.source}</h3>
          <Button onClick={() => handleClick(course.id)} type="primary">
            {' '}
            More
          </Button>
        </div>
      ))}
    </>
  );
};

export default HomePage;
