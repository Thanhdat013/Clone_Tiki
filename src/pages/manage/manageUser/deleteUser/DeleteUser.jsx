import { Modal, message } from "antd";
import { deleteUser } from "~/services/Api";

const DeleteUser = ({
  isModalOpenDelete,
  setIsModalOpenDelete,
  dataDelete,
  setDataDelete,
  getAllUser,
}) => {
  const onFinish = async () => {
    const res = await deleteUser(dataDelete._id);
    console.log(res);
    if (res && res.data) {
      message.success("delete user successfully");
      setIsModalOpenDelete(false);
      await getAllUser();
    }
  };

  const handleCancelModal = () => {
    setIsModalOpenDelete(false);
    // set lại data delete để không bị ghi nhớ dữ liệu => gây ra lỗi
    setDataDelete("");
  };
  return (
    <>
      <Modal
        title="Delete user"
        open={isModalOpenDelete}
        onOk={onFinish}
        onCancel={handleCancelModal}
        width={500}
        okText={"Delete"}
      >
        <p> {`Are you sure delete user with email ${dataDelete.email}`}</p>
      </Modal>
    </>
  );
};

export default DeleteUser;
