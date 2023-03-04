require('dotenv').config({path: '../.env'});
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// TEMP EMAIL AND PASSWORD
const emailTemp = "contact.zipsoft@gmail.com";
const passwordTemp = "mnlrqcmeqzgtzoih";

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: emailTemp, // your email address to send email from
    pass: passwordTemp // your gmail account password
  }
}));

module.exports = transporter;