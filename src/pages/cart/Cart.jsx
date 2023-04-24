import { useState } from "react";
import { useSelector } from "react-redux";
import { Steps } from "antd";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import CartStart from "./cartStart";
import CartOrder from "./cartOrder";
import CartFinish from "./cartFinish";

const Cart = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const carts = useSelector((state) => state.orders.carts);
  return (
    <>
      <section className="cart">
        {carts.length === 0 && (
          <div className="cart__empty">
            <div className="cart__empty--img"></div>
            <div className="cart__empty--title">Giỏ hàng của bạn còn trống</div>
            <button className="cart__empty--btn" onClick={() => navigate("/")}>
              Mua ngay
            </button>
          </div>
        )}
        {carts.length > 0 && (
          <div className="grid wide">
            <Steps
              current={currentStep}
              items={[
                {
                  title: "Đơn hàng",
                },
                {
                  title: "Đặt hàng",
                },
                {
                  title: "Thành công",
                },
              ]}
            />

            {currentStep === +1 && (
              <CartStart setCurrentStep={setCurrentStep} />
            )}
            {currentStep === +2 && (
              <CartOrder setCurrentStep={setCurrentStep} />
            )}
            {currentStep === +3 && <CartFinish />}
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
