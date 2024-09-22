import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { routerAuth } from '@routes/authRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Configuración de middleware
app.use(cors());
app.use(morgan('combined'));

// Limitar la tasa de solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Limitar a 20 solicitudes por IP
});
app.use(limiter);

// Middleware de rutas
app.use('/api/auth', routerAuth);


// Puerto de escucha
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Gateway escuchando en el puerto ${PORT}`);
});
