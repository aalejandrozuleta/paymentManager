import { ChangePasswordDto } from '@dto/changePassword';
import { hashPassword } from '@helpers/password/hashPassword';
import { ChangePasswordRepository } from '@repositories/changePassword';

export const changePasswordService = async (user: ChangePasswordDto) => {
  // Validar que las contraseñas sean iguales
  if (user.password !== user.confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  // Hashear la contraseña y guardarla en la base de datos
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  // Actualizar la contraseña en la base de datos
  await ChangePasswordRepository.changePassword(user);
};
