import nodemailer from "nodemailer";
import { emailConfig } from "../configs/index.js";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PWD, EMAIL_FROM } =
  emailConfig;

class Email {
  constructor(customer) {
    this.customer = customer;
  }

  async sendEmail(subject, text) {
    try {
      const emailOption = {
        from: EMAIL_FROM,
        to: this.customer.email,
        subject,
        text,
        // html: "",
      };
      const transporter = await this.newTransporter();
      transporter.sendMail(emailOption);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  newTransporter() {
    return nodemailer.createTransport({
      // service: "",
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      // secure: true, only work on the production when we have security service, if we use it in development it will never send email because now application is not secure
      //=> it will never send
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PWD,
      },
    });
  }
}

export default Email;
