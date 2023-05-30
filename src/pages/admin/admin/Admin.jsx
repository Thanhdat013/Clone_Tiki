import {
  BookOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Card, Col, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import CountUp from "react-countup"
import { useDispatch, useSelector } from "react-redux"
import { getDashboard, getManageOrder } from "~/services/Api"
import "./Admin.scss"

const Admin = () => {
  const [counterOrder, setCounterOrder] = useState(0)
  const [counterUser, setCounterUser] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const formatter = (value) => (
    <CountUp end={value} duration={5} separator="," />
  )

  const getHistory = async () => {
    let query = `current=1&pageSize=109`
    const res = await getManageOrder(query)

    if (res && res.data) {
      let raw = res.data
      setDataTotalPrice(raw.result)
    }
  }
  const fetchDashboard = async () => {
    const res = await getDashboard()
    if (res && res.data) {
      setCounterOrder(res.data.countOrder)
      setCounterUser(res.data.countUser)
    }
  }
  useEffect(() => {
    fetchDashboard()
    getHistory()
  }, [])
  const totalBooks = useSelector((state) => state.books.totalPages)
  const [dataTotalPrice, setDataTotalPrice] = useState([])

  useEffect(() => {
    let result = dataTotalPrice.reduce((total, price) => {
      return total + price.totalPrice
    }, 0)
    setTotalPrice(result)
  }, [dataTotalPrice])
  return (
    <div className="admin">
      <>
        <Row align={"center"} style={{ padding: "24px 0" }}>
          <Col span={22}>
            <p className="admin__note">
              Chú ý: Do server Backend đc build miễn phí trên https://render.com
              nên có thể xảy ra lỗi không lấy được dữ liệu. Khi gặp phải trường
              hợp này vui lòng reload (F5) lại trang web. Rất xin lỗi mọi người
              vị sự cố này!
            </p>
          </Col>
        </Row>
        <Row align={"center"} style={{ padding: "24px 0", gap: "24px" }}>
          <Col md={22} xs={22} sm={22} lg={11}>
            <Card bordered={true}>
              <Statistic
                formatter={formatter}
                title="Tổng số người dùng"
                value={counterUser}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col md={22} xs={22} sm={22} lg={11}>
            <Card bordered={true}>
              <Statistic
                formatter={formatter}
                title="Tổng số đơn hàng"
                value={counterOrder}
                precision={2}
                valueStyle={{ color: "#faad14" }}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col md={22} xs={22} sm={22} lg={11}>
            {" "}
            <Card bordered={true}>
              <Statistic
                formatter={formatter}
                title="Tổng số sách"
                value={totalBooks}
                precision={2}
                valueStyle={{ color: "#1677ff" }}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col md={22} xs={22} sm={22} lg={11}>
            {" "}
            <Card bordered={true}>
              <Statistic
                formatter={formatter}
                title="Doanh thu"
                value={totalPrice}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </>
    </div>
  )
}

export default Admin
