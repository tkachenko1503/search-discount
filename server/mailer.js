import express from 'express';
import Mailgun from 'mailgun-js';

import {MAILER} from './config.json';
import {generate} from './pdf';

let api_key;
let domain;
let from_who;
let adminEmail;

// if (process.env.NODE_ENV === 'production') {
//     api_key = MAILER.PROD.API_KEY;
//     domain = MAILER.PROD.DOMAIN;
//     from_who = MAILER.PROD.FROM;
//     adminEmail = MAILER.PROD.ADMIN;
// } else {
//     api_key = MAILER.DEV.API_KEY;
//     domain = MAILER.DEV.DOMAIN;
//     from_who = MAILER.DEV.FROM;
//     adminEmail = MAILER.DEV.ADMIN;
// }

api_key = MAILER.DEV.API_KEY;
domain = MAILER.DEV.DOMAIN;
from_who = MAILER.DEV.FROM;
adminEmail = MAILER.DEV.ADMIN;

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
    let html = '';

    req.on('data', function(chunk) {
        html += chunk;
    });

    req.on('end', function() {
        if (!html.length) {
            res
                .status(400)
                .json({error: 'No html provided'})
        }

        // @TODO insert html in template

        generate(html)
            .then(pdfPath => {
                data.attachment = pdfPath;

                console.log(data.attachment);

                mailgun
                    .messages()
                    .send(data, function (error) {
                        if (error) {
                            res
                                .status(500)
                                .json({error: error.message});
                        } else {
                            // @TODO delete pdf
                            res.json({email: 'OK'});
                        }
                    });
            })
            .catch(error => {
                res
                    .status(500)
                    .json({error: error.message});
            });

    });
});

export default mailer;
