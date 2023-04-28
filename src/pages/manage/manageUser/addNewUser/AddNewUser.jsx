import { Modal, Form, Input, notification, message } from "antd";

import { useDispatch } from "react-redux";

import { postCreateNewUser } from "~/services/Api";
import { getAllUserWithPaginate } from "~/redux/reducer/userReducer/userSlice";
const AddNewUser = ({ openAddUser, setOpenAddUser }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const getAllUser = async () => {
    let query = `pageSize=10&current=1&sort=-updatedAt`;
    dispatch(getAllUserWithPaginate(query));
  };

  const onFinish = async (values) => {
    const res = await postCreateNewUser(
      values.fullName,
      values.email,
      values.password,
      values.phoneNumber
    );
    console.log(res);
    if (res && res.data) {
      message.success("You have successfully created an account");
      await getAllUser();
      setOpenAddUser(false);
      form.resetFields();
    } else {
      notification.error({
        message: "Create failed",
        description:
          res?.message.length > 0 ? res.message : "An error has occurred",
        duration: 5,
      });
    }
  };
  const handleCancelModal = () => {
    setOpenAddUser(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Add new user"
        open={openAddUser}
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
