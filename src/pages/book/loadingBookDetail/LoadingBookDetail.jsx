import { Skeleton, Row, Col, Space } from "antd";

const LoadingBookDetail = () => {
  return (
    <Row
      gutter={[20, 20]}
      style={{ maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}
    >
      <Col md={10} sm={0} xs={0}>
        <Skeleton.Input
          active={true}
          block={true}
          style={{ width: "100%", height: "300px" }}
        />
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "14px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton.Image active={true} block={true} />
          <Skeleton.Image active={true} block={true} />
          <Skeleton.Image active={true} block={true} />
        </div>
      </Col>
      <Col md={14} sm={24} xs={24}>
        <Skeleton paragraph={{ rows: 3 }} />
        <Skeleton paragraph={{ rows: 3 }} style={{ marginTop: "36px" }} />
        <Space style={{ marginTop: "36px" }}>
          <Skeleton.Button active={true} size={24} block={true} />
          <Skeleton.Button active={true} size={24} block={true} />
        </Space>
      </Col>
    </Row>
  );
};

export default LoadingBookDetail;
