import express from 'express';
import Mailgun from 'mailgun-js';

const api_key = 'key-28184ab1f7f829304e7e4df8e2af39e7';
const domain = 'sandbox8bab496b5d234909840e58ef9b9643c2.mailgun.org';
const from_who = 'your@email.com';
const adminEmail = 're4thzdsq@gmail.com';

const mailer = express.Router();
const mailgun = new Mailgun({
    apiKey: api_key,
    domain: domain
});
const data = {
    from: from_who,
    to: adminEmail,
    subject: 'New Order',
    text: 'Recieve new order'
};

mailer.post('/', function (req, res, next) {
    let sbuffer = '';

    req.on('data', function(chunk) {
        sbuffer += chunk;
    });

    req.on('end', function() {
        if (!sbuffer.length) {
            next();
        }

        const fileBuffer = Buffer.from(sbuffer);

        data.attachment = new mailgun.Attachment({
            data: fileBuffer,
            filename: 'order.pdf'
        });

        mailgun
            .messages()
            .send(data, function (error) {
                if (error) {
                    res.status(500).json({error : error.message});
                } else {
                    res.json({email : 'OK'});
                }
            });
    });
});

export default mailer;
