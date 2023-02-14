import nodemailer from 'nodemailer';

const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            pool: true,
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.SENDER,
                pass: process.env.PASSWORD,
            },
        });
        await transporter.sendMail({
            from: process.env.SENDER,
            to: email,
            subject: subject,
            html: text,
        });
        console.log("check that mailbox")
    } catch(error) {
        console.log(error);
    }
}


export default sendMail;