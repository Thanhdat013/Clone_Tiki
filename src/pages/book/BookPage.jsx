import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

import { HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Rate, message } from "antd"
import { useRef, useState } from "react"
import {
  AiOutlineLine,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai"
import { GrDeliver } from "react-icons/gr"
import ImageGallery from "react-image-gallery"
import { useNavigate } from "react-router-dom"
import { doAddCartAction } from "~/redux/reducer/orderReducer/orderSlice"
import { getBookDetail } from "~/services/Api"
import "./BookPage.scss"
import BookInfor from "./bookInfor/BookInfor"
import LoadingBookDetail from "./loadingBookDetail"
import ModalImage from "./modalImage/ModalImage"
import SlideBook from "./slideBook/SlideBook"

const BookPage = () => {
  // lấy thông tin xem đã đăng nhập tài khoản hay là chưa
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated)
  const carts = useSelector((state) => state.orders.carts)
  const [isLoadingBookDetail, setIsLoadingBookDetail] = useState(false)
  const [dataBookDetail, setDataBookDetail] = useState({})
  let location = useLocation()
  let params = new URLSearchParams(location.search)
  const id = params?.get("id") // get book id
  // xử lý lấy số lượng sách đã được đặt theo id

  const [quantityBookOrder, setQuantityBookOrder] = useState(0)
  useEffect(() => {
    getDataBook()
  }, [id])

  const getDataBook = async () => {
    setIsLoadingBookDetail(true)
    const res = await getBookDetail(id)
    if (res && res?.data) {
      let raw = res?.data
      setDataBookDetail(res?.data)
      getImages(raw)
    }
    setIsLoadingBookDetail(false)
  }
  const [images, setImages] = useState([])
  const getImages = (raw) => {
    let listSlide = []
    if (raw && raw.thumbnail) {
      listSlide.push({
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          raw?.thumbnail
        }`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          raw?.thumbnail
        }`,
      })
    }
    if (raw && raw?.slider?.length > 0) {
      raw.slider.map((item) => {
        listSlide.push({
          original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        })
      })
    }
    if (listSlide) setImages(listSlide)
  }

  // quantity order book
  const [quantityBook, setQuantityBook] = useState(1)
  const currentQuantityBook = dataBookDetail.quantity
  const handleChangeButton = (type) => {
    if (type === "DECREASE" && +quantityBook > 1) {
      setQuantityBook(+quantityBook - 1)
    }
    if (type === "INCREASE" && +quantityBook < +currentQuantityBook) {
      setQuantityBook(+quantityBook + 1)
    }
  }
  const handleChangeQuantityBook = (e) => {
    setQuantityBook(e.target.value)
    if (e.target.value > +currentQuantityBook) {
      setQuantityBook(+currentQuantityBook)
    }
  }
  // image
  const refGallery = useRef()
  const [openModalImage, setOpenModalImage] = useState(false)
  const [currentIndex, setCurrentIndex] = useState()
  const handleOnClickImage = () => {
    setOpenModalImage(true)
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    if (window.outerWidth < 739) {
      setOpenModalImage(false)
    }
  }
  // add to cart
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleAddToCart = (quantityBook, dataBookDetail) => {
    if (isAuthenticated === false) {
      navigate("/login", { replace: true })
    }
    dispatch(
      doAddCartAction({
        quantity: quantityBook,
        detail: dataBookDetail,
        _id: dataBookDetail._id,
      })
    )

    message.success("Sản phẩm đã được thêm vào giỏ hàng ")
    setQuantityBook(1)
  }

  const handleBuyItem = (quantityBook, dataBookDetail) => {
    if (isAuthenticated === false) {
      navigate("/login", { replace: true })
    }
    dispatch(
      doAddCartAction({
        quantity: quantityBook,
        detail: dataBookDetail,
        _id: dataBookDetail._id,
      })
    )
    setQuantityBook(1)
    navigate("/cart", { replace: true })
  }
  // random rate
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
  return (
    <section className="bookPage">
      {
        <div className="row grid wide">
          <Breadcrumb
            className="breadcrumb l-12 m-12 c-12"
            style={{ marginTop: "12px " }}
            items={[
              {
                title: (
                  <Link to="/">
                    <HomeOutlined style={{ fontSize: "2rem" }} />
                  </Link>
                ),
              },

              {
                title: (
                  <span style={{ fontSize: "1.6rem", color: "#2CD3E1" }}>
                    {" "}
                    Detail book
                  </span>
                ),
              },
            ]}
          />
          <div className="bookPage__container row  ">
            <div className="bookPage__left col l-5 m-12 c-12">
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
                    {/* <strong className="bookPage__rate--left--text">3</strong> */}
                    <Rate
                      defaultValue={getRandomInt(5)}
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
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(+dataBookDetail.price + 30000)}
                    </div>
                    <div className="bookPage__price--new">
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
                        onClick={() => handleChangeButton("DECREASE")}
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
                        onClick={() => handleChangeButton("INCREASE")}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                    <p className="bookPage__quant--wrap--desc">
                      {`${dataBookDetail.quantity} sản phẩm có sẵn`}
                    </p>
                  </div>
                </div>
                <div className="bookPage__right--add">
                  <button
                    className="bookPage__add--btn"
                    onClick={() =>
                      handleAddToCart(quantityBook, dataBookDetail)
                    }
                  >
                    <AiOutlineShoppingCart className="bookPage__add--btn--icon" />
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                  <button
                    onClick={() => handleBuyItem(quantityBook, dataBookDetail)}
                    className="bookPage__add--buy"
                  >
                    Mua ngay
                  </button>
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
      {isLoadingBookDetail && <LoadingBookDetail />}
      <SlideBook
        dataBookDetail={dataBookDetail}
        setQuantityBook={setQuantityBook}
      />
      <BookInfor dataBookDetail={dataBookDetail} />
    </section>
  )
}

export default BookPage
