import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button, Row, Col } from "antd";
import { getAllUserWithPaginate } from "~/redux/reducer/userReducer/userSlice";
import FormFIlter from "~/pages/manage/manageUser/formFilter";
import "./TableUserWithPaginate";

const TableUserWithPaginate = () => {
  const listUsersPaginate = useSelector(
    (state) => state.users.listUsersPaginate
  );
  const totalPages = useSelector((state) => state.users.totalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [filterInput, setFilterInput] = useState("");

  const dispatch = useDispatch();
  const handleFilter = (filter) => {
    setFilterInput(filter);
  };

  useEffect(() => {
    let query = `pageSize=${pageSize}&current=${currentPage}&${filterInput}`;
    dispatch(getAllUserWithPaginate(query));
  }, [pageSize, currentPage, filterInput]);

  const dataSource = listUsersPaginate.map((item, index) => {
    return {
      key: item._id,
      no: index + 1,
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      role: item.role,
    };
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: "5%",
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
  ];
  const onChange = (pagination, sorter) => {
    if (pagination && pagination.current !== currentPage)
      setCurrentPage(pagination.current);

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <FormFIlter handleFilter={handleFilter} />
      </Col>
      <Col span={24}>
        <Table
          dataSource={dataSource}
          columns={columns}
          onChange={onChange}
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
          }}
        />
      </Col>
    </Row>
  );
};

export default TableUserWithPaginate;
