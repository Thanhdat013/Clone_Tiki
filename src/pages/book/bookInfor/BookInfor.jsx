import { Row, Col } from "antd";
import "./BookInfor.scss";
const BookInfor = ({ dataBookDetail }) => {
  return (
    <section className="row grid wide bookInfor">
      <div className="bookInfor__container">
        <h3 className="bookInfor__head col l-12">Thông tin sản phẩm</h3>
        <div className="bookInfor__content col l-12">
          <div className="bookInfor__content--infor l-12">
            <p className="bookInfor__content--tag l-3 c-4">Mã hàng</p>
            <p className="bookInfor__content--name  l-4 c-8 ">
              {" "}
              {dataBookDetail._id}
            </p>
          </div>
          <div className="bookInfor__content--infor">
            <p className="bookInfor__content--tag l-3 c-4">Tên sản phẩm</p>
            <p className="bookInfor__content--name l-6 c-8">
              {dataBookDetail.mainText}
            </p>
          </div>
          <div className="bookInfor__content--infor">
            <p className="bookInfor__content--tag l-3 c-4">Tác giả</p>
            <p className="bookInfor__content--name l-6 c-8 bookInfor__link">
              {dataBookDetail.author}
            </p>
          </div>
          <div className="bookInfor__content--infor">
            <p className="bookInfor__content--tag l-3 c-4">NXB</p>
            <p className="bookInfor__content--name l-6 c-8">Hà Nội</p>
          </div>

          <div className="bookInfor__content--infor">
            <p className="bookInfor__content--tag l-3 c-4">Trọng lượng (gr)</p>
            <p className="bookInfor__content--name l-6 c-8">
              {" "}
              {Math.floor(+dataBookDetail.price / 200)}
            </p>
          </div>
          <div className="bookInfor__content--infor">
            <p className="bookInfor__content--tag l-3 c-4">Kích Thước Bao Bì</p>
            <p className="bookInfor__content--name l-6 c-8">
              24 x 15.5 x 2.7 cm
            </p>
          </div>
          <div className="bookInfor__content--infor">
            <p className="bookInfor__content--tag l-3 c-4">Số trang</p>
            <p className="bookInfor__content--name l-6 c-8">
              {Math.floor(+dataBookDetail.price / 400)}
            </p>
          </div>
          <div className="bookInfor__content--infor">
            <p className="bookInfor__content--tag l-3 c-4">Hình thức</p>
            <p className="bookInfor__content--name l-6 c-8">Bìa mềm</p>
          </div>
          <div className="bookInfor__content--footer">
            Giá sản phẩm trên Tiki.com đã bao gồm thuế theo luật hiện hành. Bên
            cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có
            thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận
            chuyển, phụ phí hàng cồng kềnh,..
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookInfor;
