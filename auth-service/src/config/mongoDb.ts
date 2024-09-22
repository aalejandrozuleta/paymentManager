import mongoose from 'mongoose';
import { checkRedis } from './redis';

const mongoURI = process.env.MONGO_URI || '';

mongoose.connect(mongoURI);

export const checkDatabaseConnection = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.info('Conexión a la base de datos MongoDB exitosa.');
    await checkRedis();
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  }
};
