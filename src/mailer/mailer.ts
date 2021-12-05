const nodemailer = require('nodemailer');
function connect() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email_name,
      pass:  process.env.email_password
    }
  });
  return transporter
}

      
export default {connect}