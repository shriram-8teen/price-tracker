const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendPriceDropEmail = async (email, productName, currentPrice, productUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Price Drop Alert!",
    text: `The price of ${productName} has dropped to ${currentPrice}!\nCheck it here: ${productUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPriceDropEmail };