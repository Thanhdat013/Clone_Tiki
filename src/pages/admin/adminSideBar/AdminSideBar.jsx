import { useNavigate } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { useState } from "react";
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
    getItem("Dashboard", "/admin", <RxDashboard />),

    getItem("Manage user", "manage-user", <AiOutlineUser />),
    getItem("Manage Book", "manage-book", <FiBook />),
    getItem("Manage order", "manage-order", <AiOutlineDollar />),
  ];
  const onClick = (e) => {
    navigate(e.key);
  };

  // Add new book
  const [openAddBook, setOpenAddBook] = useState(false);
  return (
    <>
      <div className="admin__sidebar">
        <div className="admin__sidebar--wrap">
          <Menu
            className="admin__sidebar--menu"
            defaultSelectedKeys={["/admin"]}
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
    </>
  );
};

export default AdminSideBar;
