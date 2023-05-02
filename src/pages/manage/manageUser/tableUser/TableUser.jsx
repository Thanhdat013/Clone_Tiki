import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllUser } from "~/redux/reducer/userReducer/userSlice";

const TableUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const listUsers = useSelector((state) => state.users.listUsers);

  const dataSource = listUsers.map((item, index) => {
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
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",

      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 3,
      },
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      width: "20%",
      sorter: {
        compare: (a, b) => a.fullName - b.fullName,
        multiple: 2,
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "20%",
      compare: (a, b) => "a.Phone number" - "b.Phone number",
      sorter: {
        multiple: 1,
      },
    },
    {
      title: "Role ",
      dataIndex: "role",
      width: "10%",
      sorter: {
        compare: (a, b) => a.role - b.role,
        multiple: 1,
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {};
  return (
    <>
      <h2>Table User</h2>
      <Table dataSource={dataSource} columns={columns} onChange={onChange} />
    </>
  );
};

export default TableUser;
