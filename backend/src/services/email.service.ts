import { google } from "googleapis";
import { verificationEmailTemplate } from '../utils/verificationEmailTemplate.js';

const OAuth2 = google.auth.OAuth2;

export class EmailService {
  private gmail;

  constructor() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || null,
    });

    this.gmail = google.gmail({
      version: 'v1',
      auth: oauth2Client,
    });
  }

  async sendVerificationEmail(email: string, userId: number, code: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?userId=${userId}&code=${code}`;
    const message = [
      `From: "VICI.AR" <${process.env.GMAIL_USER}>`,
      `To: ${email}`,
      "Subject: Email Verification - VICI.AR",
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=utf-8",
      "",
      verificationEmailTemplate(code, verificationUrl),
    ].join("\n");

    const encodedMessage = Buffer
      .from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await this.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("✅ Email enviado con Gmail API");
  }
}

export default new EmailService;
