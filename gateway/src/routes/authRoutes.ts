// routes/authRoutes.ts
import { authLender } from '@controller/auth-service/authLender';
import { registerLender } from '@controller/auth-service/registerLender';
import { Router } from 'express';

export const routerAuth = Router();

// Ruta para registrar prestamistas
routerAuth.use('/lender/register', registerLender);
routerAuth.use('/lender/auth', authLender);