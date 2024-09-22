import { client } from '@config/redis';

export const saveTokenToRedis = async (email: string, token: string) => {
  try {
    const result = await client.set(`token:${email}`, token, {
      EX: parseInt(process.env.REDIS_EXPIRATION_SECONDS || '3600'),
    });
    if (!result) {
      throw new Error('Error guardando token en Redis');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-lanzar el error para el controlador
  }
};