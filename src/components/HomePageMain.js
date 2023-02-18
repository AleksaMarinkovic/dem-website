import React from "react";
import { NavHashLink } from "react-router-hash-link";

const HomePageMain = () => {
  return (
    <div className="homepagemain-wrapper">
      <div className="homepagemain-image">
        <div className="homepagemain-text-wrapper">
          <h1 className="main-text">
            Prodaja, servis i proizvodnja medicinskih aparata
          </h1>
          <div className="homepagemain-buttons-container">
            <NavHashLink
              smooth
              to={"/service#top"}
              className="homepagemain-button"
            >
              SERVIS
            </NavHashLink>
            <NavHashLink
              smooth
              to={"/products#top"}
              className="homepagemain-button"
            >
              PROIZVODI
            </NavHashLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageMain;
