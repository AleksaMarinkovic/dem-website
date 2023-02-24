import React from "react";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Axios from "axios";

const Header = () => {
  const [small, setSmall] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getCategories")
        .then((response) => {
          if (response.data.success) {
            setCategories(response.data.data);
            console.log(response.data.data);
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
    fetchData().then(() => {
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
    });
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
      <Nav className="me-auto">
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
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
      <div className="header-horizontal-container">
        <NavHashLink smooth to={"/#top"} className="header-item-container">
          NASLOVNA
        </NavHashLink>
        {isBusy && !fetchError && (
          <div className="header-item-container">Loading</div>
        )}
        {fetchError && (
          <NavHashLink
            smooth
            to={"/products#top"}
            className="header-item-container"
          >
            PROIZVODI
          </NavHashLink>
        )}
        {!isBusy && (
          <NavDropdown
            title="PROIZVODI"
            id="collasible-nav-dropdown"
            className="header-item-container"
          >
            <NavDropdown.Item className="header-item-container-collapsable" href="/#/products#top">
              Sve kategorije
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {categories.map((category) => {
              const url = "/#/products/categories/" + category.categoryName;
              return (
                <NavDropdown.Item
                  href={url}
                  className="header-item-container-collapsable"
                >
                  {category.categoryName}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        )}
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
    <div
      className={`${
        small ? "header-container-wrapper-small" : "header-container-wrapper"
      }`}
    >
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
    </div>
    */
  );
};
export default Header;
