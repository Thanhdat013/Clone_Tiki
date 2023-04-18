import { useNavigate } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import {
  AiOutlineUser,
  AiOutlineDollar,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineUserSwitch,
  AiOutlineBars,
  AiOutlineArrowRight,
} from "react-icons/ai";

import { FiBook } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { Menu, Drawer } from "antd";
import "./AdminSideBar.scss";

const AdminSideBar = ({ collapsed, onClose, open, showDrawer }) => {
  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type };
  }

  const items = [
    getItem("Admin", "1", <GrUserAdmin />),
    getItem("Dashboard", "2", <RxDashboard />),

    getItem("Manage user", "3", <AiOutlineUser />, [
      getItem("Table  user", "3.1", <AiOutlineUserAdd />),
      getItem("Add new user", "3.2", <AiOutlineUserSwitch />),
      getItem("Delete user", "3.3", <AiOutlineUserDelete />),
    ]),
    getItem("Manage Book", "4", <FiBook />, [
      getItem("Table book", "4.1", <AiOutlineUserAdd />),
      getItem("Add new book", "4.3", <AiOutlineUserDelete />),
    ]),
    getItem("Manage order", "7", <AiOutlineDollar />),
  ];
  const onClick = (e) => {
    console.log(e);
    if (+e.key === 3.1) navigate("manage-user");

    if (+e.key === 4.1) navigate("manage-book");
  };
  return (
    <div className="admin__sidebar">
      <div className="admin__sidebar--wrap">
        <Menu
          className="admin__sidebar--menu"
          defaultSelectedKeys={["2"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          onClick={onClick}
        />
      </div>
      <div className="admin__sidebar--bar">
        <Drawer
          width={250}
          closable={false}
          onClose={onClose}
          open={open}
          placement={"left"}
          keyboard={13}
        >
          <Menu
            className="admin__sidebar--menu"
            defaultSelectedKeys={["2"]}
            mode="inline"
            theme="light"
            inlineCollapsed={false}
            items={items}
            onClick={onClick}
          />
          <ul className="admin__sidebar--list">
            <li className="admin__sidebar--item">
              <AiOutlineArrowRight className="admin__sidebar--item--icon" />
              <span>Đăng xuất</span>
            </li>
          </ul>
        </Drawer>
      </div>
    </div>
  );
};

export default AdminSideBar;
