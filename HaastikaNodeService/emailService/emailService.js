var nodemailer = require('nodemailer');


// create reusable transporter object using SMTP transport
// var smtpTransport = nodemailer.createTransport({ 
//     host: 'a2plcpnl0337.prod.iad2.secureserver.net', 
//     port: 465, 
//     auth: { user: 'devi.rath@kalinnovs.com', pass: 'Prasad#123' },
//     secure: true
// });

var smtpTransport = nodemailer.createTransport('smtps://dipankar.acharjaya%40gmail.com:pass@smtp.gmail.com');

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'dipankar.acharjaya@gmail.com', // sender address
    to: 'dipankar.acharjaya@gmail.com', // list of receivers
    subject: 'Hello Mail from Node', // Subject line
    text: 'Hello from dipankar', // plaintext body
    html: '<h1>Hello from dipankar ✔</h1> Kana Karucha !!! ' // html body
};

var emailProvider = {
    
    sendMail : function () { 
        console.log("Sending email." + smtpTransport);
        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + info.response);
            }

            smtpTransport.close();

        });
    }
}

module.exports.emailProvider = emailProvider;


