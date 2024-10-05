import { RegisterDto } from '@dto/register';
import { hashPassword } from '@helpers/password/hashPassword';
import { RegisterRepository } from '@repositories/register';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const registerService = async (user: RegisterDto) => {
  const result = await RegisterRepository.findUser(user);
  if (result !== null) {
    throw new Error('El usuario ya existe');
  }

  const passwordHash = await hashPassword(user.password);
  user.password = passwordHash;

  await axios
    .post(`${process.env.GATEWAY_URL}/api/shared/emails`, {
      to: user.email,
      subject: 'Confirmación de registro',
      templateFile: 'welcome.html',
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Error enviando correo');
    });

  return await RegisterRepository.save(user);
};
