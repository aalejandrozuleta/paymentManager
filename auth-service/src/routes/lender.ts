import express, { Router } from 'express';
export const routerLender: Router = express.Router();

/**
 * @route POST /register
 * @description Registrar un nuevo usuario
 * @access Público
 */
import { registerController } from '@controller/register';
import { registerValidation } from '@middleware/register';
routerLender.post('/register', registerValidation, registerController);

/**
 * @route POST /Auth
 * @description Iniciar sesión en el sistema
 * @access Público
 */

import { authController } from '@controller/auth';
import { authValidation } from '@middleware/auth';
routerLender.post('/auth', authValidation, authController);

/**
 * @route POST /Auth
 * @description Iniciar sesión en el sistema
 * @access Público
 */

import { changePasswordController } from '@controller/changePassword';
import { changePasswordValidation } from '@middleware/changePassword';
routerLender.put(
  '/changePassword',
  changePasswordValidation,
  changePasswordController,
);
