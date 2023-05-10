const nodemailer = require("nodemailer");

const user = "dorrabalti00@gmail.com"; // hedhi t7ot feha l email 
const pass = "vybzwlexcysniudn"; // houni lazmek ta3mel generation lel code hedha gmail apps 

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
//fonction te5ou 3 parametres
module.exports.sendConfirmationEmail = (
  name,
  email,
  confirmationCode
  
) => {

  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Veuillez activer votre compte",
      html: `
      <head>
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }
      header {
        background-color: #29F0B5;
        color: #fff;
        height: 2cm;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h1 {
        font-size: 24px;
        margin: 0;
      }
      a {
        color: #29F0B5;
        text-decoration: none;
      }
      .container {
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Email Verification</h1>
    </header>
    <div class="container">
      <p>Hello ${name},</p>
      <p>Thank you for registering with our service. To complete your registration, please click the link below to verify your email address:</p>
      <p><a href="http://localhost:3000/confirm/${confirmationCode}">Click here to verify your email address</a></p>
      <p>If you did not register for our service, please ignore this message.</p>
    </div>
  </body>`,
    })
    .catch((err) => console.log(err));
};


