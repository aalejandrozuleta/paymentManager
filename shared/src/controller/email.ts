import { sendCustomEmail } from '@utils/sendEmailCustom';
import { Request, Response } from 'express';

export const emailController = async (req: Request, res: Response) => {
  interface EmailInterface {
    to: string;
    subject: string;
    templateFile: string;
  }
  const data: EmailInterface = req.body;
  try {
    await sendCustomEmail(data.to, data.subject, data.templateFile);
    res.status(200).json({ message: 'Correo enviado', data });
  } catch (error) {
    // Manejar errores, proporcionando un mensaje claro
    const errorMessage =
      error instanceof Error ? error.message : 'Ocurrió un error desconocido';

    return res.status(500).json({ error: errorMessage });
  }
};
