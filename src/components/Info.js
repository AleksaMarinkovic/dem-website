import React, { useState } from "react";
import { motion } from "framer-motion";
import Axios from "axios";

const defaultContactValue = {
  imePrezime: "",
  email: "",
  naslov: "",
  tekst: "",
};

const Info = () => {
  const [contactInfo, setContactInfo] = useState(defaultContactValue);
  const [errorMessageContact, setErrorMessageContact] = useState(null);
  const [successMessageContact, setSuccessMessageContact] = useState(null);

  const onSendMailClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("imePrezime", contactInfo.imePrezime);
    data.append("email", contactInfo.email);
    data.append("naslov", contactInfo.naslov);
    data.append("tekst", contactInfo.tekst);
    Axios.post("/sendEmail", data)
      .then((response) => {
        if (response.data.success) {
          setSuccessMessageContact(response.data.message);
          setContactInfo(defaultContactValue);
        } else {
          setErrorMessageContact(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setErrorMessageContact(error.response.data.message);
          return;
        } else if (error.request) {
          // request made no response from server
          setErrorMessageContact("Error 003");
          return;
        } else {
          // request setup failed
          setErrorMessageContact("Error 004");
          return;
        }
      });
  };

  const onContactFormInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  return (
    <motion.div
      key="info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: "flex", flexFlow: "column wrap", alignItems: "center" }}
    >
      <div className="contactpage-vertical-container">
        <div className="contactpage-text-header">KONTAKTIRAJTE NAS</div>
        <div className="contactpage-image-stripe">
          <img
            src={require("../images/dem-stripe.webp")}
            alt="KONTAKTIRAJTE NAS"
            className="contactpage-image"
          ></img>
        </div>
        <div className="contact-page-horizontal-container">
          <form
            onSubmit={onSendMailClick}
            className="contactpage-vertical-form-container"
          >
            <div className="form-header">Pošaljite nam poruku</div>
            <div className="form-field">
              <label htmlFor="imePrezime">
                Ime i prezime (obavezno polje):
              </label>
              <input
                type="text"
                required="required"
                id="imePrezime"
                name="imePrezime"
                value={contactInfo.imePrezime}
                onChange={onContactFormInputChange}
              ></input>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email adresa (obavezno polje):</label>
              <input
                type="email"
                required="required"
                id="email"
                name="email"
                value={contactInfo.email}
                onChange={onContactFormInputChange}
              ></input>
            </div>
            <div className="form-field">
              <label htmlFor="naslov">Naslov (obavezno polje):</label>
              <input
                type="text"
                required="required"
                id="naslov"
                name="naslov"
                value={contactInfo.naslov}
                onChange={onContactFormInputChange}
              ></input>
            </div>
            <div className="form-field">
              <label htmlFor="tekst">Tekst:</label>
              <textarea
                id="tekst"
                style={{ resize: "none" }}
                name="tekst"
                value={contactInfo.tekst}
                onChange={onContactFormInputChange}
              ></textarea>
            </div>
            <button className="form-button" type="submit">
              POŠALJI
            </button>
            {successMessageContact && (
              <div className="success-message-email">
                {successMessageContact}
              </div>
            )}
            {errorMessageContact && (
              <div className="error-message-email">{errorMessageContact}</div>
            )}
          </form>
          <div className="contactpage-vertical-text-container">
            <div className="contactpage-vertical-text-div">
              <div className="contactpage-text-header">Informacije</div>
              <div className="contact-text" style={{marginBottom:"2rem"}}>Rakovačka 32, Novi Sad, Srbija</div>
              <div className="contact-text" style={{ marginBottom: "2rem" }}>
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
              <div className="contact-text">
                EMAIL:{" "}
                <a
                  href="mailto:office@dem.rs"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-text-hyperlink"
                  title="office@dem.rs"
                >
                  office@dem.rs
                </a>
              </div>
              <div className="contact-text">
                PRODAJA:{" "}
                <a
                  href="mailto:prodaja@dem.rs"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-text-hyperlink"
                  title="prodaja@dem.rs"
                >
                  prodaja@dem.rs
                </a>
              </div>
              <div className="contact-text">
                TEHNIČKA PODRŠKA:{" "}
                <a
                  href="mailto:servis@dem.rs"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-text-hyperlink"
                  title="servis@dem.rs"
                >
                  servis@dem.rs
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="contactpage-map-container">
          <div className="contactpage-map-header">Gde se nalazimo?</div>
          <iframe
            title="Dem d.o.o."
            src="https://www.google.com/maps/d/embed?mid=1vtXF5hYFPRU41HRi76OjtWe97vk15FM&ehbc=2E312F"
            width="640"
            height="480"
            className="contactpage-map"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default Info;
