import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import dotenv from 'dotenv';

interface Payload {
  id: string;
  email: string;
  name: string;
  blockUser: number;
  timeBlock: Date;
  iat?: number;
}

dotenv.config();

export const verifyToken = (token: string): Payload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT secret key not found in environment variables.');
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, secret) as Payload;
    return decoded;
  } catch (error) {
    // Aquí puedes manejar los errores específicos de JWT
    if (error instanceof JsonWebTokenError) {
      throw new Error('Invalid token.');
    } else if (error instanceof NotBeforeError) {
      throw new Error('Token not valid yet.');
    } else if (error instanceof TokenExpiredError) {
      throw new Error('Token expired.');
    } else {
      throw error;
    }
  }
};
