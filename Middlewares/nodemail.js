import nodemailer from 'nodemailer';
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            pool: true,
            host: "smtp.gmail.com",
            port: 456,
            secure: true,
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