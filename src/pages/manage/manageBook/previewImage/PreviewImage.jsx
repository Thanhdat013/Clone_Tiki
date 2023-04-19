import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const PreviewImage = ({ dataViewBook }) => {
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };
  useEffect(() => {
    let listSlide = [];
    let thumb = {};
    if (dataViewBook && dataViewBook.thumbnail) {
      thumb = {
        uid: uuidv4(),
        name: dataViewBook?.thumbnail,
        status: "done",
        url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataViewBook?.thumbnail
        }`,
      };
    }
    if (dataViewBook && dataViewBook.slider.length > 0) {
      dataViewBook.slider.map((item) => {
        listSlide.push({
          uid: uuidv4(),
          name: item,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        });
      });
    }
    setFileList([thumb, ...listSlide]);
  }, [dataViewBook]);

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        showUploadList={{ showRemoveIcon: false }}
      ></Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PreviewImage;
