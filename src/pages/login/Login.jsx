import { Button, Form, Input, message, notification } from "antd"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./Login.scss"

import { doLoginAction } from "~/redux/reducer/userReducer/userSlice"
import { postLogin } from "~/services/Api"

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [disabledLogin, setDisabledLogin] = useState(true)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    setIsLoading(true)

    const { email, password } = values
    let res = await postLogin(email, password, 500)
    setIsLoading(false)
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token)

      await dispatch(doLoginAction(res.data.user))

      message.success("Bạn đã đăng nhập thành công")
      navigate("/")
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description:
          res?.message.length > 0
            ? res.message
            : "Đã có lỗi xảy ra, vui lòng thử lại",
        duration: 5,
      })
    }
  }
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) onFinish()
  }
  const handleValuesChange = (allValues) => {
    if (allValues) setDisabledLogin(false)
  }
  const navigate = useNavigate()
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__wrap">
          <img
            src="https://atplink.com/blog/wp-content/uploads/2021/06/z.jpg"
            alt="logo"
            className="login__logo"
            onClick={() => navigate("/")}
          />
          <h3 className="login__title">Đăng nhập vào Tiki</h3>
        </div>
        <Form
          name="basic"
          onFinish={onFinish}
          className="login__form"
          autoComplete="off"
          layout="vertical "
          labelAlign={"center"}
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            labelCol={{ md: 22, xs: 22, sm: 22, lg: 22 }}
            onKeyDown={handleKeyDown}
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ md: 22, xs: 22, sm: 22, lg: 22 }}
            onKeyDown={handleKeyDown}
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạns!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit "
              className="login__button"
              loading={isLoading}
              disabled={disabledLogin}
            >
              Đăng nhập
            </Button>

            <p className="login__desc">
              {" "}
              Bạn chưa có tài khoản?
              <span
                className="login__register"
                onClick={() => navigate("/register")}
              >
                Đăng kí
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
