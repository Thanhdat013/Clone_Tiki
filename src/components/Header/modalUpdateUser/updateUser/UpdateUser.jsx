import { UploadOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Form, Input, Row, Upload, message } from "antd"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import localStorage from "redux-persist/es/storage"
import {
  doUpdateAvatarAction,
  doUpdateUser,
} from "~/redux/reducer/userReducer/userSlice"
import { postUpdateAvatar, putUpdateUserByUser } from "~/services/Api"

const UpdateUser = ({ open, setOpen }) => {
  const user = useSelector((state) => state.users.user)
  const dispatch = useDispatch()

  const handleCancelUpdate = () => {
    form.resetFields()
    setOpen(false)
  }
  // submit update avatar
  const handleUpdateUser = async (values) => {
    if (dataAvatar === "") setDataAvatar(user?.avatar)
    const { id, fullName, phone } = values
    const res = await putUpdateUserByUser(id, fullName, phone, dataAvatar)

    if (res && res.data) {
      //update redux
      dispatch(doUpdateUser({ fullName, phone, avatar: dataAvatar }))
      message.success("Cập nhật người dùng thành công")

      // force renew token
      localStorage.removeItem("access_token")
    } else {
      message.error("Cập nhật người dùng thất bại")
    }
    setOpen(false)
  }
  const formRef = useRef(null)

  const [form] = Form.useForm()
  // set avatar when change avatar
  const [dataAvatar, setDataAvatar] = useState("")
  const handleRequestThumb = async ({ file, onSuccess, onError }) => {
    const res = await postUpdateAvatar(file)
    if (res && res.data) {
      setDataAvatar(res.data.fileUploaded)
      dispatch(doUpdateAvatarAction({ avatar: res.data.fileUploaded }))
      onSuccess("ok")
    } else {
      onError("Error")
    }
  }

  // prop of Upload
  const props = {
    name: "file",
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    customRequest: handleRequestThumb,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`cập nhật avatar thành công`)
      } else if (info.file.status === "error") {
        message.error(`cập nhật avatar thất bại`)
      }
    },
  }
  // get information of user
  useEffect(() => {
    form.setFieldsValue(user)
  }, [user])
  return (
    <>
      <Row span={24} gutter={[8, 8]}>
        <Col
          sm={24}
          md={12}
          xs={24}
          style={{
            display: "flex",
            gap: "36px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            size={200}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
              dataAvatar ? dataAvatar : user?.avatar
            }`}
          />
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Col>
        <Col sm={24} md={12} xs={24}>
          <Form
            name="updateUser"
            onFinish={handleUpdateUser}
            onCancel={handleCancelUpdate}
            autoComplete="off"
            layout="vertical "
            form={form}
          >
            <Form.Item label="id" name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Tên người dùng"
              name="fullName"
              rules={[
                { required: true, message: "Vui lòng nhập tên của bạn!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại cuả bạn!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                style={{ marginRight: "12px" }}
                onClick={handleCancelUpdate}
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
  )
}

export default UpdateUser
