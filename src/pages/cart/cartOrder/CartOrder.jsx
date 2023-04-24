import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { Checkbox, Form, Input, Button, Divider } from "antd";
import "./CartOrder.scss";
import { useNavigate } from "react-router-dom";

const CartOrder = ({ setCurrentStep }) => {
  const carts = useSelector((state) => state.orders.carts);
  const user = useSelector((state) => state.users.user);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let result = carts.reduce((total, price) => {
      return total + price.detail.price * price.quantity;
    }, 0);
    setTotalPrice(result);
  }, [carts]);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const formRef = useRef(null);
  useEffect(() => {
    if (formRef.current) {
      form.setFieldsValue(user);
    }
  }, [user]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { TextArea } = Input;
  const handleBuyItem = () => {};
  return (
    <section className="cartOrder">
      {carts?.length > 0 && (
        <div className="cartOrder__container grid wide row">
          <section className="cartOrder__left l-9 m-12 c-12  ">
            <div className="cartOrder__left--content l-12">
              <div className="l-2 c-1">Sản phẩm</div>
              <p className="cartOrder__left--desc--header"></p>
              <div className="cartOrder__left--price ">Đơn giá</div>
              <div className="cartOrder__left--quant ">Số lượng</div>
              <div className="cartOrder__left--total ">Số tiền</div>
              <div className="cartOrder__left--delete ">Thao tác</div>
            </div>

            {carts &&
              carts.length > 0 &&
              carts.map((item) => (
                <div className="cartOrder__left--content l-12" key={item._id}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                      item.detail?.thumbnail
                    }`}
                    alt="cartOrder-image"
                    className="cartOrder__left--img "
                  />
                  <p className="cartOrder__left--desc line-clamp ">
                    {item.detail?.mainText}
                  </p>
                  <div className="cartOrder__left--price ">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(+item.detail.price)}
                  </div>
                  <div className="cartOrder__left--quant ">
                    {`Số lượng: ${item.quantity}`}
                  </div>

                  <div className="cartOrder__left--total ">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(+item.detail.price * item.quantity)}
                  </div>
                  <div
                    className="cartOrder__left--delete "
                    onClick={() => handleDeleteItem(item)}
                  >
                    Xóa
                  </div>
                </div>
              ))}
          </section>
          <section className="cartOrder__right l-3 m-12 c-12 ">
            <div className="cartOrder__right--wrap">
              <Form
                ref={formRef}
                form={form}
                name="InforUser"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                initialValues={{ checked: true }}
              >
                <Form.Item
                  label="Tên người nhận"
                  name="fullName"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ nhận hàng của bạn",
                    },
                  ]}
                >
                  <TextArea row={4} style={{ height: 120 }} />
                </Form.Item>

                <Form.Item
                  name="checked"
                  valuePropName="checked"
                  label="Hình thức thanh toán"
                >
                  <Checkbox>Thanh toán khi nhận hàng</Checkbox>
                </Form.Item>

                <Form.Item>
                  <div className="cartOrder__right--price">
                    <div className="cartOrder__right--provisional--title">
                      Tạm tính
                    </div>
                    <div className="cartOrder__right--provisional--number">
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)}
                    </div>
                  </div>
                </Form.Item>

                <Form.Item>
                  <div className="cartOrder__right--price">
                    <div className="cartOrder__right--discount--title">
                      Giảm giá
                    </div>
                    <div className="cartOrder__right--discount--number">
                      {carts.length > 0 &&
                        new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(20000)}
                    </div>
                  </div>

                  <Divider />
                </Form.Item>
                <Form.Item>
                  <div className="cartOrder__right--price">
                    <div className="cartOrder__right--price--title">
                      Tổng tiền
                    </div>
                    <div className="cartOrder__right--price--total">
                      {carts.length > 0 &&
                        new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalPrice - 20000)}
                    </div>
                  </div>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    htmlType="submit"
                    className="cartOrder__right--btn "
                  >
                    Thanh toán
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};

export default CartOrder;
