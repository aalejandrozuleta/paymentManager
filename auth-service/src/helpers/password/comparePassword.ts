import bcrypt from 'bcrypt';

export const comparePassword = (password: string, hash: string) => {
  console.log(password);
  console.log(hash);
  
  return bcrypt.compare(password, hash);
};