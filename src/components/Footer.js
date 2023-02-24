import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section-one">
        <div className="footer-vertical-container">
          <div>Test Footer 1.1</div>
          <div>Test Footer 1.2</div>
          <div>Test Footer 1.3</div>
        </div>
        <div className="footer-vertical-container">
          <div>Test Footer 2.1</div>
          <div>Test Footer 2.2</div>
          <div>Test Footer 2.3</div>
          <div>Test Footer 2.4</div>
        </div>
        <div className="footer-vertical-container">
          <div>Test Footer 3.1</div>
          <div>Test Footer 3.2</div>
          <div>Test Footer 3.3</div>
          <div>Test Footer 3.4</div>
        </div>
      </div>
      <div className="footer-section-two">
        <div>Copyright {new Date().getFullYear()} DEM | All Rights Reserved</div>
      </div>
    </div>
  );
};
export default Footer;
