import { RegisterDto } from '@dto/register';
import { hashPassword } from '@helpers/password/hashPassword';
import { RegisterRepository } from '@repositories/register';

export const registerService = async (user: RegisterDto) => {
  const result = await RegisterRepository.findUser(user);
  if (result !== null) {
    throw new Error('El usuario ya existe');
  }

  const passwordHash = await hashPassword(user.password);
  user.password = passwordHash;

  return await RegisterRepository.save(user);
};
