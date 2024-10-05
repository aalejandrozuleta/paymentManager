import bcrypt from 'bcrypt';

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
