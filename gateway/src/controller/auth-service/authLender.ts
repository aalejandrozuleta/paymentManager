// controllers/authController.ts
import { Request, Response } from 'express';
import { proxyRequest } from '@services/proxyAuth';

export const authLender = async (req: Request, res: Response) => {
  const authServiceUrl = process.env.AUTH_SERVICE_URL || '';
  try {
    const response = await proxyRequest(req, authServiceUrl);
    res.status(response.status).json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Manejar errores, proporcionando un mensaje claro
    res.status(error.status || 500).json(error.data || 'Internal Server Error');
  }
};
