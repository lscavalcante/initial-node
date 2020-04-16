'use strict';

var config = require('../config');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
    const msg = {
        to: to,
        from: 'lucasantoscv@gmail.com',
        subject: subject,
        html: body,
    };

    sgMail.send(msg).then(() => {
        console.log('Message send')
    }).catch((error) => {
        console.log(error.response.body)
    })
}