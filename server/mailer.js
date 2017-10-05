import express from 'express';
import Mailgun from 'mailgun-js';

const api_key = 'key-cca1797ff1161d62a7762a7ecfdef211';
const domain = 'sandboxb18a1c4228724fd9a1f91b3001a71dc9.mailgun.org';
const from_who = 'beton@beneton.com';
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
