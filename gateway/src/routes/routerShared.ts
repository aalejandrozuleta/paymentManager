// routes/authRoutes.ts
import { emailsShared } from '@controller/shared/emailShared';
import { Router } from 'express';

export const routerShared = Router();

// Ruta para shared

routerShared.post('/emails', emailsShared);
