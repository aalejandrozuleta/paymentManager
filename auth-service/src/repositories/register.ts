import { RegisterDto } from '@dto/register';
import { Lender } from '@models/register';

export class RegisterRepository {
  // Método para guardar un prestamista en la base de datos
  static async save(user: RegisterDto) {
    const newUser = {
      name: user.name,
      lastName: user.lastName,
      identification: user.identification,
      birthDate: user.birthDate,
      phone: user.phone,
      email: user.email,
      password: user.password,
    };

    return Lender.create(newUser);
  }
  // Método para buscar un prestamista en la base de datos
  static async findUser(user: RegisterDto) {
    return Lender.findOne({
      $or: [{ email: user.email }, { identification: user.identification }],
    });
  }
}
