// routes/authRoutes.ts
import { registerLender } from 'controller/registerLender';
import { Router } from 'express';

export const routerAuth = Router();

// Ruta para registrar prestamistas
routerAuth.use('/lender/register', registerLender);

