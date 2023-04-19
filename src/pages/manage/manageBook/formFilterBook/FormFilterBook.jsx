import { useRef } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import "./FormFilterBook.scss";

const FormFilterBook = ({ handleFilter }) => {
  const formRef = useRef();
  const onFinish = (values) => {
    let filter = "";
    if (values && values.author) {
      filter += `&author=/${values.author}/i`;
    }
    if (values && values.Name) {
      filter += `&fullName=/${values.Name}/i`;
    }
    if (values && values.Phone) {
      filter += `&phone=/${values.Phone}/i`;
    }
    if (filter) handleFilter(filter);
  };

  const onReset = () => {
    formRef.current?.resetFields();
    handleFilter(formRef.current);
  };

  return (
    <Form
      className="form__filter"
      name="basic"
      onFinish={onFinish}
      ref={formRef}
      autoComplete="off"
      layout="vertical"
    >
      <Row gutter={24}>
        {" "}
        <Col span={8}>
          <Form.Item name="author" label="Author">
            <Input placeholder="Enter author" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="mainText" label="Name book">
            <Input placeholder="Enter name book" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="category" label="Category">
            <Input placeholder="Enter category" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={onReset}
            htmlType="button"
            style={{ margin: "0 8px" }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormFilterBook;
