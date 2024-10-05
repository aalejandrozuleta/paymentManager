import * as SibApiV3Sdk from '@sendinblue/client';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

// Configuración de Sendinblue
const sendinblueClient = new SibApiV3Sdk.TransactionalEmailsApi();
sendinblueClient.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY || '',
);

export const sendEmailBlue = async (
  to: string,
  subject: string,
  templateFile: string,
) => {
  const filePath = path.resolve(__dirname, 'emails', templateFile);

  try {
    // Verifica si el archivo existe y luego lo lee
    await fs.access(filePath);
    const html = await fs.readFile(filePath, 'utf-8');

    const senderEmail = process.env.SENDER_EMAIL; // Correo del remitente
    const senderName = process.env.SENDER_NAME || 'Default Name'; // Nombre del remitente

    // Verifica que el correo y el nombre del remitente estén definidos
    if (!senderEmail) {
      throw new Error(
        'El correo del remitente no está definido en el archivo .env',
      );
    }

    // Configuración del mensaje
    const sendSmtpEmail = {
      sender: { email: senderEmail, name: senderName }, // Remitente
      to: [{ email: to }], // Destinatario
      subject: subject, // Asunto del correo
      htmlContent: html, // Contenido en HTML
    };

    // Enviar el correo
    const response = await sendinblueClient.sendTransacEmail(sendSmtpEmail);
    return response;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};
