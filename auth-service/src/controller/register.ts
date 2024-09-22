import { LenderInterface } from '@interfaces/register';
import { RegisterDto } from '@dto/register';
import { registerService } from '@services/register';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '@config/logger';

// Controlador para manejar el registro de un prestamista
export const registerController = async (req: Request, res: Response) => {
  try {
    // Validar los datos de entrada utilizando express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validación fallida', { errors: errors.array() }); // Log de advertencia

      return res
        .status(400)
        .json({ errors: errors.array().map((err) => err.msg) });
    }

    // Obtener los datos del prestamista del cuerpo de la solicitud
    const userData: LenderInterface = req.body;

    // Crear una nueva instancia de RegisterDto con los datos del prestamista
    const user = new RegisterDto(
      userData.name,
      userData.lastName,
      userData.identification,
      userData.birthDate,
      userData.phone,
      userData.email,
      userData.password,
    );

    logger.info('Datos del userDto:', user);

    // Llamar al servicio de registro para almacenar el prestamista
    await registerService(user);
    // Log de éxito al crear el usuario
    logger.info('Usuario creado exitosamente', { email: user.email });

    // Responder con un mensaje de éxito
    return res.status(201).json({
      message: 'Usuario creado correctamente',
    });
  } catch (error) {
    // Manejar errores, proporcionando un mensaje claro
    const errorMessage =
      error instanceof Error ? error.message : 'Ocurrió un error desconocido';

    // También podrías registrar el error en un sistema de logging aquí
    logger.error('Error al registrar usuario', { error: errorMessage }); // Log de error

    return res.status(500).json({ error: errorMessage });
  }
};
