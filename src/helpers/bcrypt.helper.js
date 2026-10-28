import bcrypt from "bcrypt";

// Hashear contraseñas
export const hashPassword = async (password) => {
  const saltRounds = await bcrypt.genSalt(10);
  return bcrypt.hash(password, saltRounds);
};

// Comparar contraseñas
export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
