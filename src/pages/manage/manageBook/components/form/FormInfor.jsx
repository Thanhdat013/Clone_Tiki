import { Form, Input, InputNumber, Row, Col, Select } from "antd";
const FormInfor = ({ listCategory }) => {
  return (
    <Row gutter={24}>
      {" "}
      <Col span={12}>
        <Form.Item
          label="Tên sách"
          name="mainText"
          rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Tác giả"
          name="author"
          rules={[{ required: true, message: "Vui lòng nhập tên tác giả!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
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
          label="Thể loại"
          name="category"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng nhập thể loại!" }]}
        >
          <Select
            placeholder="Vui lòng chọn thể loại"
            allowClear
            showSearch
            options={listCategory}
          ></Select>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
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
          label="Đã bán"
          name="sold"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng đã bán!" },
          ]}
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
