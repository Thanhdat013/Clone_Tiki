import React, { useState } from "react";
import { Button, Select, Form, Input, notification, message } from "antd";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRegister } from "~/services";

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Select.Option value="84">+84</Select.Option>
      <Select.Option value="85">+85</Select.Option>
    </Select>
  </Form.Item>
);

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);
    let res = await postRegister(
      values.fullName,
      values.email,
      values.password,
      values.phoneNumber
    );
    setIsLoading(false);
    if (res?.data?._id) {
      console.log(res);
      message.success("You have successfully registered an account");
      navigate("/login");
    } else {
      notification.error({
        message: "Registration failed",
        description:
          res?.message.length > 0 ? res.message : "An error has occurred",
        duration: 5,
      });
    }
  };

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
          <h3 className="register__title">Register for an account Tiki</h3>
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
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
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
              Register
            </Button>
            <p className="register__desc">
              {" "}
              Do you already have an account?
              <span
                className="register__login"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
