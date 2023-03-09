import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section-one">
        <div
          className="footer-horizontal-container-social"
          style={{ gap: "3rem" }}
        >
          <a
            href="https://www.instagram.com/dem.rs/"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
            title="Instagram"
          >
            <img
              src={require("../images/Instagram.webp")}
              alt="INSTAGRAM"
              className="footer-logo-image"
            ></img>
          </a>
          <a
            href="https://www.linkedin.com/company/demnovisad/"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
            title="LinkedIn"
          >
            <img
              src={require("../images/LinkedIn.webp")}
              alt="LINKEDIN"
              className="footer-logo-image"
            ></img>
          </a>
          <a
            href="https://www.facebook.com/demnovisad"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
            title="Facebook"
          >
            <img
              src={require("../images/Facebook.webp")}
              alt="FACEBOOK"
              className="footer-logo-image"
            ></img>
          </a>
          <a
            href="mailto:office@dem.rs"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
            title="Mail"
          >
            <img
              src={require("../images/Email.webp")}
              alt="EMAIL"
              className="footer-logo-image"
            ></img>
          </a>
          <a
            href="tel:+381216300101"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
            title="Telefon"
          >
            <img
              src={require("../images/Telefon.webp")}
              alt="TELEFON"
              className="footer-logo-image"
            ></img>
          </a>
        </div>
        <div className="footer-vertical-container-info">
          <div className="footer-info-text">DEM d.o.o.</div>
          <div className="footer-info-text">21000, Novi Sad, Serbia</div>
          <div className="footer-link-wrapper">
            <a
              href="tel:+381216300101"
              target="_blank"
              rel="noreferrer"
              title="Telefon"
              className="footer-link"
            >
              Tel: +381 (21) 6300 101
            </a>
          </div>
          <div className="footer-link-wrapper">
            <a
              href="mailto:office@dem.rs"
              target="_blank"
              rel="noreferrer"
              title="Mail"
              className="footer-link"
            >
              Email: office@dem.rs
            </a>
          </div>
        </div>
        <div
          className="footer-vertical-container-certificates"
          style={{
            alignItems: "flex-start",
            padding: "2rem 0 2rem 0",
            gap: "4rem",
          }}
        >
          <div className="horizontal-individual-certificate-container">
            <img
              src={require("../images/SGS-ISO-9001.webp")}
              className="footer-logo-image-certificate"
              alt="Politika kvaliteta"
              title="Sertifikat politike kvaliteta"
            ></img>
            <div>Politika kvaliteta</div>
          </div>
          <div className="horizontal-individual-certificate-container">
            <img
              src={require("../images/SGS-ISO-14001_1.webp")}
              className="footer-logo-image-certificate"
              alt="Politika zaštite životne sredine"
              title="Sertifikat politike zaštite životne sredine"
            ></img>
            <div>Politika zaštite životne sredine</div>
          </div>
          <div className="horizontal-individual-certificate-container">
            <img
              src={require("../images/SGS-ISO-45001_1.webp")}
              className="footer-logo-image-certificate"
              alt="Politika zaštite na radu"
              title="Sertifikat politike zaštite na radu"
            ></img>
            <div>Politika zaštite na radu</div>
          </div>
        </div>
      </div>
      <div className="footer-section-two">
        <div>
          Copyright {new Date().getFullYear()} DEM | All Rights Reserved
        </div>
      </div>
    </div>
  );
};
export default Footer;
