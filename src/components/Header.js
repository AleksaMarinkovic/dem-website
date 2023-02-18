import React from "react";
import { HashLink, NavHashLink } from "react-router-hash-link";

const Header = () => {
  return (
    <div className="header-container-wrapper">
      <HashLink smooth to="/#top" className="header-image-container">
        <img
          src={require("../images/dem-logo-desktop.webp")}
          className="header-logo-image"
          alt="HOME"
        ></img>
      </HashLink>
      <div className="header-container">
        <NavHashLink smooth to={"/#top"} className="header-item-container">
          NASLOVNA
        </NavHashLink>
        <NavHashLink
          smooth
          to={"/products#top"}
          className="header-item-container"
        >
          PROIZVODI
        </NavHashLink>
        <NavHashLink smooth to={"/info#top"} className="header-item-container">
          KONTAKT
        </NavHashLink>
        <NavHashLink
          smooth
          to={"/service#top"}
          className="header-item-container"
        >
          SERVIS
        </NavHashLink>
        <NavHashLink smooth to={"/blog#top"} className="header-item-container">
          BLOG
        </NavHashLink>
      </div>
    </div>
  );
};
export default Header;
