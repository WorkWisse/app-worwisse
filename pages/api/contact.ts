import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message }: ContactFormData = req.body;

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos' 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Formato de email inválido' 
      });
    }

    // Configurar transporter de email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'wworkwisse@gmail.com',
      subject: `[WorkWisse Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0ea5e9; margin: 0 0 10px 0;">Nuevo mensaje de contacto - WorkWisse</h2>
            <p style="color: #6b7280; margin: 0;">Recibido el ${new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin: 0 0 10px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Datos del contacto</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 100px;">Nombre:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">
                  <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Asunto:</td>
                <td style="padding: 8px 0; color: #1f2937;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin: 0 0 10px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Mensaje</h3>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #0ea5e9;">
              <p style="margin: 0; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; text-align: center; margin-top: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              Para responder a este mensaje, puedes contactar directamente a 
              <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
            </p>
          </div>
        </div>
      `,
      text: `
Nuevo mensaje  WorkWisse

Datos del contacto:
- Nombre: ${name}
- Email: ${email}
- Asunto: ${subject}

Mensaje:
${message}

Para responder, contacta directamente a: ${email}
      `,
    };

    // Enviar el email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      message: 'Email enviado exitosamente' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor al enviar el email' 
    });
  }
}
