import { emailController } from '@controller/email';
import { Router } from 'express';
export const routerEmail = Router();

// Ruta para registrar prestamistas
routerEmail.post('/emailSend', emailController);
