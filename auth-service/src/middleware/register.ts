import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

export const registerValidation: ValidationChain[] = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres')
    .notEmpty()
    .withMessage('El nombre no puede estar vacío'),

  body('lastName')
    .isLength({ min: 3 })
    .withMessage('El apellido debe tener al menos 3 caracteres')
    .notEmpty()
    .withMessage('El apellido no puede estar vacío'),

  body('identification')
    .isLength({ min: 3 })
    .withMessage('La identificación debe tener al menos 3 caracteres')
    .matches(/^[0-9]{3,}$/) // Validación para que sea numérica
    .withMessage('La identificación debe ser numérica y tener al menos 3 caracteres')
    .notEmpty()
    .withMessage('La identificación no puede estar vacía'),

  body('birthDate')
    .isISO8601()
    .withMessage('La fecha de nacimiento no es válida')
    .notEmpty()
    .withMessage('La fecha de nacimiento no puede estar vacía'),

  body('phone')
    .matches(/^3\d{9}$/)
    .withMessage('El teléfono debe tener 10 dígitos y comenzar con 3')
    .notEmpty()
    .withMessage('El número de teléfono no puede estar vacío'),

  body('email')
    .isEmail()
    .withMessage('El email no es válido')
    .notEmpty()
    .withMessage('El email no puede estar vacío'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .notEmpty()
    .withMessage('La contraseña no puede estar vacía')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/)
    .withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'),
];

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
