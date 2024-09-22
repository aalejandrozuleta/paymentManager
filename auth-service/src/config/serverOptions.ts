import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { checkDatabaseConnection } from './mongoDb';

// Cargar las variables de entorno desde .env
dotenv.config();

export const app = express();

// Habilitar CORS para todas las rutas
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// Habilitar el manejo de JSON
app.use(express.json());

// Habilitar helmet
app.use(helmet());

// Deshabilitar las huellas digitales
app.disable('x-powered-by');

// Agrega morgan como middleware
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));

checkDatabaseConnection()
  .then(() => {
    const PORT: string | number = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.info(`Servidor corriendo en el puerto http://localhost:${PORT}`);
    });
  })
  .catch((error: string) => {
    console.error(
      'No se pudo iniciar el servidor debido a un error en la base de datos:',
      error,
    );
  });
export default app;
