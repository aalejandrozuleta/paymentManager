// services/proxyService.ts
import axios, { AxiosError } from 'axios';
import { Request } from 'express';

export const proxyRequest = async (req: Request, serviceUrl: string) => {
  try {
    // Clonar los headers y eliminar los que no son necesarios
    const headers = { ...req.headers };
    delete headers.host;
    delete headers['content-length'];

    const response = await axios({
      method: req.method,
      url: `${serviceUrl}/api/shared/emailSend`, // Ajuste dinámico de la URL
      headers,
      data: req.body,
    });

    return response;
  } catch (error: unknown) {
    console.error('Error proxying request:', (error as Error).message);

    // Verificar si el error es de Axios y manejar la respuesta si está presente
    if (error instanceof AxiosError && error.response) {
      console.error('Detalles del error:', error.response.data);
      throw {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      // Error general si no es de Axios o no tiene respuesta
      throw {
        status: 500,
        data: 'An error occurred while proxying the request.',
      };
    }
  }
};
