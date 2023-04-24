import React from "react";
import { Button, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CartFinish = () => {
  const navigate = useNavigate();
  return (
    <Result
      icon={<SmileOutlined />}
      title="Tuyệt vời, bạn đã đặt hàng thành công"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Go back Home
        </Button>
      }
    />
  );
};

export default CartFinish;
