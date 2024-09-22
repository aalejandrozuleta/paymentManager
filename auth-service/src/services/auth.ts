import { AuthDto } from '@dto/auth';
import { generateToken } from '@helpers/jwt/generateToken';
import { comparePassword } from '@helpers/password/comparePassword';
import {
  incrementFailedAttempts,
  isBlocked,
  resetFailedAttempts,
} from '@helpers/redis/authAttempts';
import { getTokenFromRedis } from '@helpers/redis/getTokenFromRedis';
import { saveTokenToRedis } from '@helpers/redis/saveToken';
import { AuthRepository } from '@repositories/auth';
import { log } from 'console';

/**
 * Servicio de autenticación para usuarios.
 *
 * @param {AuthDto} user - Objeto que contiene las credenciales del usuario para autenticarse.
 * @throws {Error} Lanza un error si el usuario está bloqueado, si no se encuentra al usuario
 *                 en la base de datos o si la contraseña es incorrecta.
 * @returns {Promise<string>} - Devuelve un token JWT si la autenticación es exitosa.
 *
 * Este servicio realiza las siguientes operaciones:
 * 1. Verifica si el usuario está bloqueado debido a demasiados intentos fallidos.
 * 2. Busca las credenciales del usuario en la base de datos.
 * 3. Incrementa los intentos fallidos si el usuario no se encuentra.
 * 4. Compara la contraseña proporcionada con la almacenada.
 * 5. Reinicia el contador de intentos fallidos si la autenticación es exitosa.
 * 6. Genera un token JWT y lo guarda en Redis.
 */

interface userData {
  id: string;
  name: string;
  email: string;
  password: string;
  blockUser: number;
}

export const authService = async (user: AuthDto) => {
  if (await isBlocked(user.email)) {
    throw new Error(
      'Demasiados intentos fallidos. Por favor, inténtelo de nuevo más tarde.',
    );
  }
  const credential = await AuthRepository.findUser(user);
  
  if (!credential) {
    await incrementFailedAttempts(user.email);
    throw new Error('Usuario no encontrado');
  }
  const userData: userData = {
    id: credential,
    name: credential,
    email: user.email,
    password: credential,
    blockUser: await isBlocked(user.email) ? 1 : 0,
  };

  const isValid = await comparePassword(user.password, userData.password);

  if (!isValid) {
    await incrementFailedAttempts(user.email);
    throw new Error('Contraseña incorrecta');
  }

  await resetFailedAttempts(user.email);

  // Obtener token existente de Redis
  const existingToken = await getTokenFromRedis(user.email);

  const token = generateToken(
    userData.id,
    userData.email,
    userData.name,
    userData.blockUser,
    new Date(),
    existingToken || undefined,
  );

  await saveTokenToRedis(user.email, token);

  return token;
};
