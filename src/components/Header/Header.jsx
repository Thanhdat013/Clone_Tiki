import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineBars } from "react-icons/ai";
import { Badge, Drawer, message, Avatar, Popover } from "antd";
import ModalUpdateUser from "./modalUpdateUser";
import { doClearCartAction } from "~/redux/reducer/orderReducer/orderSlice";
import "./Header.scss";

import {
  postLogOut,
  doLogOutAction,
} from "~/redux/reducer/userReducer/userSlice";

const Header = ({ headerSearch, setHeaderSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const user = useSelector((state) => state.users.user);
  const carts = useSelector((state) => state.orders.carts);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onCloseDrawer = () => {
    setOpen(false);
  };

  const handleLogOut = async () => {
    const res = await dispatch(postLogOut());
    console.log(res);
    if (+res.payload.statusCode === 201) {
      dispatch(doLogOutAction());
      dispatch(doClearCartAction());
      message.success("You have successfully logged out");
      navigate("./");
    }
  };

  // search header
  const handleSearchHeaderChange = (e) => {
    console.log(e.target.value);
    const searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      // check không cho ký tự đầu tiên nhập vào là space
      return;
    } else {
      setHeaderSearch(searchValue);
    }
  };

  // delay search

  // modal for update user
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const handleClickOpenUpdate = () => {
    setIsModalOpenUpdate(true);
    onCloseDrawer();
  };

  // popover for cart
  const contentPopover = () => {
    return (
      <section className="popover">
        {carts?.length == 0 && (
          <div className="popover__empty">
            <div className="popover__empty--img"></div>
            <div className="cartStart__empty--title">chưa có sản phẩm</div>
          </div>
        )}

        {carts && carts.length > 0 && (
          <div className="popover__container">
            {carts &&
              carts.length > 0 &&
              carts.map((item) => (
                <div className="popover__content" key={item._id}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                      item.detail?.thumbnail
                    }`}
                    alt="Item cart"
                    className="popover__img"
                  />
                  <p className="line-clamp popover__desc">
                    {item.detail?.mainText}
                  </p>
                  <div className="popover__price">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(+item.detail.price)}
                  </div>
                </div>
              ))}

            <div className="popover__footer">
              {" "}
              <button
                className="popover__btn"
                onClick={() => navigate("/cart")}
              >
                Xem giỏ hàng
              </button>
            </div>
          </div>
        )}
      </section>
    );
  };

  return (
    <header className="header grid  ">
      <div className="header__container row  grid wide">
        <div className="header__wrap  m-12 c-12">
          <div className="header__logo col row  l-2 m-1 c-1 ">
            <img
              className="header__logo--img"
              src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
              alt="Tiki_logo"
              onClick={() => navigate("/")}
            />
            <div className="header__logo--bar">
              <AiOutlineBars onClick={showDrawer} className="logo__bar--icon" />

              {isAuthenticated ? (
                <>
                  <Drawer
                    title={
                      <Avatar
                        size={78}
                        src={
                          user.avatar
                            ? `${
                                import.meta.env.VITE_BACKEND_URL
                              }/images/avatar/${user.avatar}`
                            : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
                        }
                        className="logo__bar--avatar"
                      />
                    }
                    width={250}
                    closable={false}
                    onClose={onCloseDrawer}
                    open={open}
                    placement={"left"}
                    keyboard={13}
                    extra={user.fullName}
                  >
                    <ul className="logo__bar--list">
                      {user.role === "ADMIN" && (
                        <li
                          onClick={() => navigate("/admin")}
                          className="logo__bar--item"
                        >
                          Trang quản trị
                        </li>
                      )}
                      <li
                        className="logo__bar--item"
                        onClick={handleClickOpenUpdate}
                      >
                        Quản lý tài khoản
                      </li>
                      <li
                        className="logo__bar--item"
                        onClick={() => navigate("/history")}
                      >
                        Lịch sử mua hàng
                      </li>
                      <li className="logo__bar--item">Cài đặt</li>
                    </ul>
                    <ul className="logo__bar--list">
                      <li onClick={handleLogOut} className="logo__bar--item">
                        Đăng xuất
                      </li>
                    </ul>
                  </Drawer>
                </>
              ) : (
                <>
                  <Drawer
                    title={
                      <Avatar
                        size={78}
                        src={
                          "https://atplink.com/blog/wp-content/uploads/2021/06/z.jpg"
                        }
                        className="logo__bar--avatar"
                      />
                    }
                    width={250}
                    closable={false}
                    onCloseDrawer={onCloseDrawer}
                    open={open}
                    placement={"left"}
                    keyboard={13}
                    extra={"Chào mừng bạn đến với Tiki"}
                  >
                    <ul className="logo__bar--list">
                      <li
                        style={{ backgroundColor: "#fadb14" }}
                        className="logo__bar--item logo__bar--item--sign"
                        onClick={() => navigate("/login")}
                      >
                        Đăng nhập
                      </li>
                      <li
                        style={{
                          backgroundColor: "#69b1ff",
                        }}
                        className="logo__bar--item logo__bar--item--sign"
                        onClick={() => navigate("/register")}
                      >
                        Đăng ký
                      </li>
                    </ul>
                  </Drawer>
                </>
              )}
            </div>
          </div>
          <div className="header__search col  l-7 m-10 c-8 ">
            <div className="header__search--wrap row  ">
              <span className="search__wrap--icon l-1 m-1 c-1">
                <BsSearch className="search__wrap--icon--glasses" />
              </span>
              <input
                value={headerSearch}
                onChange={handleSearchHeaderChange}
                type="text"
                className="search__wrap--input l-9 m-11 c-11"
                placeholder="Bạn tìm gì hôm nay"
              />
              <button className="search__wrap--btn l-2  ">Tìm kiếm</button>
            </div>
          </div>
          <div className="header__user col l-3 m-1 c-2">
            {isAuthenticated ? (
              <Popover
                placement="bottomRight"
                arrow
                title={carts.length > 0 ? "Thông tin giỏ hàng" : ""}
                className="header__popover"
                content={contentPopover}
              >
                <div
                  className="header__user--cart"
                  onClick={() => navigate("/cart")}
                >
                  <AiOutlineShoppingCart className="user__cart--icon" />
                  <div className="user__cart--quantity">
                    <Badge
                      count={carts?.length}
                      overflowCount={10}
                      size="small"
                    ></Badge>
                  </div>
                </div>
              </Popover>
            ) : (
              <div
                className="header__user--cart"
                onClick={() => navigate("/login")}
              >
                <AiOutlineShoppingCart className="user__cart--icon" />
                <div className="user__cart--quantity">
                  <Badge count={0} overflowCount={10} size="small"></Badge>
                </div>
              </div>
            )}

            {isAuthenticated ? (
              <>
                <div className="header__user--manage l-7">
                  <Avatar
                    size={42}
                    src={
                      user?.avatar
                        ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                            user?.avatar
                          }`
                        : "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg"
                    }
                    className="header__user--avatar"
                  />
                  {user.fullName}
                  <ul className="header__user--list">
                    <li
                      className="header__user--item"
                      onClick={() => setIsModalOpenUpdate(true)}
                    >
                      Quản lý tài khoản
                    </li>
                    <li
                      className="header__user--item"
                      onClick={() => navigate("/history")}
                    >
                      Lịch sử mua hàng
                    </li>
                    {user.role === "ADMIN" && (
                      <li
                        onClick={() => navigate("/admin")}
                        className="header__user--item"
                      >
                        Trang quản trị
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
      <ModalUpdateUser
        open={isModalOpenUpdate}
        setOpen={setIsModalOpenUpdate}
      />
    </header>
  );
};
export default Header;
