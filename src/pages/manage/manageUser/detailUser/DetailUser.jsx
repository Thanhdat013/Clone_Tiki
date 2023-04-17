import moment from "moment";
import { Drawer, Badge, Descriptions } from "antd";
const DetailUser = ({ onClose, open, dataViewUser }) => {
  return (
    <>
      <Drawer
        placement="right"
        width={"50vw"}
        onClose={onClose}
        open={open}
        keyboard={13}
        closable={false}
      >
        {dataViewUser && (
          <>
            <Descriptions title="User Information" bordered column={2}>
              <Descriptions.Item label="Id">
                {dataViewUser?._id}
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                {dataViewUser?.email}
              </Descriptions.Item>

              <Descriptions.Item label="Full name">
                {dataViewUser?.fullName}
              </Descriptions.Item>

              <Descriptions.Item label="Phone number">
                {dataViewUser?.phone}
              </Descriptions.Item>

              <Descriptions.Item label="Role">
                {" "}
                {dataViewUser?.role}
              </Descriptions.Item>

              <Descriptions.Item label="Acive">
                <Badge status="processing" text="active" />
              </Descriptions.Item>

              <Descriptions.Item label="Created at" span={2}>
                {moment(dataViewUser?.createdAt).format(
                  "DD-MM-YYYY, HH:mm:ss a"
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Updated at" span={2}>
                {moment(dataViewUser?.updatedAt).format(
                  "DD-MM-YYYY, HH:mm:ss a"
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Avatar">
                <img
                  style={{
                    maxHeight: "250px",
                  }}
                  src={`http://localhost:8080/images/avatar/${dataViewUser?.avatar}`}
                />
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Drawer>
    </>
  );
};

export default DetailUser;
