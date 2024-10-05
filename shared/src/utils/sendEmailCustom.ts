import { sendEmailBlue } from '@config/blue';
import path from 'path';

export const sendCustomEmail = async (
  destinatario: string,
  subject: string,
  templateFile: string,
) => {
  try {
    const templatePath = path.join(
      __dirname,
      '..',
      'types',
      'emails',
      templateFile,
    );
    await sendEmailBlue(destinatario, subject, templatePath);
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'Ocurrió un error desconocido',
    );
    throw error; // Lanza el error para ser manejado por el controlador
  }
};
