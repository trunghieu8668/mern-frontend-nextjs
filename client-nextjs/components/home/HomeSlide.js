import React from "react";
import Swiper from "react-id-swiper";

const HomeSlide = (props) => {
  const params = {
    speed: 1000,
    spaceBetween: 0,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    loop: true,
    slidesPerView: 1,
    rebuildOnUpdate: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  };

  return (
    <Swiper {...params}>
      <div className="item">
        <img src="https://dummyimage.com/1920x550/cccccc/333333.jpg" alt="Awesome Image" />
      </div>
      <div className="item">
        <img src="https://dummyimage.com/1920x550/cccccc/333333.jpg" alt="Awesome Image" />
      </div>
    </Swiper>
  )
};
export default HomeSlide;
