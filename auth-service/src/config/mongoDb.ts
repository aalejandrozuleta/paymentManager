import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || '';

mongoose.connect(mongoURI);

export const checkDatabaseConnection = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.info('Conexión a la base de datos MongoDB exitosa.');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  }
};
