import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

export const checkRedis = async () => {
  try {
    await client.connect();
    console.info('Conexión a la base de datos Redis exitosa.');
  } catch (error) {
    console.error('Error al conectar con Redis:', error);
  }
};
