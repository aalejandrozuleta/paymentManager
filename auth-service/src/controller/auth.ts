import { logger } from '@config/logger';
import { AuthDto } from '@dto/auth';
import { AuthInterface } from '@interfaces/auth';
import { authService } from '@services/auth';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const authController = async (req: Request, res: Response) => {
  // Validar los datos de entrada utilizando express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validación fallida', { errors: errors.array() }); // Log de advertencia

    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  // Obtener los datos del prestamista del cuerpo de la solicitud
  const userData: AuthInterface = req.body;
  const user = new AuthDto(userData.email, userData.password);
  try {
    const token = await authService(user);
    res
      .status(200)
      .json({ message: 'Usuario iniciado con éxito', token: token });
  } catch (error) {
    // Manejar errores, proporcionando un mensaje claro
    const errorMessage =
      error instanceof Error ? error.message : 'Ocurrió un error desconocido';

    // También podrías registrar el error en un sistema de logging aquí
    logger.error('Error al registrar usuario', { error: errorMessage }); // Log de error

    return res.status(500).json({ error: errorMessage });
  }
};
