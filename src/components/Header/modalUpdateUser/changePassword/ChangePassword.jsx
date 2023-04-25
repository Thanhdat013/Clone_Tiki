import { Form, Input, Row, Col, message, Button, notification } from "antd";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postChangePassword } from "~/services/Api";

const ChangePassword = ({ open, setOpen }) => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const handleCancelDelete = () => {
    form.resetFields();
    setOpen(false);
  };
  const handleChangePassword = async (values) => {
    console.log(values);
    const { email, password, newPassword, rePassword } = values;
    if (newPassword !== rePassword) {
      notification.error({
        message: "Thay đổi mật khẩu thất bại",
        description: "Mật khẩu mới không trùng khớp, vui lòng thử lại",
      });
      return;
    }
    const res = await postChangePassword(email, password, newPassword);
    console.log(res);
    if (res && res.data) {
      message.success("Thay đổi mật khẩu thành công");
      form.resetFields();
      setOpen(false);
    } else {
      notification.error({
        message: "Thay đổi mật khẩu thất bại",
        description: res.message,
      });
    }
  };

  const [form] = Form.useForm();

  // get information of user
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);
  return (
    <>
      <Row gutter={8}>
        <Col span={24} sm={24} md={24} xs={24}>
          <Form
            name="Thay đổi mật khẩu"
            onFinish={handleChangePassword}
            autoComplete="off"
            layout="vertical "
            form={form}
            onCancel={handleCancelDelete}
          >
            <Form.Item label="id" name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Nhập mật khẩu cũ"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu của bạn" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu mới của bạn!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu mới"
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu mới của bạn!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                style={{ marginRight: "12px" }}
                onClick={handleCancelDelete}
              >
                Hủy bỏ
              </Button>
              <Button type="primary" onClick={() => form.submit()}>
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
