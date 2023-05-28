import { Divider, Tabs } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { CiDeliveryTruck } from "react-icons/ci"
import { getHistory } from "~/services/Api"
import "./History.scss"

const History = () => {
  const [dataHistory, setDataHistory] = useState([])
  const [dateHistory, SetDateHistory] = useState("sort=-createdAt")

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    const res = await getHistory()
    if (res && res.data) {
      let raw = res.data

      setDataHistory(raw)
    }
  }

  const items = [
    {
      key: "sort=-createdAt",
      label: `Tất cả đơn`,
      children: <></>,
    },
    {
      key: "sort=createdAt",
      label: `Chờ thanh toán`,
      children: <></>,
    },
    {
      key: "sort=type",
      label: `Đang xử lý`,
      children: <></>,
    },
    {
      key: "sort=-totalPrice",
      label: `Đang vận chuyển`,
      children: <></>,
    },
    {
      key: "sort=-deliver",
      label: `Đã giao`,
      children: <></>,
    },
    {
      key: "sort=-cancel",
      label: `Đang hủy`,
      children: <></>,
    },
  ]
  return (
    <section className="history">
      <div className="history__container grid wide  ">
        <p className="history__title ">Lịch sử mua hàng</p>
        <header className="history--header col row ">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={(key) => SetDateHistory(key)}
            className="history__header--tab l-12 c-0"
            size="large"
          />
        </header>
        {dataHistory &&
          dataHistory.length > 0 &&
          dataHistory.map((item) => (
            <div className="history__content row " key={item._id}>
              <div className="history__content--title col l-12">
                <CiDeliveryTruck />
                <p className="history__content--title--desc">
                  Đơn hàng đã được giao thành công
                </p>
              </div>
              <Divider />
              {item?.detail &&
                item?.detail.length > 0 &&
                item?.detail.map((bookDetail) => (
                  <div
                    className="history__content--body l-12"
                    key={bookDetail._id}
                  >
                    <div className="history__content--detail l-8 m-8 c-12">
                      <div className="history__detail--right l-8 m-8 c-8 line-clamp ">
                        {bookDetail.bookName}
                      </div>
                      <div className="history__detail--left">
                        <div className="history__detail--left--item">
                          {`Số lượng: ${bookDetail.quantity}`}
                        </div>
                      </div>
                    </div>
                    <div className="history__content-price c-0">
                      {moment(item.createdAt).format("DD-MM-YYYY, HH:mm:ss a")}
                    </div>
                  </div>
                ))}
              <Divider />
              <div className="history__content--footer">
                <span className="history__content--footer--title">
                  Tổng tiền:{" "}
                </span>
                <div className="history__content--footer--total">
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(+item.totalPrice)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default History
