import React from "react";
import { Carousel } from "react-responsive-carousel";
import innomed from '../images/INNOMED.webp';
import zoll from '../images/ZOLL.webp';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Partners = () => {
  return (
    <div className="partners-wrapper">
      <Carousel showArrows={true} autoPlay infiniteLoop showThumbs={false} stopOnHover>
        <div>
          <img src={zoll} alt='zoll'/>
          <p className="legend">ZOLL</p>
        </div>
        <div>
          <img src={innomed} alt='innomed'/>
          <p className="legend">INNOMED</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Partners;
