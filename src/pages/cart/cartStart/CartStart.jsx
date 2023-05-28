import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { InputNumber, Checkbox, Divider, Breadcrumb } from "antd"
import "./CartStart.scss"
import {
  doUpdateCartAction,
  doDeleteCartAction,
} from "~/redux/reducer/orderReducer/orderSlice"
import { useNavigate } from "react-router-dom"
import { HomeOutlined } from "@ant-design/icons"

const CartStart = ({ setCurrentStep }) => {
  const carts = useSelector((state) => state.orders.carts)

  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    let result = carts.reduce((total, price) => {
      return total + price.detail.price * price.quantity
    }, 0)
    setTotalPrice(result)
  }, [carts])

  const dispatch = useDispatch()

  const handleChangeQuantityBook = (value, bookOrder) => {
    if (!value && value < 1) return
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({
          quantity: value,
          detail: bookOrder,
          _id: bookOrder._id,
        })
      )
    }
  }
  const handleDeleteItem = (item) => {
    dispatch(doDeleteCartAction({ _id: item._id }))
  }

  //payment
  const clickPayment = () => {
    navigate("payment", { replace: true })
    setCurrentStep(2)
  }

  return (
    <section className="cartStart">
      {carts.length === 0 && (
        <div className="cartStart__empty">
          <div className="cartStart__empty--img"></div>
          <div className="cartStart__empty--title">
            Giỏ hàng của bạn còn trống
          </div>
          <button
            className="cartStart__empty--btn"
            onClick={() => navigate("/", { replace: true })}
          >
            Mua ngay
          </button>
        </div>
      )}

      {carts?.length > 0 && (
        <div className="cartStart__container grid wide row">
          <section className="cartStart__left l-9 m-12 c-12  ">
            {/* for mobile */}
            <Breadcrumb
              className="breadcrumb l-12 m-12 c-12"
              style={{ marginTop: "12px " }}
              items={[
                {
                  title: (
                    <Link to="/">
                      {" "}
                      <HomeOutlined style={{ fontSize: "2rem" }} />
                    </Link>
                  ),
                },

                {
                  title: <span style={{ fontSize: "1.6rem" }}> "Payment"</span>,
                },
              ]}
            />
            <div className="cartStart__left--content display__mobile  c-12">
              {carts &&
                carts.length > 0 &&
                carts.map((item) => (
                  <div className="cartStart__item--mobile c-12" key={item._id}>
                    <div className="c-4">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                          item.detail?.thumbnail
                        }`}
                        alt="cartStart-image"
                        className="cartStart__left--img  "
                      />
                    </div>
                    <div className="cartStart__left--mobile c-8">
                      <p className="cartStart__left--desc  ">
                        {item.detail?.mainText}
                      </p>
                      <div className="cartStart__left--price ">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(+item.detail.price)}
                      </div>
                      <div className="cartStart__left--quant ">
                        <InputNumber
                          value={item.quantity}
                          onChange={(value) =>
                            handleChangeQuantityBook(value, item)
                          }
                        />
                        <div
                          className="cartStart__left--delete "
                          onClick={() => handleDeleteItem(item)}
                        >
                          Xóa
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* for pc and tablet */}
            <div className="cartStart__left--content l-12 ">
              <div className="l-2 c-1">Sản phẩm</div>
              <p className="cartStart__left--desc--header"></p>
              <div className="cartStart__left--price ">Đơn giá</div>
              <div className="cartStart__left--quant ">Số lượng</div>
              <div className="cartStart__left--total ">Số tiền</div>
              <div className="cartStart__left--delete ">Thao tác</div>
            </div>

            {carts &&
              carts.length > 0 &&
              carts.map((item) => (
                <div className="cartStart__left--content l-12 " key={item._id}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                      item.detail?.thumbnail
                    }`}
                    alt="cartStart-image"
                    className="cartStart__left--img "
                  />
                  <p className="cartStart__left--desc line-clamp ">
                    {item.detail?.mainText}
                  </p>
                  <div className="cartStart__left--price ">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(+item.detail.price)}
                  </div>
                  <div className="cartStart__left--quant ">
                    <InputNumber
                      value={item.quantity}
                      onChange={(value) =>
                        handleChangeQuantityBook(value, item)
                      }
                    />
                  </div>

                  <div className="cartStart__left--total ">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(+item.detail.price * item.quantity)}
                  </div>
                  <div
                    className="cartStart__left--delete "
                    onClick={() => handleDeleteItem(item)}
                  >
                    Xóa
                  </div>
                </div>
              ))}
          </section>
          <section className="cartStart__right l-3 m-12 c-12 ">
            <div className="cartStart__right--wrap">
              <div className="cartStart__right--price">
                <div className="cartStart__right--provisional--title">
                  Tạm tính
                </div>
                <div className="cartStart__right--provisional--number">
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </div>
              </div>

              <div className="cartStart__right--price">
                <div className="cartStart__right--discount--title">
                  Giảm giá
                </div>
                <div className="cartStart__right--discount--number">
                  {carts.length > 0 &&
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(20000)}
                </div>
              </div>

              <Divider />

              <div className="cartStart__right--price">
                <div className="cartStart__right--price--title">Tổng tiền</div>
                <div className="cartStart__right--price--total">
                  {carts.length > 0 &&
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice - 20000)}
                </div>
              </div>
              <Divider />
              <button className="cartStart__right--btn" onClick={clickPayment}>
                {`Mua Hàng (${carts.length}) `}{" "}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default CartStart
