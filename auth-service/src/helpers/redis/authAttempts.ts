import { client } from '@config/redis';

const MAX_ATTEMPTS = 4;
const BLOCK_TIME = 15 * 60; // Tiempo de bloqueo en segundos (15 minutos)

// Obtener el número de intentos fallidos desde Redis
export const getFailedAttempts = async (email: string): Promise<number> => {
  const attempts = await client.get(`failed_attempts:${email}`);
  return attempts ? parseInt(attempts, 10) : 0;
};

// Incrementar el contador de intentos fallidos
export const incrementFailedAttempts = async (email: string): Promise<void> => {
  const attempts = await getFailedAttempts(email);
  
  if (attempts + 1 >= MAX_ATTEMPTS) {
    // Bloquear el usuario si se superan los intentos máximos
    await blockUser(email);
  } else {
    await client.set(`failed_attempts:${email}`, attempts + 1, {
      EX: BLOCK_TIME, // Actualizar el tiempo de expiración con cada intento fallido
    });
  }
};

// Bloquear al usuario por el tiempo definido
export const blockUser = async (email: string): Promise<void> => {
  await client.set(`blocked_user:${email}`, 'true', {
    EX: BLOCK_TIME,
  });
};

// Verificar si el usuario está bloqueado
export const isBlocked = async (email: string): Promise<boolean> => {
  const blocked = await client.get(`blocked_user:${email}`);
  return blocked === 'true';
};

// Restablecer el contador de intentos fallidos y desbloquear al usuario
export const resetFailedAttempts = async (email: string): Promise<void> => {
  await client.del(`failed_attempts:${email}`);
  await client.del(`blocked_user:${email}`);
};
