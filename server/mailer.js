import Mailgun from 'mailgun-js';

import {MAILER} from './config.json';

let api_key;
let domain;
let from_who;
let adminEmail;

if (process.env.NODE_ENV === 'production') {
    api_key = MAILER.PROD.API_KEY;
    domain = MAILER.PROD.DOMAIN;
    from_who = MAILER.PROD.FROM;
    adminEmail = MAILER.PROD.ADMIN;
} else {
    api_key = MAILER.DEV.API_KEY;
    domain = MAILER.DEV.DOMAIN;
    from_who = MAILER.DEV.FROM;
    adminEmail = MAILER.DEV.ADMIN;
}

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

export const sendOrderPdf = pdfPath => {
    data.attachment = pdfPath;

    return mailgun
        .messages()
        .send(data);
};
