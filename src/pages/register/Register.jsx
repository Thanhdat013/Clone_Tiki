import { Button, Form, Input, Select, message, notification } from "antd"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { postRegister } from "~/services"
import "./Register.scss"

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Select.Option value="84">+84</Select.Option>
      <Select.Option value="85">+85</Select.Option>
    </Select>
  </Form.Item>
)

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setIsLoading(true)
    let res = await postRegister(
      values.fullName,
      values.email,
      values.password,
      values.phoneNumber
    )
    setIsLoading(false)
    if (res?.data?._id) {
      message.success("Bạn đã đăng ký tài khoản thành công")
      navigate("/login")
    } else {
      notification.error({
        message: "Đăng ký tài khoản thất bại",
        description:
          res?.message.length > 0
            ? res.message
            : "Đã có lỗi xảy ra, vui lòng thử lại",
        duration: 5,
      })
    }
  }

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__wrap">
          <img
            src="https://atplink.com/blog/wp-content/uploads/2021/06/z.jpg"
            alt="logo"
            className="register__logo"
            onClick={() => navigate("/")}
          />
          <h3 className="register__title">Đăng ký tài khoản với Tiki</h3>
        </div>

        <Form
          name="basic"
          onFinish={onFinish}
          className="register__form"
          autoComplete="off"
          layout="vertical "
          initialValues={{ prefix: "+84" }}
        >
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng điền tên của bạn !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng điền email của bạn!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Vui lòng điền mật khẩu của bạn!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng điền số điện thoại của bạn number!",
              },
            ]}
          >
            <Input />
            {/* <Input addonBefore={prefixSelector} style={{ width: "100%" }} /> */}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit "
              className="register__button"
              loading={isLoading}
            >
              Đăng ký
            </Button>
            <p className="register__desc">
              {" "}
              Bạn đã có tài khoản?
              <span
                className="register__login"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
