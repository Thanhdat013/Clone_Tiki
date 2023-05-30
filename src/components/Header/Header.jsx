import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Avatar, Badge, Drawer, Popover, message } from "antd"
import { AiOutlineBars, AiOutlineShoppingCart } from "react-icons/ai"
import { BsSearch } from "react-icons/bs"

import { doClearCartAction } from "~/redux/reducer/orderReducer/orderSlice"
import {
  doLogOutAction,
  postLogOut,
} from "~/redux/reducer/userReducer/userSlice"
import ModalUpdateUser from "./modalUpdateUser"
import "./Header.scss"

const Header = ({ headerSearch, setHeaderSearch }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated)
  const user = useSelector((state) => state.users.user)
  const carts = useSelector((state) => state.orders.carts)

  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }
  const onCloseDrawer = () => {
    setOpen(false)
  }

  const handleLogOut = async () => {
    const res = await dispatch(postLogOut())
    if (res) {
      dispatch(doLogOutAction())
      dispatch(doClearCartAction())
      message.success("You have successfully logged out")
      navigate("./", { replace: true })
    }
  }

  // search header
  const handleSearchHeaderChange = (e) => {
    const searchValue = e.target.value
    if (searchValue.startsWith(" ")) {
      // check không cho ký tự đầu tiên nhập vào là space
      return
    } else {
      setHeaderSearch(searchValue)
    }
  }

  // delay search

  // modal for update user
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
  const handleClickOpenUpdate = () => {
    setIsModalOpenUpdate(true)
    onCloseDrawer()
  }

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
                    src={
                      item.detail.thumbnail
                        ? `${import.meta.env.VITE_BACKEND_URL}/images/book/${
                            item.detail?.thumbnail
                          }`
                        : "https://icon2.cleanpng.com/20180402/ggw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804802020.4270477515226654765248.jpg"
                    }
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
                onClick={() => navigate("/cart", { replace: true })}
              >
                Xem giỏ hàng
              </button>
            </div>
          </div>
        )}
      </section>
    )
  }

  return (
    <header className="header grid  ">
      <div className="header__container row  grid wide">
        <div className="header__wrap  m-12 c-12">
          <div className="header__logo col row  l-2 m-1 c-1 ">
            <img
              className="header__logo--img"
              src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
              alt="Tiki_logo"
              onClick={() => navigate("/", { replace: true })}
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
                            : "https://icon2.cleanpng.com/20180402/ggw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804802020.4270477515226654765248.jpg"
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
                      <li
                        className="logo__bar--item"
                        onClick={() => {
                          navigate("/", { replace: true })
                          onCloseDrawer()
                        }}
                      >
                        Trang chủ
                      </li>
                      {user.role === "ADMIN" && (
                        <li
                          onClick={() =>
                            navigate("/dashboard", { replace: true })
                          }
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
                        onClick={() => {
                          navigate("/history", { replace: true })
                          onCloseDrawer()
                        }}
                      >
                        Lịch sử mua hàng
                      </li>
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
                        onClick={() => {
                          navigate("/", { replace: true })
                          setOpen(false)
                        }}
                      />
                    }
                    width={250}
                    closable={false}
                    onClose={onCloseDrawer}
                    open={open}
                    placement={"left"}
                    extra={"Chào mừng bạn đến với Tiki"}
                  >
                    <ul className="logo__bar--list">
                      <li
                        style={{ backgroundColor: "#fadb14" }}
                        className="logo__bar--item logo__bar--item--sign"
                        onClick={() => navigate("/login", { replace: true })}
                      >
                        Đăng nhập
                      </li>
                      <li
                        style={{
                          backgroundColor: "#69b1ff",
                        }}
                        className="logo__bar--item logo__bar--item--sign"
                        onClick={() => navigate("/register", { replace: true })}
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
                  onClick={() => navigate("/cart", { replace: true })}
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
                onClick={() => navigate("/login", { replace: true })}
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      size={42}
                      src={
                        user.avatar
                          ? `${
                              import.meta.env.VITE_BACKEND_URL
                            }/images/avatar/${user.avatar}`
                          : "https://icon2.cleanpng.com/20180402/ggw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804802020.4270477515226654765248.jpg"
                      }
                      className="header__user--avatar"
                    />
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {" "}
                      {user.fullName}
                    </p>
                  </div>
                  <ul className="header__user--list">
                    <li
                      className="header__user--item"
                      onClick={() => setIsModalOpenUpdate(true)}
                    >
                      Quản lý tài khoản
                    </li>
                    <li
                      className="header__user--item"
                      onClick={() => navigate("/history", { replace: true })}
                    >
                      Lịch sử mua hàng
                    </li>
                    {user.role === "ADMIN" && (
                      <li
                        onClick={() =>
                          navigate("/dashboard", { replace: true })
                        }
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
                  onClick={() => navigate("/login", { replace: true })}
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
  )
}
export default Header
