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
import { useNavigate } from "react-router-dom";

const Home = () => {
  // get data book
  const listBooks = useSelector((state) => state.books.listBooksPaginate);
  const totalPages = useSelector((state) => state.books.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePage, setSizePage] = useState(10);
  const [filterInput, setFilterInput] = useState("");
  const [arrangeColumn, SetArrangeColumn] = useState("sort=-sold");

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

  const handleFilterValue = (changeValues, values) => {
    console.log("checked = ", changeValues, values);
    if (changeValues.category && changeValues.category.length > 0) {
      const cate = changeValues.category.join(",");
      let filter = `&category=${cate}`;
      setFilterInput(filter);
    } else setFilterInput("");
  };

  // filter price
  const handleFilterPrice = (values) => {
    console.log(values);
    if (values?.range?.from >= 0 && values?.range?.to >= 0) {
      let price = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      if (values?.category?.length > 0) {
        const cate = changeValues.category.join(",");
        price += `&category=${cate}`;
      }
      setFilterInput(price);
    }
  };

  // reset form
  const [form] = Form.useForm();
  const handleRefresh = () => {
    form.resetFields();
    setFilterInput("");
  };

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

  // remove vietnamese

  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  var convertSlug = function (str) {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  // Navigate detail book page
  const navigate = useNavigate();
  const handleNavigateBook = (item) => {
    const slug = convertSlug(item.mainText);
    navigate(`/book/${slug}?id=${item._id}`);
  };
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
                <Form.Item name="category">
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
        <section className="home__right col l-10 m-12 c-12">
          <header className="home__right--header c-0">
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={(key) => SetArrangeColumn(key)}
              className="home__right--header--tab1"
              size="large"
            />
          </header>
          <div className="home__right--container row sm-gutter ">
            {listBooks &&
              listBooks.length > 0 &&
              listBooks.map((item) => (
                <div
                  key={item._id}
                  className="col l-2-4 m-4 c-6"
                  onClick={() => handleNavigateBook(item)}
                >
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
              responsive
            />
          </footer>
        </section>
      </div>
    </section>
  );
};
export default Home;
