import moment from "moment";
import { Drawer, Badge, Descriptions, Divider } from "antd";
import PreviewImage from "~/pages/manage/manageBook/previewImage";
import { useEffect, useState } from "react";
const DetailUser = ({ setOpen, open, dataViewUser, dataViewBook }) => {
  const onClose = () => {
    setOpen(false);
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 741) {
      setIsMobile(true);
    }
  }, [window.innerWidth]);

  return (
    <>
      <Drawer
        placement="right"
        width={isMobile ? "90vw" : "60vw"}
        onClose={onClose}
        open={open}
        keyboard={13}
        closable={false}
      >
        <>
          <Descriptions title="Thông tin" bordered column={2}>
            <Descriptions.Item label="Id">
              {dataViewUser?._id ? dataViewUser?._id : dataViewBook?._id}
            </Descriptions.Item>

            <Descriptions.Item label={dataViewUser ? "Email" : "Tác giả"}>
              {dataViewUser?.email ? dataViewUser?.email : dataViewBook?.author}
            </Descriptions.Item>

            <Descriptions.Item
              label={dataViewUser ? "Tên người dùng" : "Tên sách"}
            >
              {dataViewUser?.fullName
                ? dataViewUser?.fullName
                : dataViewBook?.mainText}
            </Descriptions.Item>

            <Descriptions.Item
              label={dataViewUser ? "Số điện thoại" : "Giá sách"}
            >
              {dataViewUser?.phone ? dataViewUser?.phone : dataViewBook?.price}
            </Descriptions.Item>

            <Descriptions.Item label={dataViewUser ? "Quyền" : "Thể loại"}>
              {dataViewUser?.role ? dataViewUser?.role : dataViewBook?.category}
            </Descriptions.Item>

            {dataViewUser ? (
              <Descriptions.Item label="Hoạt động">
                <Badge status="processing" text="Đang hoạt động" />
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label="Bán">
                <Badge status="processing" text="Đang bán" />
              </Descriptions.Item>
            )}
            {dataViewBook && (
              <Descriptions.Item label={"Số lượng"}>
                {dataViewBook?.quantity}
              </Descriptions.Item>
            )}
            {dataViewBook && (
              <Descriptions.Item label={"Đã bán"}>
                {dataViewBook?.sold}
              </Descriptions.Item>
            )}

            <Descriptions.Item label="Ngày tạo" span={2}>
              {moment(
                dataViewUser?.createdAt
                  ? dataViewUser?.createdAt
                  : dataViewBook?.createdAt
              ).format("DD-MM-YYYY, HH:mm:ss a")}
            </Descriptions.Item>

            <Descriptions.Item label="Ngày cập nhật" span={2}>
              {moment(
                dataViewUser?.updatedAt
                  ? dataViewUser?.updatedAt
                  : dataViewBook?.updatedAt
              ).format("DD-MM-YYYY, HH:mm:ss a")}
            </Descriptions.Item>

            {dataViewUser && (
              <Descriptions.Item label="Ảnh đại điện">
                <img
                  style={{
                    maxHeight: "250px",
                  }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                    dataViewUser?.avatar
                  }`}
                />
              </Descriptions.Item>
            )}
          </Descriptions>
          {dataViewBook && (
            <Divider orientation={"left"} style={{ fontSize: "2rem" }}>
              Hình ảnh của sách
            </Divider>
          )}
          {dataViewBook && <PreviewImage dataViewBook={dataViewBook} />}
        </>
      </Drawer>
    </>
  );
};

export default DetailUser;
