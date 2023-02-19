import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import manufacturers from "./Manufacturers";

const Partners = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <div>
      <div className="partners-header-text">
        EKSKLUZIVNI SMO DISTRIBUTERI SLEDEĆIH PROIZVOĐAČA:
      </div>
      <div className="container">
        <Slider {...settings}>
          {manufacturers.map((item) => {
            return (
              <div>
                <a
                  href={item.website}
                  target="_blank"
                  rel="noreferrer"
                  draggable={false}
                >
                  <img src={item.manufacturer} alt={item.name}></img>
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Partners;
