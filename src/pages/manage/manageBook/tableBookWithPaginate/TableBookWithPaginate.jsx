import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { GrRefresh } from "react-icons/gr"

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { getAllBookWithPaginate } from "~/redux/reducer/bookReducer/bookSlice"

import { Button, Col, Row, Table } from "antd"
import DetailItem from "~/pages/manage/components/detailItem"
import FormFilterBook from "~/pages/manage/manageBook/formFilterBook"

import { isMobile } from "react-device-detect"
import DeleteBook from "~/pages/manage/manageBook/deleteBook"
import UpdateBook from "~/pages/manage/manageBook/updateBook"
import "./TableBookWithPaginate.scss"

const TableUserWithPaginate = () => {
  const totalPages = useSelector((state) => state.books.totalPages)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [filterInput, setFilterInput] = useState("")
  const [arrangeColumn, SetArrangeColumn] = useState("sort=-updatedAt")

  const dispatch = useDispatch()
  const listBooksPaginate = useSelector(
    (state) => state.books.listBooksPaginate
  )
  useEffect(() => {
    getAllBook()
  }, [pageSize, currentPage, filterInput, arrangeColumn])

  const getAllBook = async () => {
    let query = `pageSize=${pageSize}&current=${currentPage}&${filterInput}&${arrangeColumn}`
    dispatch(getAllBookWithPaginate(query))
  }
  const renderHeaderTitle = (text, record, index) => {
    return (
      <>
        <header className="manageBook__header">
          <div className=" row ">
            <div className="manageBook__header--wrap l-12">
              <h2 className="manageBook__header--title l-4">Table list</h2>
              <div className="manageBook__header--btn row l-3">
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
    )
  }
  const columns = [
    {
      title: "Tên sách",
      dataIndex: "mainText",
      width: "10%",
      sorter: true,
      fixed: "left",
      render: (text, index, record) => (
        <span
          onClick={() => {
            showDetailBook(text, record, index)
          }}
          className="table__detail"
        >
          {text}
        </span>
      ),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      width: "10%",
      sorter: true,
    },
    {
      title: "Giá (VNĐ)",
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
      title: "Thể loại ",
      dataIndex: "category",
      width: "10%",
      sorter: true,
    },
    {
      title: "Ngày tạo ",
      dataIndex: "createdAt",
      width: "15%",
      sorter: true,
      render: (text, index, record) => (
        <span>{moment(text).format("DD-MM-YYYY, HH:mm:ss a")}</span>
      ),
    },
    {
      title: "Ngày cập nhật ",
      dataIndex: "updatedAt",
      width: "15%",
      sorter: true,
      render: (text, index, record) => (
        <span>{moment(text).format("DD-MM-YYYY, HH:mm:ss a")}</span>
      ),
    },
    {
      title: "Số lượng ",
      dataIndex: "quantity",
      width: "7%",
      sorter: true,
    },
    {
      title: "Đã bán ",
      dataIndex: "sold",
      width: "7%",

      sorter: true,
    },
    {
      title: "Hành động ",
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
  ]

  // refresh filter sort
  const handleRefresh = () => {
    setIsLoading(true)
    SetArrangeColumn("")
    setTimeout(() => setIsLoading(false), 300)
  }

  // change table
  const handleChange = (pagination, filters, sorter) => {
    let sorterClick = ""
    if (sorter && sorter.field) {
      sorter.order === "ascend"
        ? (sorterClick += `sort=${sorter.field}`)
        : (sorterClick += `sort=-${sorter.field}`)

      SetArrangeColumn(sorterClick)
    }

    if (pagination && pagination.current !== currentPage)
      setCurrentPage(pagination.current)

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize)
      setCurrentPage(1)
    }
  }
  // Filter
  const handleFilter = (filter) => {
    setFilterInput(filter)
  }

  const onClose = () => {
    setOpen(false)
  }

  // show detail book'
  const [open, setOpen] = useState(false)
  const [dataViewBook, setDataViewBook] = useState("")
  const showDetailBook = (text, index, record) => {
    setDataViewBook(record)
    setOpen(true)
  }
  // show add new book
  const [openAddBook, setOpenAddBook] = useState(false)
  const clickOpenAddBook = () => {
    setOpenAddBook(true)
  }

  // show update book
  const [openUpdateBook, setOpenUpdateBook] = useState(false)
  const [dataUpdateBook, setDataUpdateBook] = useState("")
  const showModalUpdate = (record) => {
    setOpenUpdateBook(true)
    setDataUpdateBook(record)
  }

  // show update book
  const [openDeleteBook, setOpenDeleteBook] = useState(false)
  const [dataDeleteBook, setDataDeleteBook] = useState("")
  const showModalDelete = (record) => {
    setOpenDeleteBook(true)
    setDataDeleteBook(record)
  }
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
            scroll={isMobile === true && { x: 2000 }}
            pagination={{
              position: ["bottomCenter"],
              showQuickJumper: true,
              current: currentPage,
              pageSize: pageSize,
              total: totalPages,
              pageSizeOptions: [2, 4, 6, 10],
              showSizeChanger: true,
              responsive: true,

              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]}-{range[1]} trên {total} cuốn
                  </div>
                )
              },
            }}
          />
        </Col>
      </Row>
      {isMobile === false && (
        <DetailItem dataViewBook={dataViewBook} open={open} setOpen={setOpen} />
      )}

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
  )
}

export default TableUserWithPaginate
