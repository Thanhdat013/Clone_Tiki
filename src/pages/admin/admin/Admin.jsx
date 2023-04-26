import "./Admin.scss";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

import CountUp from "react-countup";
import { getDashboard } from "~/services/Api";

const Admin = () => {
  const [counterOrder, setCounterOrder] = useState(0);
  const [counterUser, setCounterUser] = useState(0);
  const formatter = (value) => (
    <CountUp end={value} duration={5} separator="," />
  );
  useEffect(() => {
    fetchDashboard();
  }, []);
  const fetchDashboard = async () => {
    const res = await getDashboard();
    if (res && res.data) {
      setCounterOrder(res.data.countOrder);
      setCounterUser(res.data.countUser);
    }
  };

  return (
    <div className="admin">
      <Row gutter={[16, 16]} align={"center"} style={{ marginTop: "24px" }}>
        <Col span={11} xl={11} lg={11}>
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
        <Col span={11} xl={11} lg={11}>
          <Card bordered={true}>
            <Statistic
              formatter={formatter}
              title="Tổng số đơn hàng"
              value={counterOrder}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
