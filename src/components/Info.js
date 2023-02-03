import React from "react";
import { motion } from "framer-motion";

const Info = () => {
  return (
    <motion.div
      key="info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{display:"flex", flexFlow:"column wrap"}}
    >
      <div id="top" className="top-anchor" />
      <div className="info-container">
        <div>KONTAKTIRAJTE NAS</div>
      </div>
      <div className="info-horizontal-container">
        <div className="info-vertical-form-container">
          <div>Pošaljite nam poruku</div>
          <br></br>
          <form>
            <div className="form-field">
              <label htmlFor="imePrezime">Ime i prezime (obavezno polje):</label>
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
              <textarea id="tekst" style={{resize: "none"}}></textarea>
            </div>
          </form>
        </div>
        <div className="info-vertical-text-container">
          <div>text1</div>
          <div>text2</div>
          <div>text3</div>
          <div>text4</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Info;
