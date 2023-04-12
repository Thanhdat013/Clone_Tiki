import React, { useState } from "react";
import { Button, Form, Input, notification, message } from "antd";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { postLogin } from "~/redux/reducer/userReducer/userSlice";
import { postLogin } from "~/services/Api";
import { doLoginAction } from "~/redux/reducer/userReducer/userSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const onFinish = async (values) => {
    setIsLoading(true);
    if (!values.email.length || !emailRegex.test(values.email)) {
      notification.error({
        message: "Registration failed",
        description: "Email is incorrect",
        duration: 5,
      });
      return;
    }
    let res = await postLogin(values.email, values.password, 2000);
    setIsLoading(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("You have successfully login");
      navigate("/");
    } else {
      notification.error({
        message: "Login failed",
        description:
          res?.message.length > 0 ? res.message : "An error has occurred",
        duration: 5,
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) onFinish();
  };

  const navigate = useNavigate();
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
          <h3 className="login__title">Sign in to Tiki</h3>
        </div>

        <Form
          name="basic"
          onFinish={onFinish}
          className="login__form"
          autoComplete="off"
          layout="vertical "
          initialValues={{ prefix: "+84" }}
        >
          <Form.Item
            onKeyDown={handleKeyDown}
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            onKeyDown={handleKeyDown}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit "
              className="login__button"
              loading={isLoading}
            >
              Log in
            </Button>

            <p className="login__desc">
              {" "}
              Do not have an account?
              <span
                className="login__register"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
