import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { GrRefresh } from "react-icons/gr";

import { getAllBookWithPaginate } from "~/redux/reducer/bookReducer/bookSlice";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";

import { Table, Button, Row, Col } from "antd";
import FormFilterBook from "~/pages/manage/manageBook/formFilterBook";
import DetailItem from "~/pages/manage/components/detailItem";

import AddNewBook from "~/pages/manage/manageBook/addNewBook";
import UpdateBook from "~/pages/manage/manageBook/updateBook";
import DeleteBook from "~/pages/manage/manageBook/deleteBook";

import "./TableBookWithPaginate.scss";

const TableUserWithPaginate = () => {
  const totalPages = useSelector((state) => state.books.totalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [filterInput, setFilterInput] = useState("");
  const [arrangeColumn, SetArrangeColumn] = useState("sort=-updatedAt");

  const dispatch = useDispatch();
  const listBooksPaginate = useSelector(
    (state) => state.books.listBooksPaginate
  );
  useEffect(() => {
    getAllBook();
  }, [pageSize, currentPage, filterInput, arrangeColumn]);

  const getAllBook = async () => {
    let query = `pageSize=${pageSize}&current=${currentPage}&${filterInput}&${arrangeColumn}`;
    dispatch(getAllBookWithPaginate(query));
  };
  const renderHeaderTitle = (text, record, index) => {
    return (
      <>
        <header className="manageBook__header">
          <div className=" row ">
            <div className="manageBook__header--wrap l-12">
              <h2 className="manageBook__header--title l-4">Table list</h2>
              <div className="manageBook__header--btn row l-3">
                <Button
                  className="manageBook__header--btn--add l-4"
                  onClick={clickOpenAddBook}
                  loading={isLoading}
                  type="primary"
                >
                  <BiBookAdd className="manageBook__btn--add--title" />
                  <span className="manageBook__btn--add--title">Add</span>
                </Button>
                <Button
                  className="manageBook__header--btn--refresh l-2"
                  icon={<GrRefresh />}
                  onClick={handleRefresh}
                  loading={isLoading}
                  type="text"
                ></Button>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  };
  const columns = [
    // {
    //   title: "Id.",
    //   dataIndex: "_id",
    //   width: "15%",
    //   fixed: "left",
    //   render: (text, index, record) => (
    //     <span
    //       onClick={() => {
    //         // showDetailUser(text, record, index)
    //         console.log("check record", record);
    //       }}
    //       className="table__detail"
    //     >
    //       {text}
    //     </span>
    //   ),
    // },
    {
      title: "Name book",
      dataIndex: "mainText",
      width: "15%",
      sorter: true,
      fixed: "left",
      render: (text, index, record) => (
        <span
          onClick={() => {
            showDetailBook(text, record, index);
            // console.log("check record", record);
          }}
          className="table__detail"
        >
          {text}
        </span>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      width: "10%",
      sorter: true,
    },
    {
      title: "Price (VNĐ)",
      dataIndex: "price",
      width: "8%",
      sorter: true,
      render: (text, index, record) => (
        <>
          <span>{`${text}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</span>
        </>
      ),
    },
    {
      title: "Category ",
      dataIndex: "category",
      width: "10%",
      sorter: true,
    },
    {
      title: "Created at ",
      dataIndex: "createdAt",
      width: "15%",
      sorter: true,
      render: (text, index, record) => (
        <span>{moment(text).format("DD-MM-YYYY, HH:mm:ss a")}</span>
      ),
    },
    {
      title: "Updated at ",
      dataIndex: "updatedAt",
      width: "15%",
      sorter: true,
      render: (text, index, record) => (
        <span>{moment(text).format("DD-MM-YYYY, HH:mm:ss a")}</span>
      ),
    },
    {
      title: "Quantity ",
      dataIndex: "quantity",
      width: "10%",
      sorter: true,
    },
    {
      title: "Sold ",
      dataIndex: "sold",
      width: "10%",

      sorter: true,
    },
    {
      title: "Action ",
      width: "10%",
      render: (text, record, index) => (
        <div className="manageBook__icon">
          <AiOutlineDelete
            onClick={() => showModalDelete(text, record, index)}
            className="manageBook__delete--user "
          />
          <AiOutlineEdit
            onClick={() => showModalUpdate(text, record, index)}
            className="manageBook__edit--user "
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
  // Filter
  const handleFilter = (filter) => {
    setFilterInput(filter);
  };

  const onClose = () => {
    setOpen(false);
  };

  // show detail book'
  const [open, setOpen] = useState(false);
  const [dataViewBook, setDataViewBook] = useState("");
  const showDetailBook = (text, index, record) => {
    console.log(record);
    setDataViewBook(record);
    setOpen(true);
  };
  // show add new book
  const [openAddBook, setOpenAddBook] = useState(false);
  const clickOpenAddBook = () => {
    setOpenAddBook(true);
  };

  // show update book
  const [openUpdateBook, setOpenUpdateBook] = useState(false);
  const [dataUpdateBook, setDataUpdateBook] = useState("");
  const showModalUpdate = (record) => {
    setOpenUpdateBook(true);
    setDataUpdateBook(record);
  };

  // show update book
  const [openDeleteBook, setOpenDeleteBook] = useState(false);
  const [dataDeleteBook, setDataDeleteBook] = useState("");
  const showModalDelete = (record) => {
    setOpenDeleteBook(true);
    setDataDeleteBook(record);
  };
  return (
    <>
      <Row className="manage__book">
        <Col span={24}>
          <FormFilterBook handleFilter={handleFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeaderTitle}
            dataSource={listBooksPaginate}
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
                    {range[0]}-{range[1]} trên {total} trang
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>
      <DetailItem dataViewBook={dataViewBook} open={open} setOpen={setOpen} />
      <AddNewBook
        getAllBook={getAllBook}
        openAddBook={openAddBook}
        setOpenAddBook={setOpenAddBook}
      />
      <UpdateBook
        getAllBook={getAllBook}
        openUpdateBook={openUpdateBook}
        setOpenUpdateBook={setOpenUpdateBook}
        dataUpdateBook={dataUpdateBook}
        setDataUpdateBook={setDataUpdateBook}
      />
      <DeleteBook
        getAllBook={getAllBook}
        openUpdateBook={openDeleteBook}
        setOpenDeleteBook={setOpenDeleteBook}
        dataDeleteBook={dataDeleteBook}
        setDataDeleteBook={setDataDeleteBook}
      />
    </>
  );
};

export default TableUserWithPaginate;
