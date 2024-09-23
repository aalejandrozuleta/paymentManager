import { AuthDto } from '@dto/auth';
import { Lender } from '@models/register';

export class AuthRepository {
  static async findUser(user: AuthDto) {
    const result = await Lender.findOne(
      { email: user.email },
      { _id: 1, name: 1, password: 1 },
    );

    return result ? result.password : null; // Retorna la contraseña o null si no existe
  }
}
