import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};