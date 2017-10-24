import express from 'express';
import fs from 'fs';

import {generate} from './pdf';
import {sendOrderPdf} from './mailer';

const checkout = express.Router();

/**
 * Generate order
 */
checkout.post('/order', function (req, res) {
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

        generate(html)
            .then(pdfPath => {
                res.download(pdfPath, 'order.pdf', function (error) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        fs.unlink(pdfPath);
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

/**
 * Generate order and send it to admin mail
 */
checkout.post('/issue', function (req, res) {
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

        generate(html)
            .then(pdfPath => {
                return sendOrderPdf(pdfPath)
                    .then(() => {
                        res.download(pdfPath, 'order.pdf', function (error) {
                            if (error) {
                                console.log(error.message);
                            } else {
                                fs.unlink(pdfPath);
                            }
                        });
                    });
            })
            .catch(error => {
                res
                    .status(500)
                    .json({error: error.message});
            });
    });
});

export default checkout;
