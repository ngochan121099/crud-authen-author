import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      return bcrypt.hash(password, salt);
    } catch (e) {
      throw e;
    }
  }

export const comparePassword = async (password: string, passwordHash: string) => {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch (e) {
      throw e;
    }
}
