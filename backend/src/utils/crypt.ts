import bcrypt from "bcrypt";

const PEPPER = process.env.PEPPER;

async function encrypt(password: string) {
    const salt = await bcrypt.genSalt(10) + PEPPER;
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function decrypt(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}

export {
    encrypt,
    decrypt
};

