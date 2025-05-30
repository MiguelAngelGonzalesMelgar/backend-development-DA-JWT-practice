import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = async (plain: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(plain, hashed)
}

