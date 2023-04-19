import { Form, Input, InputNumber, Row, Col, Select } from "antd";
const FormInfor = ({ listCategory }) => {
  return (
    <Row gutter={24}>
      {" "}
      <Col span={12}>
        <Form.Item
          label="Book title"
          name="mainText"
          rules={[{ required: true, message: "Please input your book title!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please input your author!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <InputNumber
            addonAfter={"VND"}
            style={{ width: "100%" }}
            formatter={(value) =>
              value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            }
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label="Category"
          name="category"
          hasFeedback
          rules={[{ required: true, message: "Please input your category!" }]}
        >
          <Select
            placeholder="Please select category"
            allowClear
            showSearch
            options={listCategory}
          ></Select>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input your quantity!" }]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            formatter={(value) =>
              value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            }
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label="Sold"
          name="sold"
          rules={[{ required: true, message: "Please input your sold!" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            }
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormInfor;
