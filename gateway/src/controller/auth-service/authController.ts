import { Request, Response } from 'express';
import { proxyRequest } from '@services/proxyAuth';

export const authController = async (req: Request, res: Response) => {
  const authServiceUrl = process.env.AUTH_SERVICE_URL || '';
  try {
    const response = await proxyRequest(req, authServiceUrl);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
