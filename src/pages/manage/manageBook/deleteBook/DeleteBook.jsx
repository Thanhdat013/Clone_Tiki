import { Modal, message } from "antd"
import { deleteBook } from "~/services/Api"

const DeleteBook = ({
  openUpdateBook,
  setOpenDeleteBook,
  dataDeleteBook,
  setDataDeleteBook,
  getAllBook,
}) => {
  const onFinish = async () => {
    const res = await deleteBook(dataDeleteBook._id)

    if (res && +res.statusCode === 200) {
      message.success("Xóa thành công")
      setOpenDeleteBook(false)
      await getAllBook()
    }
  }

  const handleCancelModal = () => {
    setOpenDeleteBook(false)
    // set lại data delete để không bị ghi nhớ dữ liệu => gây ra lỗi
    setDataDeleteBook("")
  }
  return (
    <>
      <Modal
        title="Xóa sách"
        open={openUpdateBook}
        onOk={onFinish}
        onCancel={handleCancelModal}
        width={500}
        okText={"Xóa"}
        cancelText={"Hủy bỏ"}
      >
        <p>
          {" "}
          {`Bạn có chắc muốn xóa cuốn sách với tên: ${dataDeleteBook?.mainText}`}
        </p>
      </Modal>
    </>
  )
}

export default DeleteBook
