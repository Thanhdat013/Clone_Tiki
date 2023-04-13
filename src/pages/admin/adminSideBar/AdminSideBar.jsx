import { useState } from "react";

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
  function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type };
  }
  const items = [
    getItem("Admin", "1", <GrUserAdmin />),
    getItem("Dashboard", "2", <RxDashboard />),

    getItem("Manage user", "sub1", <AiOutlineUser />, [
      getItem("Create new user", "3", <AiOutlineUserAdd />),
      getItem("Update user", "4", <AiOutlineUserSwitch />),
      getItem("Delete user", "5", <AiOutlineUserDelete />),
    ]),
    getItem("Manage Book", "6", <FiBook />),
    getItem("Manage order", "7", <AiOutlineDollar />),
  ];

  // const [open, setOpen] = useState(false);
  // const showDrawer = () => {
  //   setOpen(true);
  // };
  // const onClose = () => {
  //   setOpen(false);
  // };
  return (
    <div className="admin__sidebar">
      <div className="admin__sidebar--wrap">
        <Menu
          className="admin__sidebar--menu"
          defaultSelectedKeys={["2"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
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
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="light"
            inlineCollapsed={false}
            items={items}
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
