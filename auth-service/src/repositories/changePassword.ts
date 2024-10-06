import { ChangePasswordDto } from '@dto/changePassword';
import { Lender } from '@models/register';

export class ChangePasswordRepository {
  static async changePassword(user: ChangePasswordDto) {
    const updatedLender = await Lender.findOneAndUpdate(
      { id: user.idUser },
      { password: user.password }, // Cambié '_password' a 'password'
      { new: true }, // Devuelve el documento actualizado
    );

    if (!updatedLender) {
      throw new Error('No se encontró el prestamista para actualizar');
    }
  }
}
