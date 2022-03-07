import bcrypt  from 'bcrypt';

const { HASH_SECRET } = process.env;
const saltRounds = 5;

export const hashPasswordAsync = async (password) => await bcrypt.hash(password + HASH_SECRET, saltRounds);

export const comparePasswordsAsync = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword + HASH_SECRET, hashedPassword);
}

