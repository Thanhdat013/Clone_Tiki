import { Form, Input, Modal, message } from "antd"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { putUpdateUser } from "~/services/Api"

const UpdateUser = ({
  isModalOpenUpdate,
  setIsModalOpenUpdate,
  dataUpdate,
  setDataUpdate,
  getAllUser,
}) => {
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const res = await putUpdateUser(values._id, values.fullName, values.phone)

    if (res && +res.statusCode === 200) {
      message.success("Cập nhật người dùng thành công")
      await getAllUser()
      setIsModalOpenUpdate(false)
    } else {
      message.error("Cập nhật người dùng thất bại")
    }
  }
  const formRef = useRef(null)
  useEffect(() => {
    if (formRef.current) {
      form.setFieldsValue(dataUpdate)
    }
  }, [dataUpdate])

  const [form] = Form.useForm()
  const handleCancelModal = () => {
    setDataUpdate("")
    setIsModalOpenUpdate(false)
  }
  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={isModalOpenUpdate}
        onOk={() => {
          form.submit()
        }}
        onCancel={handleCancelModal}
        width={500}
        okText={"Cập nhật"}
        cancelText={"Hủy bỏ"}
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
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
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
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UpdateUser
