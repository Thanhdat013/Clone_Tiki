import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  Form,
  notification,
  message,
  Row,
  Col,
  Upload,
  Input,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  getAllCategories,
  postUploadImage,
  putUpdateBook,
} from "~/services/Api";
import FormInfor from "~/pages/manage/manageBook/components/form/";

const UpdateBook = ({
  openUpdateBook,
  setOpenUpdateBook,
  getAllBook,
  dataUpdateBook,
  setDataUpdateBook,
}) => {
  const [form] = Form.useForm();
  const [initDataFrom, setInitDataFrom] = useState(null);

  const [dataImageThumb, setDataImageThumb] = useState([]);
  const [dataImageSlider, setDataImageSlider] = useState([]);

  const formRef = useRef(null);
  useEffect(() => {
    if (dataUpdateBook?._id) {
      const thumb = [
        {
          uid: uuidv4(),
          name: dataUpdateBook?.thumbnail,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            dataUpdateBook?.thumbnail
          }`,
        },
      ];

      const listSlide = dataUpdateBook?.slider?.map((item) => {
        return {
          uid: uuidv4(),
          name: item,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        };
      });

      const initialData = {
        _id: dataUpdateBook?._id,
        mainText: dataUpdateBook?.mainText,
        author: dataUpdateBook?.author,
        price: dataUpdateBook?.price,
        sold: dataUpdateBook?.sold,
        quantity: dataUpdateBook?.quantity,
        category: dataUpdateBook?.category,
        thumbnail: { fileList: thumb },
        slider: { fileList: listSlide },
      };
      setInitDataFrom(initialData);
      form.setFieldsValue(initialData);
      setDataImageThumb(thumb);
      setDataImageSlider(listSlide);
    }

    return () => {
      form.resetFields();
    };
  }, [dataUpdateBook]);

  // submit form to update book
  const onFinish = async (values) => {
    const { _id, mainText, author, price, sold, quantity, category } = values;
    if (dataImageThumb.length === 0) {
      notification.error({
        message: "Cập nhật thất bại",
        description: "Vui lòng tải hình ảnh cho sách",
      });
      return;
    }
    if (dataImageSlider.length === 0) {
      notification.error({
        message: "Cập nhật thất bại",
        description: "Vui lòng tải các hình ảnh miêu tả sách",
      });
      return;
    }
    const thumbnail = dataImageThumb[0].name;
    const slider = dataImageSlider.map((item) => item.name);
    const res = await putUpdateBook(
      _id,
      thumbnail,
      slider,
      mainText,
      author,
      price,
      sold,
      quantity,
      category
    );

    if (res && +res.statusCode === 200) {
      notification.success({
        message: "Cập nhật thành công",
        description: "Bạn đã cập nhật thành công cho cuốn sách",
      });
      form.resetFields();
      await getAllBook();
      setOpenUpdateBook(false);
    } else {
      notification.error({
        message: "Cập nhật thất bại",
        description: "Có vẻ đã có lỗi xảy ra, vui lòng thử lại",
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
      message.error("Bạn chỉ có thể tải hình ảnh có định dạng JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 2MB!");
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
    if (file.url) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
      return;
    }

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
    setOpenUpdateBook(false);
    setInitDataFrom(null);
    setDataUpdateBook(null);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Cập nhật sách"
        open={openUpdateBook}
        labelCol={{ span: 8 }}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancelModal}
        width={"60vw"}
        maskClosable={false}
        okText={"Cập nhật"}
        cancelText={"Hủy bỏ"}
      >
        <Form
          name="updateBookForm"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical "
          form={form}
          ref={formRef}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="id" name="_id" hidden>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <FormInfor listCategory={listCategory} />
            </Col>
            <Col span={12}>
              <Form.Item label="Ảnh sách" name="thumbnail">
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
                  defaultFileList={initDataFrom?.thumbnail?.fileList ?? []}
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
              <Form.Item label="Ảnh miêu tả sách" name="slider">
                <Upload
                  name="slider"
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                  customRequest={handleRequestSlider}
                  onPreview={handlePreview}
                  onRemove={(file) => handleRemove(file, "slider")}
                  multiple
                  defaultFileList={initDataFrom?.slider?.fileList ?? []}
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

export default UpdateBook;
