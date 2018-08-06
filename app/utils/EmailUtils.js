var nodemailer = require('nodemailer');
var config = require('config');
var emailConfig = config.get('email');

function EmailUtil() {
}

EmailUtil.prototype.sendEmail = function (email, subject, message, callback) {

    var mailOptions = {
        from: emailConfig.from,
        to: email, 
        subject: subject, 
        text:'Test mail from nodejs', 
        html: message 
    };
    var transporter = nodemailer.createTransport({
        service: emailConfig.service,
        auth: {
            user: emailConfig.username,
            pass: emailConfig.password
        }
    });
    transporter.sendEmail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error sending email:" + error);
            status = false;
            console.log('Status from transporter fail :' + status);
            callback(false);
        } else {
            console.log('Message sent: ' + info.response);
            status = true;
            console.log('Status from transporter pass :' + status);
            callback(true);
        }
    });
}

module.exports = EmailUtil;