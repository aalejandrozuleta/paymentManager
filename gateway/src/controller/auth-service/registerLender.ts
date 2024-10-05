// controllers/authController.ts
import { Request, Response } from 'express';
import { proxyRequest } from '@services/proxyAuth';

export const registerLender = async (req: Request, res: Response) => {
  const authServiceUrl = process.env.AUTH_SERVICE_URL || '';
  try {
    const response = await proxyRequest(req, authServiceUrl);
    res.status(response.status).json(response.data);
  } catch (error) {
    // Manejar errores, proporcionando un mensaje claro
    const errorMessage =
      error instanceof Error ? error.message : 'Ocurrió un error desconocido';

    return res.status(500).json({ error: errorMessage });
  }
};
