import { compare, genSalt, hash } from "bcryptjs"

const SALT_RANDOM: number = 8;

const hashPassword = async (password: string) => {
    const saltGen = await genSalt(SALT_RANDOM);

    return await hash(password, saltGen);
}

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
}

export const PasswordCrypto = {
    hashPassword,
    verifyPassword
}