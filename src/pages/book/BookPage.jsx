import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./BookPage.scss";
import ImageGallery from "react-image-gallery";
import { getBookDetail } from "~/services/Api";
import { GrDeliver } from "react-icons/gr";
import {
  AiOutlineLine,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { Rate } from "antd";
import { useRef, useState } from "react";
import ModalImage from "./modalImage/ModalImage";
import LoadingBookDetail from "./loadingBookDetail/LoadingBookDetail";
import BookInfor from "./bookInfor/BookInfor";
import SlideBook from "./slideBook/SlideBook";

const BookPage = () => {
  const [loadingBookDetail, setLoadingBookDetail] = useState(false);
  const [dataBookDetail, setDataBookDetail] = useState({});
  const [categoryBookDetail, setCategoryBookDetail] = useState("");
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id"); // get book id

  // get data book
  useEffect(() => {
    getDataBook();
  }, [id]);

  const getDataBook = async () => {
    setLoadingBookDetail(true);
    const res = await getBookDetail(id);
    if (res && res?.data) {
      let raw = res?.data;
      console.log(res.data);
      setDataBookDetail(res?.data);
      getImages(raw);
    }
    setLoadingBookDetail(false);
  };
  const [images, setImages] = useState([]);
  const getImages = (raw) => {
    let listSlide = [];
    if (raw && raw.thumbnail) {
      listSlide.push({
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          raw?.thumbnail
        }`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          raw?.thumbnail
        }`,
      });
    }
    if (raw && raw?.slider?.length > 0) {
      raw.slider.map((item) => {
        listSlide.push({
          original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        });
      });
    }
    if (listSlide) setImages(listSlide);
  };

  const [quantityBook, setQuantityBook] = useState(1);
  const currentQuantityBook = dataBookDetail.quantity - dataBookDetail.sold;
  const clickDecreaseBook = () => {
    if (quantityBook > 1) {
      setQuantityBook(+quantityBook - 1);
    }
  };
  const clickIncreaseBook = () => {
    if (quantityBook < +currentQuantityBook) {
      setQuantityBook(+quantityBook + 1);
      console.log(currentQuantityBook);
      console.log(quantityBook);
    }
  };
  const handleChangeQuantityBook = (e) => {
    setQuantityBook(e.target.value);
    if (e.target.value > +currentQuantityBook) {
      setQuantityBook(+currentQuantityBook);
    }
  };
  // image
  const refGallery = useRef();
  const [openModalImage, setOpenModalImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const handleOnClickImage = () => {
    setOpenModalImage(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    if (window.outerWidth < 739) {
      setOpenModalImage(false);
    }
  };
  return (
    <section className="bookPage">
      {
        <div className="row grid wide">
          <div className="bookPage__container">
            <div className="bookPage__left col l-5 m-12 ">
              {" "}
              <div className="display-pc">
                <ImageGallery
                  ref={refGallery}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  items={images}
                  slideOnThumbnailOver={true}
                  showNav={false}
                  onClick={handleOnClickImage}
                />
              </div>
              <div className="display-mobile">
                <ImageGallery
                  ref={refGallery}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  items={images}
                  showThumbnails={false}
                  showNav={false}
                  onClick={handleOnClickImage}
                />
              </div>
            </div>

            <div className="bookPage__right col l-7 m-12 c-12">
              <div className="bookPage__right--wrap">
                <p className="bookPage__right--author">
                  Tác giả:
                  <span
                    style={{
                      color: "#5bb9ec",
                      marginLeft: "8px",
                      cursor: "pointer",
                    }}
                  >
                    {dataBookDetail.author}
                  </span>
                </p>
                <h3 className="bookPage__right--header line-clamp">
                  {dataBookDetail.mainText}
                </h3>
                <div className="bookPage__right--rate">
                  <div className="bookPage__rate--left">
                    <strong className="bookPage__rate--left--text">3</strong>
                    <Rate
                      defaultValue={3}
                      disabled
                      className="bookPage__rate--left--start"
                    />
                  </div>

                  <div className="bookPage__rate--right">
                    <strong className="bookPage__rate--right--number">
                      {Math.floor(dataBookDetail.sold * 1.5)}
                    </strong>
                    <span className="bookPage__rate--right--title">
                      Đánh giá
                    </span>
                  </div>
                  <div className="bookPage__rate--right display-on-pc">
                    <strong className="bookPage__rate--right--number">
                      {dataBookDetail.sold}
                    </strong>
                    <span className="bookPage__rate--right--title">Đã bán</span>
                  </div>
                </div>
                <div className="bookPage__right--price">
                  <div className="bookPage__price--wrap">
                    <div className="bookPage__price--old">
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(+dataBookDetail.price + 30000)}
                    </div>
                    <div className="bookPage__price--new">
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(+dataBookDetail.price)}
                    </div>
                  </div>
                </div>
                <div className="bookPage__right--deliver">
                  <label className="bookPage__deliver--title">Vận chuyển</label>
                  <div className="bookPage__deliver--content">
                    <GrDeliver className="bookPage__deliver--icon" />
                    <span className="bookPage__deliver--desc">
                      Miễn phí vận chuyển
                    </span>
                  </div>
                </div>
                <div className="bookPage__right--quant">
                  <label className="bookPage__quant--title">Số lượng</label>
                  <div className="bookPage__quant--wrap">
                    <div className="bookPage__quant--wrap--count">
                      <button
                        className="bookPage__quant--wrap--btn"
                        onClick={clickDecreaseBook}
                      >
                        <AiOutlineLine />
                      </button>
                      <input
                        type="number"
                        value={quantityBook}
                        onChange={handleChangeQuantityBook}
                        className="bookPage__quant--wrap--input"
                      />
                      <button
                        className="bookPage__quant--wrap--btn"
                        onClick={clickIncreaseBook}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                    <p className="bookPage__quant--wrap--desc">
                      {`${
                        dataBookDetail.quantity - dataBookDetail.sold
                      } sản phẩm có sẵn`}
                    </p>
                  </div>
                </div>
                <div className="bookPage__right--add">
                  <button className="bookPage__add--btn">
                    <AiOutlineShoppingCart className="bookPage__add--btn--icon" />
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                  <button className="bookPage__add--buy">Mua ngay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <ModalImage
        openModalImage={openModalImage}
        images={images}
        setOpenModalImage={setOpenModalImage}
        currentIndex={currentIndex}
        dataBookDetail={dataBookDetail}
      />
      {loadingBookDetail && <LoadingBookDetail />}
      <SlideBook dataBookDetail={dataBookDetail} />
      <BookInfor dataBookDetail={dataBookDetail} />
    </section>
  );
};

export default BookPage;
