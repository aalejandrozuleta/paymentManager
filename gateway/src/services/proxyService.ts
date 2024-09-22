// services/proxyService.ts
import axios from 'axios';
import { Request } from 'express';

export const proxyRequest = async (req: Request, serviceUrl: string) => {
  try {
    // Clonar los headers y eliminar los que no son necesarios
    const headers = { ...req.headers };
    delete headers.host;
    delete headers['content-length'];

    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${req.originalUrl.replace('/api/auth', '')}`, // Ajuste dinámico de la URL
      headers,
      data: req.body,
    });

    return response;
  } catch (error: any) {
    console.error('Error proxying request:', error.message);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      throw {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      throw {
        status: 500,
        data: 'An error occurred while proxying the request.',
      };
    }
  }
};
