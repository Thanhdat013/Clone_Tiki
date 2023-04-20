import { useEffect, useState } from "react";
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
} from "antd";
import { getAllBookWithPaginate } from "~/redux/reducer/bookReducer/bookSlice";
import { getAllCategories } from "~/services/Api";
import "./Home.scss";
import { AiOutlineFilter } from "react-icons/ai";
import { GrRefresh } from "react-icons/gr";

const Home = () => {
  // get data book
  const listBooks = useSelector((state) => state.books.listBooksPaginate);
  const totalPages = useSelector((state) => state.books.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePage, setSizePage] = useState(10);
  const [filterInput, setFilterInput] = useState("");
  const [arrangeColumn, SetArrangeColumn] = useState("sort=-updatedAt");

  const dispatch = useDispatch();

  useEffect(() => {
    getAllBook();
  }, [sizePage, currentPage, filterInput, arrangeColumn]);

  const getAllBook = async () => {
    let query = `pageSize=${sizePage}&current=${currentPage}&${filterInput}&${arrangeColumn}`;
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
  // list categories
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

  const onChangeCheck = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  // list tab
  const onChangeTab = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: `Phổ Biến`,
      children: <></>,
    },
    {
      key: "2",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "3",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "",
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
            <GrRefresh className="left__header--refresh" />
          </header>
          <Divider />
          <article className="home__left--container">
            <div>
              Thể loại
              <Checkbox.Group
                className="left__container--check"
                options={listCategory}
                onChange={onChangeCheck}
              />
            </div>
            <Divider />
            <div className="left__container--price">
              <p>Khoảng giá</p>
              <Form.Item className="left__container--price--input">
                <InputNumber
                  placeholder="₫ TỪ"
                  style={{ width: "40%" }}
                  controls={false}
                  formatter={(value) =>
                    value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                  }
                />
                <div className="left__container--price--line"></div>
                <InputNumber
                  placeholder="₫ ĐẾN"
                  controls={false}
                  style={{ width: "40%" }}
                  formatter={(value) =>
                    value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                  }
                />
              </Form.Item>
              <Button type="primary" style={{ width: "100%" }}>
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
        </section>
        <section className="home__right col l-10 m-12 c-12">
          <header className="home__right--header c-0">
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={onChangeTab}
              className="home__right--header--tab1"
              size="large"
            />
          </header>
          <div className="home__right--container row sm-gutter ">
            {listBooks &&
              listBooks.length > 0 &&
              listBooks.map((item) => (
                <div key={item._id} className="col l-2-4 m-4 c-6">
                  <div className="right__container  ">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                        item?.thumbnail
                      }`}
                      alt=""
                      className="right__container--img"
                    />
                    <div className="right__container--content">
                      <h4 className="right__container--title line-clamp">
                        {item.mainText}
                      </h4>
                      <div className="right__container--price">
                        <span>
                          {`${item.price}`.replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                          )}
                        </span>
                        <span>₫</span>
                      </div>
                      <div className="right__container--rate">
                        <Rate
                          defaultValue={4}
                          disabled
                          className="right__container--rate--start"
                        />
                        <span className="right__container--rate--text">
                          {`Đã bán ${item.sold} `}
                        </span>
                      </div>
                    </div>
                  </div>
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
            />
          </footer>
        </section>
      </div>
    </section>
  );
};
export default Home;
