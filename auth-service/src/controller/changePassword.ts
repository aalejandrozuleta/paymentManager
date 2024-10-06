import { ChangePasswordDto } from '@dto/changePassword';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '@config/logger';
import { ChangePasswordInterface } from '@interfaces/changePassword';
import { changePasswordService } from '@services/changePassword';

export const changePasswordController = async (req: Request, res: Response) => {
  // Validar los datos de entrada utilizando express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validación fallida', { errors: errors.array() }); // Log de advertencia

    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  // Obtener los datos del prestamista del cuerpo de la solicitud
  const userData: ChangePasswordInterface = req.body;

  userData.idUser = req.body.token.id;

  const user = new ChangePasswordDto(
    userData.idUser,
    userData.password,
    userData.confirmPassword,
  );

  logger.info('Datos del usuario al cambiar la contraseña:', user);

  try {
    await changePasswordService(user);
    logger.info('Contraseña cambiada correctamente', { idUser: user.idUser });
    res.status(200).json({ message: 'Contraseña cambiada correctamente' });
  } catch (error) {
    // Manejar errores, proporcionando un mensaje claro
    const errorMessage =
      error instanceof Error ? error.message : 'Ocurrió un error desconocido';

    // También podrías registrar el error en un sistema de logging aquí
    logger.error('Error al registrar usuario', { error: errorMessage }); // Log de error

    return res.status(500).json({ error: errorMessage });
  }
};
