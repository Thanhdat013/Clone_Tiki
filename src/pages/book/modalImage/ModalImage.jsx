import { Modal, Row, Col, Image } from "antd";
import ImageGallery from "react-image-gallery";
import { useRef, useState, useEffect } from "react";
import "../BookPage.scss";

const ModalImage = ({
  openModalImage,
  images,
  setOpenModalImage,
  currentIndex,
  dataBookDetail,
}) => {
  const refGallery = useRef();
  const [activeIndex, setActiveIndex] = useState("");
  useEffect(() => {
    if (openModalImage) {
      setActiveIndex(currentIndex);
    }
  }, [openModalImage, currentIndex]);
  return (
    <>
      <Modal
        open={openModalImage}
        onCancel={() => setOpenModalImage(false)}
        width={"60vw"}
        footer={false}
        className="modal-gallery"
      >
        <Row gutter={[20, 20]}>
          <Col span={16}>
            <ImageGallery
              ref={refGallery}
              showPlayButton={false}
              showFullscreenButton={false}
              items={images}
              slideOnThumbnailOver={true}
              showThumbnails={false}
              slideDuration={0}
              startIndex={currentIndex}
              onSlide={(index) => setActiveIndex(index)}
            />
          </Col>
          <Col span={8}>
            <h4 style={{ marginBottom: "14px" }}>{dataBookDetail.mainText}</h4>
            <div>
              <Row gutter={[10, 10]}>
                {images &&
                  images.map((item, index) => (
                    <Col span={12} key={index}>
                      <Image
                        wrapperClassName="slider-image"
                        width={100}
                        height={100}
                        src={item.original}
                        preview={false}
                        onClick={() => refGallery.current.slideToIndex(index)}
                      />
                      <div
                        className={activeIndex === index ? "active__image" : ""}
                      ></div>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalImage;
