import { Modal, message } from "antd";
import { deleteBook } from "~/services/Api";

const DeleteBook = ({
  openUpdateBook,
  setOpenDeleteBook,
  dataDeleteBook,
  setDataDeleteBook,
  getAllBook,
}) => {
  const onFinish = async () => {
    const res = await deleteBook(dataDeleteBook._id);
    console.log(res);
    if (res && +res.statusCode === 200) {
      message.success("delete user successfully");
      setOpenDeleteBook(false);
      await getAllBook();
    }
  };

  const handleCancelModal = () => {
    setOpenDeleteBook(false);
    // set lại data delete để không bị ghi nhớ dữ liệu => gây ra lỗi
    setDataDeleteBook("");
  };
  return (
    <>
      <Modal
        title="Delete book"
        open={openUpdateBook}
        onOk={onFinish}
        onCancel={handleCancelModal}
        width={500}
        okText={"Delete"}
        cancelText={"Cancel"}
      >
        <p>
          {" "}
          {`Are you sure delete book with name ${dataDeleteBook?.mainText}`}
        </p>
      </Modal>
    </>
  );
};

export default DeleteBook;
