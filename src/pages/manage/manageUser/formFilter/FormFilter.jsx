import { useRef } from "react"
import { Button, Form, Input, Row, Col } from "antd"
import "./FormFilter.scss"

const FormFIlter = ({ handleFilter }) => {
  const formRef = useRef()
  const onFinish = (values) => {
    let filter = ""
    if (values && values.Email) {
      filter += `&email=/${values.Email}/i`
    }
    if (values && values.Name) {
      filter += `&fullName=/${values.Name}/i`
    }
    if (values && values.Phone) {
      filter += `&phone=/${values.Phone}/i`
    }
    if (filter) handleFilter(filter)
  }

  const onReset = () => {
    formRef.current?.resetFields()
    handleFilter(formRef.current)
  }

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
          <Form.Item name="Email" label="Email">
            <Input placeholder="Nhập email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="Name" label="Người dùng">
            <Input placeholder="Nhập tên người dùng" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="Phone" label="Số điện thoại">
            <Input placeholder="Nhập số điện thoại" />
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
  )
}

export default FormFIlter
