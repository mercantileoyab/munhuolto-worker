import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mailhog',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 1025,
    secure: false, // MailHog does not use TLS
    // auth: {
    //     user: process.env.SMTP_USER || '',
    //     pass: process.env.SMTP_PASS || ''
    // }
});

export default transporter;