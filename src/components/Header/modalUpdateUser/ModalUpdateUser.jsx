import UpdateUser from "./updateUser";
import ChangePassword from "./changePassword";
import { Tabs, Modal } from "antd";

const ModalUpdateUser = ({ open, setOpen }) => {
  const items = [
    {
      key: "updateUser",
      label: `Cập nhật người dùng`,
      children: <UpdateUser open={open} setOpen={setOpen} />,
    },
    {
      key: "changePassword",
      label: `Đổi mật khẩu`,
      children: <ChangePassword open={open} setOpen={setOpen} />,
    },
  ];
  const handleCancelModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={open}
        footer={false}
        onCancel={() => setOpen(false)}
        // width={"50vw"}
        width={"700px"}
        maskClosable={false}
      >
        <Tabs defaultActiveKey="updateUser" items={items} />
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
