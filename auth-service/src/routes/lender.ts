import express, { Router } from 'express';
export const routerLender: Router = express.Router();

/**
 * @route POST /register
 * @description Registrar un nuevo usuario
 * @access Público
 */
import { registerController } from '@controller/register';
import { registerValidation } from '@middleware/register';
routerLender.post('/register',registerValidation, registerController);