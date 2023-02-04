import React from "react";
import { motion } from "framer-motion";

const Info = () => {
  return (
    <motion.div
      key="info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: "flex", flexFlow: "column wrap" }}
    >
      <div id="top" className="top-anchor" />
      <div className="info-container">
        <div className="info-header">KONTAKTIRAJTE NAS</div>
      </div>
      <div className="info-image-stripe">
        <img
          src={require("../images/dem-stripe.webp")}
          alt="KONTAKTIRAJTE NAS"
        ></img>
      </div>
      <div className="info-horizontal-container">
        <div className="info-vertical-form-container">
          <div className="form-header">Pošaljite nam poruku</div>
          <form>
            <div className="form-field">
              <label htmlFor="imePrezime">
                Ime i prezime (obavezno polje):
              </label>
              <input type="text" required="required" id="imePrezime"></input>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email adresa (obavezno polje):</label>
              <input type="email" required="required" id="email"></input>
            </div>
            <div className="form-field">
              <label htmlFor="naslov">Naslov:</label>
              <input type="text" id="naslov"></input>
            </div>
            <div className="form-field">
              <label htmlFor="tekst">Tekst:</label>
              <textarea id="tekst" style={{ resize: "none" }}></textarea>
            </div>
            <div>
              <button className="form-button" type="submit">
                POŠALJI
              </button>
            </div>
          </form>
        </div>
        <div className="info-vertical-text-container">
          <div className="contact-header">Informacije</div>
          <div className="contact-field">Rakovačka 32, Novi Sad, Srbija</div>
          <div className="contact-field">
            <div>
              Kontakt telefoni:
              <ul>
                <li>+381 21 6300 101</li>
                <li>+381 21 6395 339</li>
                <li>+381 21 6403 790</li>
                <li>+381 21 6497 514</li>
                <li>+381 63 545 402</li>
              </ul>
            </div>
          </div>
          <div className="contact-field">EMAIL: office@dem.rs</div>
          <div className="contact-field">PRODAJA: prodaja@dem.rs</div>
          <div className="contact-field">TEHNIČKA PODRŠKA: servis@dem.rs</div>
        </div>
        <div class="break"></div>
        <div className="info-container">
          <div className="map-header">Gde se nalazimo?</div>
          <iframe
            title="Dem d.o.o."
            src="https://www.google.com/maps/d/embed?mid=1vtXF5hYFPRU41HRi76OjtWe97vk15FM&ehbc=2E312F"
            width="640"
            height="480"
            style={{
              width: "70vw",
              height: "70vh",
              marginTop: "5vh",
              border: "1px solid black",
            }}
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default Info;
