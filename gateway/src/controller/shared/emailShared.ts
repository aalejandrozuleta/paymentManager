// controllers/authController.ts
import { Request, Response } from 'express';
import { proxyRequest } from '@services/proxyShared';

export const emailsShared = async (req: Request, res: Response) => {
  const sharedUrl = process.env.SHARED_URL || '';
  try {
    const response = await proxyRequest(req, sharedUrl);
    res.status(response.status).json(response.data);
  } catch (error) {
    // Manejar errores, proporcionando un mensaje claro
    const errorMessage =
      error instanceof Error ? error.message : 'Ocurrió un error desconocido';

    return res.status(500).json({ error: errorMessage });
  }
};
