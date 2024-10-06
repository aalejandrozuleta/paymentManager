import { getTokenFromRedis } from '@helpers/getTokenRedis';
import { verifyToken } from '@helpers/verifyToken';
import { Request, Response, NextFunction } from 'express';

// Mensajes de error
const ERROR_MESSAGES = {
  missingAuthHeader: 'Authorization header is missing',
  missingToken: 'Token is missing',
  invalidToken: 'Invalid token',
  tokenNotFound: 'Token not found in Redis',
  unauthorized: 'Unauthorized',
};

export const jwtAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.get('Authorization');

    // Verificar si la cabecera de autorización está presente
    if (!authorization) {
      return res.status(401).json({ status: ERROR_MESSAGES.missingAuthHeader });
    }

    const token: string = authorization.split(' ')[1];
    // Verificar si el token está presente
    if (!token) {
      return res.status(401).json({ status: ERROR_MESSAGES.missingToken });
    }

    // Verificar el token y manejar errores
    const decoded = verifyToken(token);
    if (typeof decoded === 'string') {
      return res.status(401).json({ status: ERROR_MESSAGES.invalidToken });
    }

    const email = decoded.email;

    // Obtener el token de Redis
    const tokenFromRedis = await getTokenFromRedis(email);
    req.body.token = tokenFromRedis;

    if (!tokenFromRedis) {
      return res.status(403).json({ status: ERROR_MESSAGES.tokenNotFound });
    }

    // Continúa al siguiente middleware
    next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    return res.status(403).json({ status: ERROR_MESSAGES.unauthorized });
  }
};
