import { Form, Input, Modal, message, notification } from "antd";

import { useDispatch } from "react-redux";

import { getAllUserWithPaginate } from "~/redux/reducer/userReducer/userSlice";
import { postCreateNewUser } from "~/services/Api";
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
    if (res && res.data) {
      message.success("Bạn đã tạo mới tâì khoản thành công");
      await getAllUser();
      setOpenAddUser(false);
      form.resetFields();
    } else {
      notification.error({
        message: "Tạo mới thất bại",
        description:
          res?.message.length > 0
            ? res.message
            : "Đã có lỗi xảy ra, vui lòng thử lại",
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
        title="Tạo mới người dùng"
        open={openAddUser}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancelModal}
        width={1000}
        okText={"Tạo"}
        cancelText={"Hủy bỏ"}
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
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
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
                message: "Vui lòng nhập số điện thoại của bạn number!",
              },
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
