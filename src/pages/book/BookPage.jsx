import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./BookPage.scss";
import ImageGallery from "react-image-gallery";
import { getAllBookWithPaginate } from "~/redux/reducer/bookReducer/bookSlice";
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

const BookPage = () => {
  const [loadingBookDetail, setLoadingBookDetail] = useState(false);
  const dispatch = useDispatch();
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id"); // get book id

  console.log("check id book,", id);
  const BookDetails = useSelector((state) => state.books.listBooksPaginate);
  console.log(BookDetails);
  // get data book
  useEffect(() => {
    getDataBook();
  }, [id]);

  const getDataBook = async () => {
    let query = `current=1&_id=${id}`;
    dispatch(getAllBookWithPaginate(query));
  };

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  const [quantityBook, setQuantityBook] = useState(1);
  const clickDecreaseBook = () => {
    if (quantityBook > 1) {
      setQuantityBook(quantityBook - 1);
    }
  };
  const clickIncreaseBook = () => {
    setQuantityBook(quantityBook + 1);
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
              <p className="bookPage__right--author">{`Tác giả: ${BookDetails.author}`}</p>
              <h3 className="bookPage__right--header line-clamp">
                {BookDetails.mainText}
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
                    1,9k
                  </strong>
                  <span className="bookPage__rate--right--title">Đánh giá</span>
                </div>
                <div className="bookPage__rate--right display-on-pc">
                  <strong className="bookPage__rate--right--number">6k</strong>
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
                    }).format(120000)}
                  </div>
                  <div className="bookPage__price--new">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(+BookDetails.price)}
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
                      type="text"
                      value={quantityBook}
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
                    20 sản phẩm có sẵn
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
      <ModalImage
        openModalImage={openModalImage}
        images={images}
        setOpenModalImage={setOpenModalImage}
        currentIndex={currentIndex}
      />
      {loadingBookDetail && <LoadingBookDetail />}
    </section>
  );
};

export default BookPage;
