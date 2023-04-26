import "./ManageOrder.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { GrRefresh } from "react-icons/gr";

import { getManageOrder } from "~/services/Api";
import { Table, Button, Row, Col } from "antd";

const ManageOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();
  const [dataOrder, setDataOrder] = useState([]);
  const [arrangeColumn, SetArrangeColumn] = useState("sort=-updatedAt");

  useEffect(() => {
    getHistory();
  }, [currentPage, pageSize, arrangeColumn]);
  const getHistory = async () => {
    let query = `current=${currentPage}&pageSize=${pageSize}&${arrangeColumn}`;
    const res = await getManageOrder(query);
    if (res && res.data) {
      let raw = res.data;
      console.log(raw);
      setPageSize(raw.meta.pageSize);
      setTotalPage(raw.meta.total);
      setDataOrder(raw.result);
    }
  };

  const renderHeaderTitle = (text, record, index) => {
    return (
      <>
        <header className="manageOrder__header">
          <div className=" row ">
            <div className="manageOrder__header--wrap l-12">
              <h2 className="manageOrder__header--title l-4">
                Table List Order
              </h2>
              <GrRefresh
                onClick={handleRefresh}
                style={{ fontSize: "2.4rem", cursor: "pointer" }}
              />
            </div>
          </div>
        </header>
      </>
    );
  };
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      width: "15%",
      sorter: true,
      fixed: "left",
      render: (text, index, record) => (
        <span
          onClick={() => {
            // console.log("check record", record);
          }}
          className="table__detail"
        >
          {text}
        </span>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "15%",
      sorter: true,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "totalPrice",
      width: "15%",
      sorter: true,
      render: (text, index, record) => (
        <>
          <span>{`${text}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</span>
        </>
      ),
    },
    {
      title: "Địa chỉ ",
      dataIndex: "address",
      width: "15%",
      sorter: true,
    },
    {
      title: "Ngày mua hàng ",
      dataIndex: "createdAt",
      width: "20%",
      sorter: true,
      render: (text, index, record) => (
        <span>{moment(text).format("DD-MM-YYYY, HH:mm:ss a")}</span>
      ),
    },
    {
      title: "Ngày giao hàng ",
      dataIndex: "updatedAt",
      width: "20%",
      sorter: true,
      render: (text, index, record) => (
        <span>{moment(text).format("DD-MM-YYYY, HH:mm:ss a")}</span>
      ),
    },
  ];

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
  // refresh filter sort
  const handleRefresh = () => {
    SetArrangeColumn("");
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="order">
      <Row className="manage__order" align={"center"}>
        <Col span={24}>
          <Table
            title={renderHeaderTitle}
            dataSource={dataOrder}
            columns={columns}
            onChange={handleChange}
            rowKey="_id"
            style={{ padding: "12px 24px" }}
            bordered
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              pageSize: pageSize,
              total: totalPage,
              responsive: true,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ManageOrder;
