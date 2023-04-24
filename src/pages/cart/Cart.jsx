import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input, Checkbox, Divider } from "antd";
import "./Cart.scss";

const Cart = () => {
  const carts = useSelector((state) => state.orders.carts);

  //   const [checkedList, setCheckedList] = useState();
  //   const [checkAll, setCheckAll] = useState(false);
  //   const onChange = () => {
  //     setCheckedList(list);
  //     setCheckAll(list.length === plainOptions.length);
  //   };
  //   const handleChangeInput = (e, checkedValues) => {
  //     console.log(e.target.checked);
  //     console.log(checkedValues);
  //   };
  //   const onCheckAllChange = (e) => {
  //     setCheckedList(e.target.checked ? plainOptions : []);
  //     setCheckAll(e.target.checked);
  //   };
  //   const checkIdItem = carts.map((item) => {
  //     return { label: item._id, value: item._id };
  //   });
  //   const checkItem = { label: "", value: "" };
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    let result = carts.reduce((total, price) => {
      return total + price.detail.price;
    }, 0);
    setTotalPrice(result);
  }, [carts]);

  const handleBuyItem = () => {};
  return (
    <section className="cart">
      <div className="cart__container grid wide row">
        <section className="cart__left l-9 m-12 c-12  ">
          <div className="cart__left--content l-12">
            {/* <Checkbox
              onChange={onCheckAllChange}
              checked={checkAll}
              className="cart__left--checked"
            ></Checkbox> */}
            <div className="l-2 c-1">Sản phẩm</div>
            <p className="cart__left--desc--header"></p>
            <div className="cart__left--price ">Đơn giá</div>
            <div className="cart__left--quant ">Số lượng</div>
            <div className="cart__left--total ">Số tiền</div>
            <div className="cart__left--delete ">Thao tác</div>
          </div>
          {carts &&
            carts.length > 0 &&
            carts.map((item) => (
              <div className="cart__left--content l-12" key={item._id}>
                {/* <Checkbox
                  options={checkItem}
                  onChange={handleChangeInput}
                  className="cart__left--checked"
                ></Checkbox> */}
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    item.detail?.thumbnail
                  }`}
                  alt="cart-image"
                  className="cart__left--img "
                />
                <p className="cart__left--desc line-clamp ">
                  {item.detail?.mainText}
                </p>
                <div className="cart__left--price ">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(+item.detail.price)}
                </div>
                <Input value={item.quantity} className="cart__left--quant " />
                <div className="cart__left--total ">
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(+item.detail.price * item.quantity)}
                </div>
                <div className="cart__left--delete ">Xóa</div>
              </div>
            ))}
        </section>
        <section className="cart__right l-3 m-12 c-12 ">
          <div className="cart__right--wrap">
            <div className="cart__right--price">
              <div className="cart__right--provisional--title">Tạm tính</div>
              <div className="cart__right--provisional--number">
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)}
              </div>
            </div>

            <div className="cart__right--price">
              <div className="cart__right--discount--title">Giảm giá</div>
              <div className="cart__right--discount--number">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(20000)}
              </div>
            </div>

            <Divider />

            <div className="cart__right--price">
              <div className="cart__right--price--title">Tổng tiền</div>
              <div className="cart__right--price--total">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice - 20000)}
              </div>
            </div>
            <Divider />
            <button className="cart__right--btn" onClick={handleBuyItem}>
              {`Mua Hàng (${carts.length}) `}{" "}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Cart;
