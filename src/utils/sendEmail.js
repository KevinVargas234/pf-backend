var nodemailer = require('nodemailer');

const { MAIL_USER, MAIL_PASSWORD} = process.env;
console.log(MAIL_USER+" "+MAIL_PASSWORD)

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  });
var sendEmail=(mensaje,correo)=>{
    var mailOptions = {
        from: MAIL_USER,
        to: correo,
        subject: "registro exitoso",
        text: mensaje
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}
module.exports=sendEmail