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
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getCategories")
        .then((response) => {
          if (response.data.success) {
            setCategories(response.data.data);
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
      collapseOnSelect
      expanded={expanded}
      expand="xl"
      sticky="top"
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
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <NavHashLink smooth to={"/#top"} className="header-item-container" onClick={() => setExpanded(false)}>
            POČETNA
          </NavHashLink>
          {isBusy && !fetchError && (
            <div className="header-item-container" disabled>
              PROIZVODI
            </div>
          )}
          {fetchError && (
            <NavHashLink
              smooth
              to={"/products/#top"}
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
              <NavDropdown.Item
                className="header-item-container-collapsable"
                href="/#/products/#top"
                onClick={() => setExpanded(false)}
              >
                SVI PROIZVODI
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className="header-item-container-collapsable"
                disabled
              >
                PO KATEGORIJAMA:
              </NavDropdown.Item>
              {categories.map((category) => {
                const url = "/#/products/categories/" + category.categoryName + "/#top";
                return (
                  <NavDropdown.Item
                    href={url}
                    className="header-item-container-collapsable"
                    onClick={() => setExpanded(false)}
                  >
                    {category.categoryName}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          )}
          <NavHashLink
            smooth
            to={"/service/#top"}
            className="header-item-container"
            onClick={() => setExpanded(false)}
          >
            SERVIS
          </NavHashLink>
          <NavHashLink
            smooth
            to={"/info/#top"}
            className="header-contact-button-container"
            onClick={() => setExpanded(false)}
          >
            KONTAKT
          </NavHashLink>          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
