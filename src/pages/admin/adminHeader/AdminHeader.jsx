import "./AdminHeader.scss";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineBars,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const AdminHeader = ({
  collapsed,
  setCollapsed,
  onClose,
  open,
  showDrawer,
}) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="admin__header--grid grid ">
      <div className="admin__header row no-gutters">
        <div className="admin__header--bar l-2 m-2 c-2">
          <AiOutlineBars onClick={showDrawer} className="admin__header--bar" />
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
              Thành Đạt
              <ul className="admin__user--list">
                <li className="admin__user--item">Quản lý tài khoản</li>
                <li className="admin__user--item">Đăng Xuất</li>
              </ul>
            </div>
          ) : (
            <div className="admin__header--user">
              Tài Khoản
              <ul className="admin__user--list">
                <li className="admin__user--item">Đăng Nhập</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
