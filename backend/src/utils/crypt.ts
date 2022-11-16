import bcrypt from "bcrypt";

const salt = process.env.SALT;

async function encrypt(password: string) {
    return await bcrypt.hash(password, salt)
}

async function decrypt(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}

export {
    encrypt,
    decrypt
};

