import { getAllBookWithPaginate } from "~/redux/reducer/bookReducer/bookSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "~/components/Home/bookItem";
import "./SlideBook.scss";

import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const SlideBook = ({ dataBookDetail }) => {
  const getCategory = dataBookDetail.category;

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    let query = `pageSize=5&current=${currentPage}&category=${getCategory}`;
    dispatch(getAllBookWithPaginate(query));
  }, [getCategory, currentPage]);

  const listBooks = useSelector((state) => state?.books?.listBooksPaginate);

  const [hide, setHide] = useState(true);
  const nextSlide = () => {
    if (currentPage < 2) {
      console.log(currentPage);

      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <section className="slideBook row grid wide">
        <div className="slideBook__container">
          <AiOutlineLeft
            className="slideBook__right--arrow"
            onClick={prevSlide}
          />

          <AiOutlineRight
            className="slideBook__left--arrow"
            onClick={nextSlide}
          />

          <h4 className=" slider__title">SẢN PHẨM LIÊN QUAN</h4>
          <div className=" slider__wrap ">
            {listBooks &&
              listBooks?.length > 0 &&
              listBooks.map((slide, index) => {
                return (
                  <div className=" col l-2 c-0" key={index}>
                    {" "}
                    <BookItem item={slide} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SlideBook;
