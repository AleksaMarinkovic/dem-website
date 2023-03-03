import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const Partners = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  const [isBusy, setIsBusy] = useState(true);
  const [manufacturers, setManufacturers] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getManufacturers")
        .then((response) => {
          if (response.data.success) {
            setManufacturers(response.data.data);
            setIsBusy(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            setFetchError(error.response.data.message);
          } else if (error.request) {
            // request made no response from server
            setFetchError("Error 003");
          } else {
            // request setup failed
            setFetchError("Error 004");
          }
        });
    }
    fetchData();
  }, []);

  return (
    <div>
      {isBusy && !fetchError && <LoadingSpinner/>}
      {fetchError && <div className="error-message">{fetchError}</div>}
      {!isBusy && (
        <div>
          <div className="partners-header-text">
            EKSKLUZIVNI SMO DISTRIBUTERI SLEDEĆIH PROIZVOĐAČA:
          </div>
          <div className="container-partners">
            <Slider {...settings}>
              {manufacturers.map((item) => {
                return (
                  <div>
                    <a
                      href={item.manufacturerWebsiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      draggable={false}
                      title="Kliknite da posetite website proizvođača"
                    >
                      <img src={item.manufacturerImageUrl} alt={item.manufacturerName}></img>
                    </a>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;
