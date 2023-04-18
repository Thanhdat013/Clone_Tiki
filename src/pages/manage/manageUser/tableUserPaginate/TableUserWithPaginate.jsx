import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrRefresh } from "react-icons/gr";
import * as XLSX from "xlsx/xlsx.mjs";

import { TfiImport, TfiExport } from "react-icons/tfi";
import { IoPersonAddOutline } from "react-icons/io5";

import { Table, Button, Row, Col } from "antd";
import { getAllUserWithPaginate } from "~/redux/reducer/userReducer/userSlice";
import FormFIlter from "~/pages/manage/manageUser/formFilter";
import "./TableUserWithPaginate";
import "./TableUserWithPaginate.scss";
import DetailUser from "~/pages/manage/manageUser/detailUser";
import AddNewUser from "~/pages/manage/manageUser/addNewUser";
import ImportFileExcel from "~/pages/manage/manageUser/importFileExcel";

const TableUserWithPaginate = () => {
  const listUsersPaginate = useSelector(
    (state) => state.users.listUsersPaginate
  );
  const totalPages = useSelector((state) => state.users.totalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [filterInput, setFilterInput] = useState("");
  const [arrangeColumn, SetArrangeColumn] = useState("");

  const dispatch = useDispatch();
  const handleFilter = (filter) => {
    setFilterInput(filter);
  };

  useEffect(() => {
    let query = `pageSize=${pageSize}&current=${currentPage}&${filterInput}&${arrangeColumn}`;
    dispatch(getAllUserWithPaginate(query));
  }, [pageSize, currentPage, filterInput, arrangeColumn]);

  const columns = [
    {
      title: (text, record, index) => (
        <header className="table__header">
          <div className="table__container row">
            <h2 className="table__header--title l-2">Table list</h2>
            <div className="table__header--right l-o-4 l-6 ">
              <div className="table__header--wrap row no-gutters">
                <Button
                  onClick={handleExportData}
                  type="primary"
                  className=" table__header--btn"
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
                  onClick={showModal}
                  type="primary"
                  className=" table__header--btn"
                >
                  <IoPersonAddOutline className=" table__header--btn--icon" />
                  <span className="table__header--btn--name">Add</span>
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
      ),
      width: "100%",
      align: "left",
      children: [
        {
          title: "Id.",
          dataIndex: "_id",
          width: "5%",
          render: (text, index, record) => (
            <span
              onClick={() => showDetailUser(text, record, index)}
              className="table__detail"
            >
              {text}
            </span>
          ),
        },
        {
          title: "Email",
          dataIndex: "email",
          width: "20%",
          sorter: true,
        },
        {
          title: "Name",
          dataIndex: "fullName",
          width: "15%",
          sorter: true,
        },
        {
          title: "Phone number",
          dataIndex: "phone",
          width: "15%",
          sorter: true,
        },
        {
          title: "Role ",
          dataIndex: "role",
          width: "10%",
          sorter: true,
        },
        {
          title: "Action ",
          width: "15%",
          render: (text, record, index) => (
            <>
              <Button
                onClick={() => console.log({ text, record, index })}
                type="primary"
                danger
              >
                Delete
              </Button>
            </>
          ),
        },
      ],
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
    // setDataViewUser(listUsersPaginate[index]);
    setDataViewUser(record);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // show modal add new user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // show modal import file
  const [isModalImportFile, setIsModalImportFile] = useState(false);

  // export data to excel file
  const handleExportData = () => {
    const wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(listUsersPaginate); // convert json to sheet

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "myExcel.xlsx");
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <FormFIlter handleFilter={handleFilter} />
        </Col>
        <Col span={24}>
          <Table
            dataSource={listUsersPaginate}
            columns={columns}
            onChange={handleChange}
            rowKey="_id"
            style={{ padding: "12px 24px" }}
            bordered
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
                    {range[0]}-{range[1]} trên {total} trang
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>

      <DetailUser open={open} onClose={onClose} dataViewUser={dataViewUser} />
      <AddNewUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCancelModal={handleCancel}
        handleOk={handleOk}
      />
      <ImportFileExcel
        isModalImportFile={isModalImportFile}
        setIsModalImportFile={setIsModalImportFile}
      />
    </>
  );
};

export default TableUserWithPaginate;
