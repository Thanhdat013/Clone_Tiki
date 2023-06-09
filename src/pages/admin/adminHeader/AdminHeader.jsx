import { useState } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Avatar, message } from "antd"
import ModalUpdateUser from "~/components/Header/modalUpdateUser/ModalUpdateUser"
import {
  doLogOutAction,
  postLogOut,
} from "~/redux/reducer/userReducer/userSlice"
import "./AdminHeader.scss"

const AdminHeader = ({ collapsed, setCollapsed, showDrawer }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const avatar = useSelector((state) => state.users.user.avatar)
  const fullName = useSelector((state) => state.users.user.fullName)
  const handleLogOut = async () => {
    const res = await dispatch(postLogOut())

    if (res && res.payload) {
      dispatch(doLogOutAction())
      navigate("/", { replace: true })
      message.success("You have successfully logged out")
    }
  }
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)

  return (
    <header className="admin__header grid ">
      <div className="admin__header--grid row no-gutters  ">
        <div className="admin__header--left l-1 m-4 c-12">
          <div className="admin__header--bar l-2  m-2 c-2 ">
            <AiOutlineBars
              onClick={showDrawer}
              className="admin__header--bar--btn"
            />
          </div>
          <img
            onClick={() => navigate("/", { replace: true })}
            className="admin__header--logo "
            src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
            alt="Tiki_logo"
          />
        </div>
        <div
          className={
            collapsed
              ? "admin__header--manage l-2 m-3 c-4"
              : "admin__header--manage l-2 m-3 c-4"
          }
        >
          {isAuthenticated ? (
            <div className="admin__header--user">
              <Avatar
                size={42}
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/images/avatar/${avatar}`}
              />
              {fullName}
              <ul className="admin__user--list">
                <li
                  className="admin__user--item"
                  onClick={() => {
                    setIsModalOpenUpdate(true)
                  }}
                >
                  Quản lý tài khoản
                </li>
                <li
                  className="admin__user--item"
                  onClick={() => {
                    navigate("/history", { replace: true })
                  }}
                >
                  Lịch sử mua hàng
                </li>
                <div onClick={handleLogOut} className="admin__user--item">
                  Đăng Xuất
                </div>
              </ul>
            </div>
          ) : (
            <div
              onClick={() => navigate("/login", { replace: true })}
              className="admin__header--user"
            >
              Tài Khoản
              <ul className="admin__user--list"></ul>
            </div>
          )}
        </div>
      </div>
      <ModalUpdateUser
        open={isModalOpenUpdate}
        setOpen={setIsModalOpenUpdate}
      />
    </header>
  )
}
export default AdminHeader
