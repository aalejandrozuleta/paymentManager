import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (
  userId: string,
  email: string,
  name: string,
  blockUser: number,
  timeBlock?: Date ,
  reuseToken?: string,
) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret) {
    throw new Error(
      'La clave secreta JWT no se encuentra en las variables de entorno.',
    );
  }

  if (!expiresIn) {
    throw new Error(
      'No se encuentra el tiempo de vencimiento de JWT en las variables de entorno.',
    );
  }

  const payload = {
    id: userId,
    name: name,
    email: email,
    blockUser: blockUser,
    timeBlock: timeBlock || new Date(),
  };

  if (reuseToken) {
    return reuseToken;
  }

  return jwt.sign(payload, secret, { expiresIn });
};