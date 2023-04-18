import { Modal, Form, Input, notification, message } from "antd";
import { useEffect, useRef } from "react";
import { putUpdateUser } from "~/services/Api";

const UpdateUser = ({
  isModalOpenUpdate,
  setIsModalOpenUpdate,
  dataUpdate,
}) => {
  const onFinish = async (values) => {
    console.log(values);
    const res = await putUpdateUser(values._id, values.fullName, values.phone);
    console.log(res);
  };
  const formRef = useRef(null);
  useEffect(() => {
    if (formRef.current) form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  const [form] = Form.useForm();
  const handleCancelModal = () => {
    setIsModalOpenUpdate(false);
  };
  return (
    <>
      <Modal
        title="Update new user"
        open={isModalOpenUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancelModal}
        width={500}
        okText={"Update"}
      >
        <Form
          name="updateUserForm"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical "
          form={form}
          ref={formRef}
        >
          <Form.Item label="id" name="_id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phone"
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

export default UpdateUser;
