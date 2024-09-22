import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { checkDatabaseConnection } from './mongoDb';
import { logger, morganMiddleware } from './logger';

export const app = express();

// Cargar las variables de entorno desde .env
dotenv.config(); // Cargar configuraciones de entorno

// Habilitar CORS para todas las rutas
app.use(cors({
  origin: process.env.CORS_ORIGIN, // Permitir solo el origen especificado
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true, // Permitir credenciales
}));

// Agrega morgan como middleware
app.use(morgan('combined'));

// Agrega el logger como middleware
app.use(morganMiddleware);

// Agregar el logger como middleware para manejar logs adicionales
app.use((req, res, next) => {
  res.on('finish', () => {
    logger.info(`Método: ${req.method} | URL: ${req.originalUrl} | Estado: ${res.statusCode}`);
  });
  next();
});


// Habilitar el manejo de JSON
app.use(express.json()); // Habilitar el parseo de JSON en el cuerpo de las solicitudes

// Habilitar helmet para mejorar la seguridad
app.use(helmet()); // Usar helmet para proteger la aplicación

// Deshabilitar las huellas digitales
app.disable('x-powered-by'); // No revelar información del servidor

app.use(express.urlencoded({ extended: true }));

checkDatabaseConnection()
  .then(() => {
    const PORT: string | number = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.info(`Servidor auth-service corriendo en el puerto http://localhost:${PORT}`);
    });
  })
  .catch((error: string) => {
    console.error(
      'No se pudo iniciar el servidor debido a un error en la base de datos:',
      error,
    );
  });
export default app;
