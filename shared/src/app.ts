import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();
app.use(express.json());

// Configuración de middleware
app.use(cors());
app.use(morgan('combined'));

// Rutas
import { routerEmail } from '@routes/email';
app.use('/api/shared', routerEmail);

const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.info(`Shared escuchando en el puerto ${PORT}`);
});
