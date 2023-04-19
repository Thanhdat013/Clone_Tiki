import moment from "moment";
import { Drawer, Badge, Descriptions, Divider } from "antd";
import PreviewImage from "~/pages/manage/manageBook/previewImage";
const DetailUser = ({ setOpen, open, dataViewUser, dataViewBook }) => {
  const onClose = () => {
    setOpen(false);
  };

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
        <>
          <Descriptions title="User Information" bordered column={2}>
            <Descriptions.Item label="Id">
              {dataViewUser?._id ? dataViewUser?._id : dataViewBook?._id}
            </Descriptions.Item>

            <Descriptions.Item label={dataViewUser ? "Email" : "Author"}>
              {dataViewUser?.email ? dataViewUser?.email : dataViewBook?.author}
            </Descriptions.Item>

            <Descriptions.Item
              label={dataViewUser ? "Full name" : "Book title"}
            >
              {dataViewUser?.fullName
                ? dataViewUser?.fullName
                : dataViewBook?.mainText}
            </Descriptions.Item>

            <Descriptions.Item
              label={dataViewUser ? "Phone number" : "Book price"}
            >
              {dataViewUser?.phone ? dataViewUser?.phone : dataViewBook?.price}
            </Descriptions.Item>

            <Descriptions.Item label={dataViewUser ? "Role" : "Category"}>
              {dataViewUser?.role ? dataViewUser?.role : dataViewBook?.category}
            </Descriptions.Item>

            {dataViewUser ? (
              <Descriptions.Item label="Acive">
                <Badge status="processing" text="active" />
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label="Sale">
                <Badge status="processing" text="sale" />
              </Descriptions.Item>
            )}
            {dataViewBook && (
              <Descriptions.Item label={"Quantity"}>
                {dataViewBook?.quantity}
              </Descriptions.Item>
            )}
            {dataViewBook && (
              <Descriptions.Item label={"Sold"}>
                {dataViewBook?.sold}
              </Descriptions.Item>
            )}

            <Descriptions.Item label="Created at" span={2}>
              {moment(
                dataViewUser?.createdAt
                  ? dataViewUser?.createdAt
                  : dataViewBook?.createdAt
              ).format("DD-MM-YYYY, HH:mm:ss a")}
            </Descriptions.Item>

            <Descriptions.Item label="Updated at" span={2}>
              {moment(
                dataViewUser?.updatedAt
                  ? dataViewUser?.updatedAt
                  : dataViewBook?.updatedAt
              ).format("DD-MM-YYYY, HH:mm:ss a")}
            </Descriptions.Item>

            {dataViewUser && (
              <Descriptions.Item label="Avatar">
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
          <Divider orientation={"left"} style={{ fontSize: "2rem" }}>
            {" "}
            Picture of book
          </Divider>
          {dataViewBook && <PreviewImage dataViewBook={dataViewBook} />}
        </>
      </Drawer>
    </>
  );
};

export default DetailUser;
