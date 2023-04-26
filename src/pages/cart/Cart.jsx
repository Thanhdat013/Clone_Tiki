import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (window.location.pathname === "/cart") setCurrentStep(1);
    if (window.location.pathname === "/cart/payment") setCurrentStep(2);
    if (window.location.pathname === "/cart/finish") setCurrentStep(3);
  }, [window.location.pathname]);
  return (
    <>
      <section className="cart">
        {carts.length === 0 && <CartStart />}
        {carts && carts.length > 0 && (
          <div className="grid wide cart__container">
            <Steps
              responsive={true}
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
