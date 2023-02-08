import userRepository from '../repositories/userRepository';
import UserError from "../models/errors/userError";

interface bodyInterface {
    username: string,
    password: string
}

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

class UserService {
    private parseBody(body: bodyInterface) {
        if (!body || !body.hasOwnProperty("username") || !body.hasOwnProperty("password")) {
            throw new UserError("Usuario e senha são obrigatorios!");
        }

        if (body.username.length < 3) {
            throw new UserError("O usuario precisa ser composto por pelo menos 3 caracteres.");
        }

        if (!passwordRegex.test(body.password)) {
            throw new UserError("A senha precisa ter pelo menos 8 caracteres, um número e uma letra maiúscula.");
        }

        return {
            username: body.username,
            password: body.password
        };
    };

    async register(body: bodyInterface) {
        return await userRepository.register(this.parseBody(body));

    };

    async login(body: bodyInterface) {
        return await userRepository.login(this.parseBody(body));
    };

    async getUserInfo(username: string) {
        const info = (await userRepository.getUserAndAccount(username));

        const data = {
            username: info.username,
            balance: info.accountId.balance
        }

        return data;
    }
};

export default new UserService;