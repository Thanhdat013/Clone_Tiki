import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineBars } from "react-icons/ai";
import { Badge, Drawer, message, Avatar } from "antd";

import "./Header.scss";

import {
  postLogOut,
  doLogOutAction,
} from "~/redux/reducer/userReducer/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const users = useSelector((state) => state.users.user);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleLogOut = async () => {
    const res = await dispatch(postLogOut());
    console.log(res);
    if (+res.payload.statusCode === 201) {
      dispatch(doLogOutAction());
      message.success("You have successfully logged out");
      navigate("./");
    }
  };
  return (
    <header className="header grid  ">
      <div className="header__container row  grid wide">
        <div className="header__wrap  m-12 c-12">
          <div className="header__logo col row  l-2 m-1 c-1">
            <img
              className="header__logo--img"
              src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
              alt="Tiki_logo"
              onClick={() => navigate("/")}
            />
            <div className="header__logo--bar">
              <AiOutlineBars onClick={showDrawer} className="logo__bar--icon" />

              <Drawer
                title={
                  <Avatar
                    size={78}
                    src={
                      users.avatar
                        ? `http://localhost:8080/images/avatar/${users.avatar}`
                        : "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg"
                    }
                    className="logo__bar--avatar"
                  />
                }
                width={250}
                closable={false}
                onClose={onClose}
                open={open}
                placement={"left"}
                keyboard={13}
                extra={users.fullName}
              >
                <ul className="logo__bar--list">
                  {users.role === "ADMIN" && (
                    <li
                      onClick={() => navigate("/admin")}
                      className="logo__bar--item"
                    >
                      Admin
                    </li>
                  )}
                  <li className="logo__bar--item">Quản lý tài khoản</li>
                  <li className="logo__bar--item">Cài đặt</li>
                </ul>
                <ul className="logo__bar--list">
                  <li onClick={handleLogOut} className="logo__bar--item">
                    Đăng xuất
                  </li>
                </ul>
              </Drawer>
            </div>
          </div>
          <div className="header__search col  l-7 m-10 c-9">
            <div className="header__search--wrap row sm-gutter ">
              <span className="search__wrap--icon l-1 m-1 c-1">
                <BsSearch className="search__wrap--icon--glasses" />
              </span>
              <input
                type="text"
                className="search__wrap--input l-9 m-11 c-11"
                placeholder="Bạn tìm gì hôm nay"
              />
              <button className="search__wrap--btn l-2  ">Tìm kiếm</button>
            </div>
          </div>
          <div className="header__user col l-3 m-1 c-2">
            <div className="header__user--cart">
              <AiOutlineShoppingCart className="user__cart--icon" />
              <div className="user__cart--quantity">
                <Badge count={99} overflowCount={10}></Badge>
              </div>
            </div>
            {isAuthenticated ? (
              <>
                <div className="header__user--manage l-7">
                  <Avatar
                    size={42}
                    src={
                      users.avatar
                        ? `http://localhost:8080/images/avatar/${users.avatar}`
                        : "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg"
                    }
                    className="header__user--avatar"
                  />
                  {users.fullName}
                  <ul className="header__user--list">
                    <li className="header__user--item">Quản lý tài khoản</li>
                    {users.role === "ADMIN" && (
                      <li
                        onClick={() => navigate("/admin")}
                        className="header__user--item"
                      >
                        Admin
                      </li>
                    )}
                    <li onClick={handleLogOut} className="header__user--item">
                      Đăng Xuất
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => navigate("/login")}
                  className="header__user--manage l-7"
                >
                  Tài Khoản
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
