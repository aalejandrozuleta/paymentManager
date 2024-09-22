import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

export const authValidation: ValidationChain[] = [
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
