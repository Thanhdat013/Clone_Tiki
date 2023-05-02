import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrRefresh } from "react-icons/gr";
import * as XLSX from "xlsx/xlsx.mjs";

import { TfiImport, TfiExport } from "react-icons/tfi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { Table, Button, Row, Col } from "antd";
import { getAllUserWithPaginate } from "~/redux/reducer/userReducer/userSlice";
import FormFIlter from "~/pages/manage/manageUser/formFilter";
import "./TableUserWithPaginate.scss";
import DetailItem from "~/pages/manage/components/detailItem";
import ImportFileExcel from "~/pages/manage/manageUser/importFileExcel/ImportFileExcel";
import UpdateUser from "~/pages/manage/manageUser/updateUser";
import DeleteUser from "~/pages/manage/manageUser/deleteUser";

const TableUserWithPaginate = () => {
  const listUsersPaginate = useSelector(
    (state) => state.users.listUsersPaginate
  );

  const totalPages = useSelector((state) => state.users.totalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterInput, setFilterInput] = useState("");
  const [arrangeColumn, SetArrangeColumn] = useState("");

  const dispatch = useDispatch();
  const handleFilter = (filter) => {
    setFilterInput(filter);
  };

  useEffect(() => {
    getAllUser();
  }, [pageSize, currentPage, filterInput, arrangeColumn]);

  const getAllUser = async () => {
    let query = `pageSize=${pageSize}&current=${currentPage}&${filterInput}&${arrangeColumn}`;
    dispatch(getAllUserWithPaginate(query));
  };
  const renderHeaderTitle = () => {
    return (
      <header className="table__header">
        <div className="table__container row">
          <h2 className="table__header--title l-2 m-4 c-4">Table list</h2>
          <div className="table__header--right l-o-4 m-8  l-6 c-8 ">
            <div
              className="table__header--wrap row no-gutters"
              style={{ justifyContent: "flex-end" }}
            >
              <Button
                onClick={handleExportData}
                type="primary"
                className=" table__header--btn"
                disabled={listUsersPaginate.length === 0}
              >
                <TfiExport className=" table__header--btn--icon" />
                <span className="table__header--btn--name">Export</span>
              </Button>
              <Button
                onClick={() => setIsModalImportFile(true)}
                type="primary"
                className=" table__header--btn"
              >
                <TfiImport className=" table__header--btn--icon" />
                <span className="table__header--btn--name"> Import</span>
              </Button>

              <Button
                className="table__header--btn--refresh l-2"
                icon={<GrRefresh />}
                onClick={handleRefresh}
                loading={isLoading}
                type="text"
              ></Button>
            </div>
          </div>
        </div>
      </header>
    );
  };
  const columns = [
    {
      title: "Id.",
      dataIndex: "_id",
      width: "7%",
      fixed: "left",
      render: (text, index, record) => (
        <span
          onClick={() => {
            showDetailUser(text, record, index);
            console.log("record,", record);
          }}
          className="table__detail"
        >
          {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%",
      sorter: true,
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      width: "10%",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "10%",
      sorter: true,
    },
    {
      title: "Phân quyền ",
      dataIndex: "role",
      width: "10%",
      sorter: true,
    },
    {
      title: "Hành động ",
      width: "10%",
      render: (text, record, index) => (
        <div className="table__icon">
          <AiOutlineDelete
            onClick={() => showModalDelete(text, record, index)}
            className="table__delete--user "
          />
          <AiOutlineEdit
            onClick={() => showModalUpdate(text, record, index)}
            className="table__edit--user "
          />
        </div>
      ),
    },
  ];
  // refresh filter sort
  const handleRefresh = () => {
    setIsLoading(true);
    SetArrangeColumn("");
    setTimeout(() => setIsLoading(false), 300);
  };

  // change table
  const handleChange = (pagination, filters, sorter) => {
    let sorterClick = "";
    if (sorter && sorter.field) {
      sorter.order === "ascend"
        ? (sorterClick += `sort=${sorter.field}`)
        : (sorterClick += `sort=-${sorter.field}`);

      SetArrangeColumn(sorterClick);
    }

    if (pagination && pagination.current !== currentPage)
      setCurrentPage(pagination.current);

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };

  // show detail users
  const [open, setOpen] = useState(false);
  const [dataViewUser, setDataViewUser] = useState("");
  const showDetailUser = (text, index, record) => {
    console.log(record);
    setDataViewUser(record);
    setOpen(true);
  };

  // show modal add new user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  // show modal update  user
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const showModalUpdate = (text, record, index) => {
    setDataUpdate(record);
    setIsModalOpenUpdate(true);
  };

  // show modal delete  user
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState("");
  const showModalDelete = (text, record, index) => {
    setDataDelete(record);
    setIsModalOpenDelete(true);
  };

  // show modal import file
  const [isModalImportFile, setIsModalImportFile] = useState(false);

  // export data to excel file
  const handleExportData = () => {
    // export csv file
    if (listUsersPaginate.length > 0) {
      console.log("export");
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(listUsersPaginate);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "myExcel.csv");
    }
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <FormFIlter handleFilter={handleFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeaderTitle}
            dataSource={listUsersPaginate}
            columns={columns}
            onChange={handleChange}
            rowKey="_id"
            style={{ padding: "12px 24px" }}
            bordered
            scroll={{ x: 2000 }}
            pagination={{
              position: ["bottomCenter"],
              showQuickJumper: true,
              current: currentPage,
              pageSize: pageSize,
              total: totalPages,
              pageSizeOptions: [2, 4, 6, 10],
              showSizeChanger: true,
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]}-{range[1]} trên {total} người
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>

      <DetailItem open={open} setOpen={setOpen} dataViewUser={dataViewUser} />
      {/* <AddNewUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getAllUser={getAllUser}
      /> */}
      <UpdateUser
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        dataUpdate={dataUpdate}
        getAllUser={getAllUser}
        setDataUpdate={setDataUpdate}
      />
      <DeleteUser
        isModalOpenDelete={isModalOpenDelete}
        setIsModalOpenDelete={setIsModalOpenDelete}
        dataDelete={dataDelete}
        getAllUser={getAllUser}
        setDataDelete={setDataDelete}
      />
      <ImportFileExcel
        isModalImportFile={isModalImportFile}
        setIsModalImportFile={setIsModalImportFile}
      />
    </>
  );
};

export default TableUserWithPaginate;
