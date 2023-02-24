import React from "react";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const handler = () => {
      setSmall((small) => {
        if (
          !small &&
          (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
        ) {
          return true;
        }

        if (
          small &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return small;
      });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handler);
      return () => window.removeEventListener("scroll", handler);
    }
  }, []);
  return (
    <Navbar
      sticky="top"
      className={`${
        small ? "header-container-wrapper-small" : "header-container-wrapper"
      }`}
      collapseOnSelect
      expand="lg"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
      <Nav className="ms-auto">
        <HashLink
          smooth
          to="/#top"
          className={`${
            small ? "header-image-container-small" : "header-image-container"
          }`}
        >
          <img
            src={require("../images/dem-logo-desktop.webp")}
            className="header-logo-image"
            alt="HOME"
          ></img>
        </HashLink>
      </Nav>
      <div className="header-horizontal-container">
        <NavHashLink smooth to={"/#top"} className="header-item-container">
          NASLOVNA
        </NavHashLink>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        </NavDropdown>
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
      </div>
    </Navbar>
    /*
    <div className={`${small? "header-container-wrapper-small" : "header-container-wrapper"}`}>
      <HashLink smooth to="/#top" className={`${small? "header-image-container-small" : "header-image-container"}`}>
        <img
          src={require("../images/dem-logo-desktop.webp")}
          className="header-logo-image"
          alt="HOME"
        ></img>
      </HashLink>
      <div className="header-horizontal-container">
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
      </div>
    </div>**/
  );
};
export default Header;
