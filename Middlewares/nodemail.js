import nodemailer from 'nodemailer';
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import mailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path";
export async function verificationMail(req,user){
    var from = "Codemagicien team"
    var to = user.email
    var subject = "Let's verify your account"
   // var message = req.body.message

    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
    })
    const handlebarOptions = {
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve('./templates/'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./templates/'),
        extName: ".handlebars",
      }
    transporter.use('compile', hbs(handlebarOptions));
    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        template: 'verifMail',
        context: {
            host: req.get('host'),
            email: user.email,
            username: user.firstname + " " +user.lastname,
        }      
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent: " + info.response)
        }
    })
}

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