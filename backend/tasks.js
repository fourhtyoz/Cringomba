const nodemailer = require('nodemailer');
const Queue = require('bull')

const emailQueue = new Queue('emails', {})
const sendEmail = (data) => emailQueue.add(data)

emailQueue.process(async (job) => {
    const { to, subject, body } = job.data

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    let message = {
        from: process.env.SMTP_FROM,
        to: to,
        subject: subject,
        text: body,
    };

    await transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    });

    job.progress(100);
    return Promise.resolve();
})

module.exports = {
    sendEmail
}
