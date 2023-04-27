import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Checkbox,
  Form,
  Button,
  InputNumber,
  Divider,
  Rate,
  Tabs,
  Pagination,
  Drawer,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { getAllBookWithPaginate } from "~/redux/reducer/bookReducer/bookSlice";
import { getAllCategories } from "~/services/Api";
import "./Home.scss";
import { AiOutlineFilter } from "react-icons/ai";
import { GrRefresh } from "react-icons/gr";
import BookItem from "./bookItem/BookItem";

import { useDebounce } from "~/hooks";

const Home = () => {
  // get data book
  const listBooks = useSelector((state) => state?.books?.listBooksPaginate);
  const totalPages = useSelector((state) => state.books.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePage, setSizePage] = useState(20);
  const [filterInput, setFilterInput] = useState("");
  const [arrangeColumn, SetArrangeColumn] = useState("sort=-sold");
  const [filterSearchHeader, SetFilterSearchHeader] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    getAllBook();
  }, [sizePage, currentPage, filterInput, arrangeColumn, filterSearchHeader]);
  const getAllBook = async () => {
    let query = `pageSize=${sizePage}&current=${currentPage}&${filterInput}&${arrangeColumn}&${filterSearchHeader}`;

    dispatch(getAllBookWithPaginate(query));
  };

  // Change the current page
  const handlePageChange = (page, pageSize) => {
    if (page !== currentPage) setCurrentPage(page);
    if (sizePage !== pageSize) {
      setSizePage(pageSize);
      setCurrentPage(1);
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

  const handleFilterValue = (changeValues, values) => {
    console.log(changeValues);
    // for PC
    console.log(changeValues.category);
    if (changeValues?.category && changeValues?.category.length > 0) {
      const cate = changeValues.category.join(",");
      let filter = `category=${cate}`;
      console.log(filter);
      setFilterInput(filter);
    }
    // for mobile
    if (
      changeValues?.categoryMobile &&
      changeValues?.categoryMobile.length > 0
    ) {
      const cate = changeValues.categoryMobile.join(",");
      let filter = `category=${cate}`;
      console.log(filter);
      setFilterInput(filter);
    }
    if (
      (changeValues?.category && changeValues?.category.length === 0) ||
      (changeValues?.categoryMobile &&
        changeValues?.categoryMobile.length === 0)
    ) {
      setFilterInput("");
    }
  };

  // filter price
  const handleFilterPrice = (values) => {
    console.log(values);
    if (values?.range?.from >= 0 && values?.range?.to >= 0) {
      let price = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      if (values?.category?.length > 0) {
        const cate = values.category.join(",");
        price += `&category=${cate}`;
      }
      if (values?.categoryMobile?.length > 0) {
        const cate = values.categoryMobile.join(",");
        price += `&category=${cate}`;
      }
      setFilterInput(price);
    }
  };
  // filter mobile
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [openFilter, setOpenFilter] = useState(false);
  const showDrawer = () => {
    setOpenFilter(true);
  };

  // reset form
  const [form] = Form.useForm();
  const handleRefresh = () => {
    form.resetFields();
    setFilterInput("");
    SetFilterSearchHeader("");
  };

  // get value to filter from header search
  const [headerSearch, setHeaderSearch] = useOutletContext();
  const debouncedValue = useDebounce(headerSearch, 300);
  useEffect(() => {
    if (headerSearch) {
      console.log(headerSearch);
      const query = `mainText=/${headerSearch}/i`;
      SetFilterSearchHeader(query);
    } else {
      SetFilterSearchHeader("");
    }
  }, [debouncedValue]);

  const items = [
    {
      key: "sort=-sold",
      label: `Phổ Biến`,
      children: <></>,
    },
    {
      key: "sort=-createdAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

  return (
    <section className="home ">
      <div className="row grid wide">
        <section className="home__left col l-2 m-0 c-0">
          <header className="home__left--header">
            <AiOutlineFilter className="left__header--filter" />

            <div className="left__header--title">Bộ lọc tìm kiếm</div>
            <GrRefresh
              className="left__header--refresh"
              onClick={handleRefresh}
            />
          </header>
          <Divider />
          <Form
            name="filterPrice"
            form={form}
            onFinish={handleFilterPrice}
            autoComplete="off"
            layout="horizontal"
            onValuesChange={(changeValues, values) =>
              handleFilterValue(changeValues, values)
            }
          >
            <article className="home__left--container">
              <div>
                Thể loại
                <Form.Item name={"category"}>
                  <Checkbox.Group
                    className="left__container--check"
                    options={listCategory}
                  />
                </Form.Item>
              </div>
              <Divider />
              <div className="left__container--price">
                <p>Khoảng giá</p>

                <div className="left__container--price--form">
                  <Form.Item
                    name={["range", "from"]}
                    className="left__container--price--input"
                  >
                    <InputNumber
                      placeholder="₫ TỪ"
                      controls={false}
                      formatter={(value) =>
                        value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                      }
                    />
                  </Form.Item>
                  <Form.Item className="left__container--price--line"></Form.Item>
                  <Form.Item
                    name={["range", "to"]}
                    className="left__container--price--input"
                  >
                    <InputNumber
                      placeholder="₫ ĐẾN"
                      controls={false}
                      formatter={(value) =>
                        value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                      }
                    />
                  </Form.Item>
                </div>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={() => form.submit()}
                >
                  Áp dụng
                </Button>
              </div>
              <Divider />
              <div className="left__container--rate">
                <p>Đánh giá</p>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={5}
                    disabled
                    className="left__container--rate--start"
                  />
                </div>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={4}
                    disabled
                    className="left__container--rate--start"
                  />
                  <span className="left__container--rate--text">Trở lên</span>
                </div>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={3}
                    disabled
                    className="left__container--rate--start"
                  />
                  <span className="left__container--rate--text">Trở lên</span>
                </div>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={2}
                    disabled
                    className="left__container--rate--start"
                  />
                  <span className="left__container--rate--text">Trở lên</span>
                </div>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={1}
                    disabled
                    className="left__container--rate--start"
                  />
                  <span className="left__container--rate--text">Trở lên</span>
                </div>
              </div>
            </article>
          </Form>
        </section>

        <Drawer
          title={
            <div
              style={{
                width: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              className="left__header--title"
            >
              <span> Bộ lọc tìm kiếm</span>
              <GrRefresh
                className="left__header--refresh"
                onClick={handleRefresh}
              />
            </div>
          }
          width={350}
          onClose={handleCloseFilter}
          open={openFilter}
          placement={"left"}
          keyboard={13}
          className="left__drawer"
        >
          <Form
            name="filterPriceMobile"
            form={form}
            onFinish={handleFilterPrice}
            autoComplete="off"
            onValuesChange={(changeValues, values) =>
              handleFilterValue(changeValues, values)
            }
          >
            <article className="home__left--container">
              <div>
                <p
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "500",
                    marginBottom: "12px",
                  }}
                >
                  Thể loại
                </p>
                <Form.Item
                  name="categoryMobile"
                  className="left__container--check"
                >
                  <Checkbox.Group options={listCategory} />
                </Form.Item>
              </div>
              <Divider />
              <div className="left__container--price c-12">
                <p>Khoảng giá</p>

                <div className="left__container--price--form ">
                  <Form.Item
                    name={["range", "from"]}
                    className="left__container--price--input  "
                  >
                    <InputNumber
                      placeholder="₫ TỪ"
                      controls={false}
                      formatter={(value) =>
                        value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                      }
                    />
                  </Form.Item>
                  <Form.Item className="left__container--price--line"></Form.Item>
                  <Form.Item
                    name={["range", "to"]}
                    className="left__container--price--input"
                  >
                    <InputNumber
                      placeholder="₫ ĐẾN"
                      controls={false}
                      formatter={(value) =>
                        value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                      }
                    />
                  </Form.Item>
                </div>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={() => form.submit()}
                >
                  Áp dụng
                </Button>
              </div>
              <Divider />
              <div className="left__container--rate">
                <p>Đánh giá</p>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={5}
                    disabled
                    className="left__container--rate--start"
                  />
                </div>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={4}
                    disabled
                    className="left__container--rate--start"
                  />
                  <span className="left__container--rate--text">Trở lên</span>
                </div>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={3}
                    disabled
                    className="left__container--rate--start"
                  />
                  <span className="left__container--rate--text">Trở lên</span>
                </div>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={2}
                    disabled
                    className="left__container--rate--start"
                  />
                  <span className="left__container--rate--text">Trở lên</span>
                </div>
                <div className="left__container--start--wrap">
                  <Rate
                    defaultValue={1}
                    disabled
                    className="left__container--rate--start"
                  />
                  <span className="left__container--rate--text">Trở lên</span>
                </div>
              </div>
            </article>
          </Form>
        </Drawer>

        <section className="home__right col l-10 m-12 c-12">
          <header className="home__right--header ">
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={(key) => SetArrangeColumn(key)}
              className="home__right--header--tab"
              size="large"
            />
          </header>
          <div className="right__mobile m-3 c-3" onClick={showDrawer}>
            <AiOutlineFilter className="right__filter-mobile" />
            <span>Lọc</span>
          </div>

          <div className="home__right--container row sm-gutter ">
            {listBooks &&
              listBooks?.length > 0 &&
              listBooks.map((item, index) => (
                <div className="col l-2-4 m-4 c-6" key={index}>
                  <BookItem item={item} />
                </div>
              ))}
          </div>
          <footer className="home__right--footer">
            <Pagination
              current={currentPage}
              pageSize={sizePage}
              total={totalPages}
              onChange={handlePageChange}
              pageSizeOptions={[5, 10, 15, 20]}
              responsive
            />
          </footer>
        </section>
      </div>
    </section>
  );
};
export default Home;
