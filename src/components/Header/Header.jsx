import { useState } from "react";

import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineBars } from "react-icons/ai";
import { Badge, Drawer } from "antd";

import "./Header.scss";

const Header = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <header className="header grid ">
      <div className="header__container grid wide">
        <div className="header__wrap row ">
          <div className="header__logo l-1 m-1 c-1">
            <img
              className="header__logo--img"
              src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
              alt="Tiki_logo"
            />
            <div className="header__logo--bar">
              <AiOutlineBars onClick={showDrawer} className="logo__bar--icon" />

              <Drawer
                title="Menu chức năng"
                width={250}
                closable={false}
                onClose={onClose}
                open={open}
                placement={"left"}
                keyboard={13}
              >
                <ul className="logo__bar--list">
                  <li className="logo__bar--item">Quản lý tài khoản</li>
                  <li className="logo__bar--item">Cài đặt</li>
                </ul>
                <ul className="logo__bar--list">
                  <li className="logo__bar--item">Đăng xuất</li>
                </ul>
              </Drawer>
            </div>
          </div>
          <div className="header__search l-8 m-10 c-9">
            <div className="header__search--wrap row no-gutters">
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
          <div className="header__user l-3 m-1 c-2">
            <div className="header__user--cart">
              <AiOutlineShoppingCart className="user__cart--icon" />
              <div className="user__cart--quantity">
                <Badge count={99} overflowCount={10}></Badge>
              </div>
            </div>
            <div className="header__user--manage">
              Tài Khoản
              <ul className="header__user--list">
                <li className="header__user--item">Quản lý tài khoản</li>
                <li className="header__user--item">Đăng Xuất</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
