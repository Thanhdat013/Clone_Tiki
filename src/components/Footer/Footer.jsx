import { BsFacebook, BsYoutube, BsTwitter } from "react-icons/bs";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer grid">
      <div className="footer__container grid wide">
        <section className="row no-gutters  l-3 m-4 c-12">
          <ul className="footer__list">
            {" "}
            Hỗ trợ khách hàng
            <li className="footer__list--item l-10 m-10">Hotline: 1900-6035</li>
            <li className="footer__list--item l-10 m-10">
              Các câu hỏi thường gặp
            </li>
            <li className="footer__list--item l-10 m-10">
              {" "}
              Hướng dẫn đặt hàng
            </li>
            <li className="footer__list--item l-10 m-10">
              Hỗ trợ khách hàng: hotro@tiki.vn
            </li>
          </ul>
        </section>
        <section className="row no-gutters l-3 m-4 c-12">
          <ul className="footer__list">
            Về Tiki
            <li className="footer__list--item l-10 m-10">Giới thiệu Tiki</li>
            <li className="footer__list--item l-10 m-10">Tiki Blog</li>
            <li className="footer__list--item l-10 m-10"> Tuyển dụng</li>
            <li className="footer__list--item l-10 m-10">
              Chính sách bảo mật thanh toán
            </li>
          </ul>
        </section>
        <section className="row no-gutters l-3 m-4 c-12">
          <ul className="footer__list">
            Hợp tác và liên kết
            <li className="footer__list--item l-10 m-10">
              Quy chế hoạt động Sàn GDTMĐT
            </li>
            <li className="footer__list--item l-10 m-10">
              Các câu hỏi thường gặp
            </li>
            <li className="footer__list--item l-10 m-10">Bán hàng cùng Tiki</li>
            <li className="footer__list--item l-10 m-10">
              Hỗ trợ khách hàng: hotro@tiki.vn
            </li>
          </ul>
        </section>
        <section className="row no-gutters l-3 m-6 c-12">
          <ul className="footer__list ">
            {" "}
            Kết nối với chúng tôi
            <div className="footer__list--social">
              {" "}
              <BsFacebook className="footer__social--icon footer__fb" />
              <BsYoutube className="footer__social--icon footer__youtube" />
              <BsTwitter className="footer__social--icon footer__twitter" />
            </div>
            <div className="footer__list--app">
              <span>Tải ứng dụng tại</span>
              <div className="footer__app--download">
                <div className="footer__app--qr">
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
                    alt="QR code"
                    className="footer__app--qr--img"
                  />
                </div>
                <div className="footer__app--download">
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                    alt="App store"
                    className="footer__app--download--img"
                  />
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                    alt="google play"
                    className="footer__app--download--img"
                  />
                </div>
              </div>
            </div>
          </ul>
        </section>
      </div>
    </footer>
  );
};
export default Footer;
