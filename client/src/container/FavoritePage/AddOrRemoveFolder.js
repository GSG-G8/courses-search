import React from 'react';
import { Row, Col, Button } from 'antd';

import { addCourseToFolder, removeCourseFromFolder } from './functions';

const AddOrRemoveFolder = ({
  data,
  folderId,
  type,
  allFavoriteData,
  setDisplayFavoriteData,
  displayFavoriteData,
  setAllFavoriteData,
}) => {
  const condition = (course) =>
    type === 'Add'
      ? course.folder_id !== Number(folderId)
      : course.folder_id === Number(folderId);

  return (
    <Row style={{ width: '100%' }}>
      <Col span={24}>
        <h3>{type} Course</h3>
      </Col>
      <Col span={24}>
        {data
          .filter((course) => condition(course))
          .map((course) => (
            <Row style={{ width: '100%' }}>
              <Col span={18}>{course.title.substring(0, 50)}</Col>
              <Col span={6}>
                {type === 'Add' ? (
                  <Button
                    type="primary"
                    onClick={() =>
                      addCourseToFolder(
                        course.course_id,
                        folderId,
                        allFavoriteData,
                        setDisplayFavoriteData,
                        displayFavoriteData,
                        setAllFavoriteData
                      )
                    }
                  >
                    {type}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() =>
                      removeCourseFromFolder(
                        course.course_id,
                        folderId,
                        allFavoriteData,
                        setDisplayFavoriteData,
                        displayFavoriteData,
                        setAllFavoriteData
                      )
                    }
                  >
                    {type}
                  </Button>
                )}
              </Col>
            </Row>
          ))}
      </Col>
    </Row>
  );
};

export default AddOrRemoveFolder;
