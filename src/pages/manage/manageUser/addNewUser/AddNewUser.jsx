import { Modal, Form, Input, notification } from "antd";

import { useDispatch } from "react-redux";

import { postCreateNewUser } from "~/services/Api";
import { doAddUserAction } from "~/redux/reducer/userReducer/userSlice";

const AddNewUser = ({
  isModalOpen,
  setIsModalOpen,
  handleCancelModal,
  handleOk,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const res = await postCreateNewUser(
      values.fullName,
      values.email,
      values.password,
      values.phoneNumber
    );
    console.log(res);
    if (res && res.data) {
      notification.success("You have successfully created an account");
      dispatch(doAddUserAction(res.data));
    } else {
      notification.error({
        message: "Create failed",
        description:
          res?.message.length > 0 ? res.message : "An error has occurred",
        duration: 5,
      });
    }
  };

  return (
    <>
      <Modal
        title="Add new user"
        open={isModalOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancelModal}
        width={1000}
        okText={"Create"}
      >
        <Form
          name="addNewUserForm"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical "
          form={form}
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
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewUser;
