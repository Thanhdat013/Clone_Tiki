import { useEffect, useState } from "react"
import {
  AiOutlineArrowRight,
  AiOutlineDollar,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai"
import { BiBookAdd } from "react-icons/bi"
import { RxDashboard } from "react-icons/rx"
import { useNavigate } from "react-router-dom"

import { Drawer, Menu } from "antd"
import { FiBook } from "react-icons/fi"
import AddNewBook from "~/pages/manage/manageBook/addNewBook"
import AddNewUser from "~/pages/manage/manageUser/addNewUser"
import "./AdminSideBar.scss"

const AdminSideBar = ({
  collapsed,
  onClose,
  open,
  showDrawer,
  setCollapsed,
}) => {
  const navigate = useNavigate()
  function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type }
  }

  const items = [
    window.innerWidth > 740 &&
      getItem(
        "Admin",
        "admin",
        collapsed ? (
          <AiOutlineMenuUnfold style={{ fontSize: "2.2rem" }} />
        ) : (
          <AiOutlineMenuFold style={{ fontSize: "2.2rem" }} />
        )
      ),

    getItem(
      "Dashboard",
      "dashboard",
      <RxDashboard style={{ fontSize: "2.2rem" }} />
    ),

    getItem(
      "Manage user",
      "user",
      <AiOutlineUser style={{ fontSize: "2.2rem" }} />,
      [
        getItem(
          "Table User",
          "manage-user",
          <AiOutlineUser style={{ fontSize: "2.2rem" }} />
        ),
        getItem(
          "Add New User",
          "add-user",
          <AiOutlineUserAdd style={{ fontSize: "2.2rem" }} />
        ),
      ]
    ),

    getItem("Manage Book", "book", <FiBook style={{ fontSize: "2.2rem" }} />, [
      getItem(
        "Table book",
        "manage-book",
        <FiBook style={{ fontSize: "2.2rem" }} />
      ),
      getItem(
        "Add New Book",
        "add-book",
        <BiBookAdd style={{ fontSize: "2.2rem" }} />
      ),
    ]),
    getItem(
      "Manage order",
      "manage-order",
      <AiOutlineDollar style={{ fontSize: "2.2rem" }} />
    ),
  ]
  const onClick = (e) => {
    if (e.key === "admin") {
      setCollapsed(!collapsed)
    }
    if (e.key === "dashboard") {
      navigate("/admin")
      setKeySideBar("/admin")
    }
    //manage user
    if (e.key === "manage-user") {
      navigate("manage-user")
      setKeySideBar("manage-user")
    }
    if (e.key === "add-user") {
      setOpenAddUser(true)
      setKeySideBar("add-user")
    }
    //  manage book
    if (e.key === "manage-book") {
      navigate("manage-book")
      setKeySideBar("manage-book")
    }
    if (e.key === "add-book") {
      setOpenAddBook(true)
      setKeySideBar("add-book")
    }
    if (e.key === "manage-order") {
      navigate("manage-order")
      setKeySideBar("manage-order")
    }
  }
  const [keySideBar, setKeySideBar] = useState("/admin")
  const handleChange = (e) => {}
  useEffect(() => {
    if (window.location.pathname.includes("user")) {
      setKeySideBar("manage-user")
    }
    if (window.location.pathname.includes("book")) {
      setKeySideBar("manage-book")
    }
    if (window.location.pathname.includes("order")) {
      setKeySideBar("manage-order")
    }
  }, [])

  // Add new user
  const [openAddUser, setOpenAddUser] = useState(false)

  // Add new book
  const [openAddBook, setOpenAddBook] = useState(false)

  return (
    <>
      <div className="admin__sidebar">
        {/* <div className="admin__sidebar--bar  ">
          {collapsed ? (
            <AiOutlineMenuUnfold
              style={{ fontSize: "2.2rem" }}
              onClick={toggleCollapsed}
            />
          ) : (
            <AiOutlineMenuFold
              onClick={toggleCollapsed}
              style={{ fontSize: "2.2rem" }}
            />
          )}
        </div> */}
        <div className="admin__sidebar--wrap">
          <Menu
            className="admin__sidebar--menu"
            selectedKeys={keySideBar}
            onChange={handleChange}
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
      <AddNewUser openAddUser={openAddUser} setOpenAddUser={setOpenAddUser} />
      <AddNewBook openAddBook={openAddBook} setOpenAddBook={setOpenAddBook} />
    </>
  )
}

export default AdminSideBar
