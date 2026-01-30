import nodemailer from 'nodemailer';
import { verificationEmailTemplate } from '../utils/verificationEmailTemplate.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
});

export class EmailService {
  async sendVerificationEmail(email: string, userId: number, code: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?userId=${userId}&code=${code}`;

    await transporter.sendMail({
      from: `"Vici.ar " <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Email verification",
      html: verificationEmailTemplate(code, verificationUrl),
    });
  }
}

export default new EmailService();
