const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'wytech-com.mail.protection.outlook.com',
    port: 25,
    secure: false
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"admin" <admin@wytech.com>', // sender address
    to: 'john.gruber@tierpoint.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'tester', // plain text body
    html: '<b>testy</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
