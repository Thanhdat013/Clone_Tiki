import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineBars,
} from "react-icons/ai";

import "./AdminHeader.scss";
import {
  postLogOut,
  doLogOutAction,
} from "~/redux/reducer/userReducer/userSlice";
import { message, Avatar } from "antd";

const AdminHeader = ({ collapsed, setCollapsed, showDrawer }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.users.user.avatar);
  const fullName = useSelector((state) => state.users.user.fullName);
  const handleLogOut = async () => {
    const res = await dispatch(postLogOut());
    console.log(res);
    if (res && res.payload) {
      dispatch(doLogOutAction());
      navigate("/");
      message.success("You have successfully logged out");
    }
  };
  return (
    <header className="admin__header grid ">
      <div className="admin__header--grid row no-gutters">
        <div className="admin__header--bar l-2 m-2 c-2">
          <AiOutlineBars
            onClick={showDrawer}
            className="admin__header--bar--btn"
          />
          {collapsed ? (
            <AiOutlineMenuUnfold
              className="admin__header--btn"
              onClick={toggleCollapsed}
            />
          ) : (
            <AiOutlineMenuFold
              className="admin__header--btn"
              onClick={toggleCollapsed}
            />
          )}
          <img
            onClick={() => navigate("/")}
            className="admin__header--logo"
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
                src={`http://localhost:8080/images/avatar/${avatar}`}
              />
              {fullName}
              <ul className="admin__user--list">
                <li className="admin__user--item">Quản lý tài khoản</li>
                <div onClick={handleLogOut} className="admin__user--item">
                  Đăng Xuất
                </div>
              </ul>
            </div>
          ) : (
            <div
              onClick={() => navigate("/login")}
              className="admin__header--user"
            >
              Tài Khoản
              <ul className="admin__user--list"></ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default AdminHeader;
