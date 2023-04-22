import { useEffect, useState } from "react";
import { Modal, Form, notification, message, Row, Col, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { getAllCategories, postNewBook, postUploadImage } from "~/services/Api";
import FormInfor from "~/pages/manage/manageBook/components/form/";

const AddNewBook = ({ openAddBook, setOpenAddBook, getAllBook }) => {
  const [form] = Form.useForm();
  // submit form to create new book
  const onFinish = async (values) => {
    console.log(dataImageThumb);
    console.log(dataImageSlider);
    const { mainText, author, price, sold, quantity, category } = values;
    if (dataImageThumb.length === 0) {
      notification.error({
        message: "Create a new book failed",
        description: "Please upload image for thumbnail",
      });
      return;
    }
    if (dataImageSlider.length === 0) {
      notification.error({
        message: "Create a new book failed",
        description: "Please upload image for slider",
      });
      return;
    }
    const thumbnail = dataImageThumb[0].name;
    const slider = dataImageSlider.map((item) => item.name);
    const res = await postNewBook(
      thumbnail,
      slider,
      mainText,
      author,
      price,
      sold,
      quantity,
      category
    );
    console.log(res);
    if (res && res.statusCode === 201) {
      notification.success({
        message: "Create a new book successfully",
        description: "you have created",
      });
      form.resetFields();
      await getAllBook();
      setOpenAddBook(false);
      setDataImageSlider([]);
      setDataImageThumb([]);
    } else {
      notification.error({
        message: "Create a new book failed",
        description: "you have create failed",
      });
    }
  };

  // load images
  const [imageUrl, setImageUrl] = useState("");
  const [loadingThumb, setLoadingThumb] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = async (info, type) => {
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoadingThumb(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoadingThumb(false);
        setImageUrl(url);
      });
    }
  };
  // set data image of thumb into react for submit form
  const [dataImageThumb, setDataImageThumb] = useState([]);
  const handleRequestThumb = async ({ file, onSuccess, onError }) => {
    const res = await postUploadImage(file);

    if (res && res.data) {
      setDataImageThumb([{ name: res.data.fileUploaded, uid: file.uid }]);
      onSuccess("ok");
    } else {
      onError("Error");
    }
  };
  // set data image of slider into react for submit from
  const [dataImageSlider, setDataImageSlider] = useState([]);
  const handleRequestSlider = async ({ file, onSuccess, onError }) => {
    const res = await postUploadImage(file);

    if (res && res.data) {
      setDataImageSlider((dataImageSlider) => [
        ...dataImageSlider,
        { name: res.data.fileUploaded, uid: file.uid },
      ]);
      onSuccess("ok");
    } else {
      onError("Error");
    }
  };
  //Preview image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handlePreview = async (file) => {
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };
  const handleCancelPreview = () => setPreviewOpen(false);

  // remove image
  const handleRemove = (file, type) => {
    if (type === "thumbnail") setDataImageThumb("");
    if (type === "slider") {
      const newDataImageSlider = dataImageSlider.filter(
        (item) => item.uid !== file.uid
      );
      setDataImageSlider(newDataImageSlider);
    }
  };

  // get all categories
  const [listCategory, setListCategory] = useState();
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    const res = await getAllCategories();
    if (res && res.data) {
      const allCategories = res.data.map((item) => {
        return { label: item, value: item };
      });

      setListCategory(allCategories);
    }
  };

  // close modal add new book
  const handleCancelModal = () => {
    setOpenAddBook(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Add new book"
        open={openAddBook}
        labelCol={{ span: 8 }}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancelModal}
        width={"60vw"}
        maskClosable={false}
        okText={"Create"}
        cancelText={"Cancel"}
      >
        <Form
          name="addNewBookForm"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical "
          form={form}
        >
          <Row gutter={24}>
            <Col span={24}>
              <FormInfor listCategory={listCategory} />
            </Col>
            <Col span={12}>
              <Form.Item label="Thumbnail image" name="thumbnail">
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  customRequest={handleRequestThumb}
                  onPreview={handlePreview}
                  onRemove={(file) => handleRemove(file, "thumbnail")}
                  multiple={false}
                  maxCount={1}
                >
                  <div>
                    <>
                      {loadingThumb ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </>
                  </div>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Slider images" name="slider">
                <Upload
                  name="slider"
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                  customRequest={handleRequestSlider}
                  onPreview={handlePreview}
                  onRemove={(file) => handleRemove(file, "slider")}
                  multiple
                >
                  <div>
                    <>
                      {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancelPreview}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewBook;
