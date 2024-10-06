import { Router } from 'express';
import { jwtAuthMiddleware } from 'middlewares/jwtValidation';
import { authController } from '@controller/auth-service/authController';

export const routerAuth = Router();

// Ruta para registrar prestamistas
routerAuth.use('/lender/register', authController);
routerAuth.use('/lender/auth', authController);
routerAuth.use('/lender/changePassword', jwtAuthMiddleware, authController);
