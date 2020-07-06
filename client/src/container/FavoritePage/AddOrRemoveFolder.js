import React from 'react';
import { Row, Col, Button } from 'antd';

const AddOrRemoveFolder = ({ data, folderId, type, addOrRemoveFun }) => {
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
                <Button
                  type="primary"
                  onClick={() => addOrRemoveFun(course.course_id, folderId)}
                >
                  {type}
                </Button>
              </Col>
            </Row>
          ))}
      </Col>
    </Row>
  );
};

export default AddOrRemoveFolder;
