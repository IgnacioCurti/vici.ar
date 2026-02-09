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
    console.log('📧 === INICIO ENVÍO EMAIL ===');
    console.log('Destinatario:', email);
    console.log('User ID:', userId);
    console.log('Código:', code);
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASS
    });

    try {
      // Verificar conexión SMTP primero
      await transporter.verify();
      console.log('✅ Conexión SMTP verificada');

      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?userId=${userId}&code=${code}`;
      console.log('URL de verificación:', verificationUrl);

      const info = await transporter.sendMail({
        from: `"Vici.ar" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Email verification",
        html: verificationEmailTemplate(code, verificationUrl),
      });

      console.log('✅ Email enviado exitosamente');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      console.log('📧 === FIN ENVÍO EMAIL ===');

    } catch (error) {
      console.error('❌ Error enviando email:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      throw error;
    }
  }
}

export default new EmailService();