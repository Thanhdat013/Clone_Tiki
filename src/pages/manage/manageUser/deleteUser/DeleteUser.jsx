import { Modal, message } from "antd"
import { deleteUser } from "~/services/Api"

const DeleteUser = ({
  isModalOpenDelete,
  setIsModalOpenDelete,
  dataDelete,
  setDataDelete,
  getAllUser,
}) => {
  const onFinish = async () => {
    const res = await deleteUser(dataDelete._id)

    if (res && res.data) {
      message.success("Xóa người dùng thành công")
      setIsModalOpenDelete(false)
      await getAllUser()
    }
  }

  const handleCancelModal = () => {
    setIsModalOpenDelete(false)
    // set lại data delete để không bị ghi nhớ dữ liệu => gây ra lỗi
    setDataDelete("")
  }
  return (
    <>
      <Modal
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onOk={onFinish}
        onCancel={handleCancelModal}
        width={500}
        okText={"Xóa"}
        cancelText={"Hủy bỏ"}
      >
        <p>
          {" "}
          {`Bạn có chắc muốn xóa người dùng với email: ${dataDelete.email}`}
        </p>
      </Modal>
    </>
  )
}

export default DeleteUser
