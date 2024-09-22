// controllers/authController.ts
import { Request, Response } from 'express';
import { proxyRequest } from '../../services/proxyService';

export const authLender = async (req: Request, res: Response) => {
  const authServiceUrl = process.env.AUTH_SERVICE_URL || '';
  try {
    const response = await proxyRequest(req, authServiceUrl);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.status || 500).json(error.data || 'Internal Server Error');
  }
};
