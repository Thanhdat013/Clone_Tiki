import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Modal, Table, notification } from "antd";
import * as XLSX from "xlsx";
import { postImportData } from "~/services/Api";
// import template from "./template.xlsx";

const ImportFileExcel = ({ isModalImportFile, setIsModalImportFile }) => {
  const { Dragger } = Upload;
  const handleCancelImport = () => {
    setIsModalImportFile(false);
    setDataImport("");
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 700);
  };
  const propsUpload = {
    name: "import-file",
    multiple: false,
    maxCount: 1,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    customRequest: dummyRequest, // để không add action của Upload
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const file = info.fileList[0].originFileObj;
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (e) {
          const data = new Uint8Array(reader.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);
          setDataImport(jsonData);
        };
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      width: "40%",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      width: "30%",
    },
  ];
  // import data from excel file
  const [dataImport, setDataImport] = useState([]);
  const handleImportData = async () => {
    const data = dataImport.map((item) => {
      //set  default password
      item.password = "123456";
      return item;
    });
    console.log(data);
    const res = await postImportData(data);
    console.log(res);
    if (res && res.data && res?.data.countSuccess > 0) {
      notification.success({
        message: "import data successfully",
        description:
          res?.data.countSuccess > 0
            ? `countSuccess ${res?.data.countSuccess}`
            : "import data successfully",
        duration: 5,
      });
      setDataImport("");
      handleCancelImport();
    } else {
      notification.error({
        message: "import data failed",
        description:
          res?.data.countError > 0
            ? `countError ${res?.data.countError}`
            : "import data failed",
        duration: 5,
      });
    }
    handleCancelImport();
  };
  return (
    <>
      <Modal
        title="Upload data"
        open={isModalImportFile}
        onCancel={handleCancelImport}
        width={1000}
        okText={"Import data"}
        onOk={handleImportData}
        maskClosable={false}
        okButtonProps={{ disabled: dataImport.length === 0 }}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-text">
            Support for a single upload. Only accept .csv, .xls, .xlsx or &nbsp;{" "}
            <a
              onClick={(e) => e.stopPropagation()}
              href={
                "https://drive.google.com/drive/u/0/folders/1fU7QG90gSeasGM8GRoqp8uYf3afihxno"
              }
              target={"_blank"}
              // download
            >
              download template
            </a>
          </p>
        </Dragger>

        <Table
          columns={columns}
          style={{ padding: "12px 0" }}
          bordered
          dataSource={dataImport}
          rowKey={"email"}
        />
      </Modal>
    </>
  );
};

export default ImportFileExcel;
