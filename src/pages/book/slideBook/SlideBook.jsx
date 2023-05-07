import { getAllBookWithPaginate } from "~/redux/reducer/bookReducer/bookSlice"

import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import BookItem from "~/components/Home/bookItem"
import "./SlideBook.scss"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"

const SlideBook = ({ dataBookDetail, setQuantityBook }) => {
  const getCategory = dataBookDetail?.category

  const dispatch = useDispatch()
  useEffect(() => {
    let query = `pageSize=10&current=1&category=${getCategory}`
    dispatch(getAllBookWithPaginate(query))
  }, [getCategory])

  const listBooks = useSelector((state) => state?.books?.listBooksPaginate)
  const slider = useRef()
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    dots: true,
    // autoplay: true,
    infinite: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 739,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <div className="slideBook grid wide">
      <div className="slideBook__container l-11">
        <h4 className=" slider__title">SẢN PHẨM LIÊN QUAN</h4>

        <Slider ref={slider} {...settings}>
          {listBooks &&
            listBooks?.length > 0 &&
            listBooks.map((item, index) => (
              <div key={index} className="l-12 m-12 c-12  slider__item">
                <BookItem item={item} setQuantityBook={setQuantityBook} />
              </div>
            ))}
        </Slider>
        <AiOutlineRight
          className=" slideBook__left--arrow"
          onClick={() => {
            slider?.current?.slickNext()
          }}
        />
        <AiOutlineLeft
          className="slideBook__right--arrow"
          onClick={() => slider?.current?.slickPrev()}
        />
      </div>
    </div>
  )
}

export default SlideBook
