import User from "../models/User";
import DatabaseError from "../models/errors/databaseError";
import Account from "../models/Account";

interface bodyInterface {
    username: string,
    password: string
}

class UserRepository {
    async getUserAndAccount(username: string) {
        const user = await User.find({ where: { username: username }, relations: { accountId: true } });

        return user[0];
    }

    async getUserByUsername(username: string) {
        const user = await User.find({
            where: { username }
        });
        return user[0];
    }

    async getUserByAccountID(account: Account) {
        const user = await User.find({ where: { accountId: { id: account.id } } });

        return user[0];
    }
    async register(body: bodyInterface) {
        const userFound = await User.findOneBy({ username: body.username });
        if (userFound) {
            throw new DatabaseError('nome de usuario já existente.');
        }
        try {
            const account = new Account();
            account.balance = "100.00";
            const user = new User();
            user.username = body.username;
            user.password = body.password;
            user.accountId = await account.save();
            return await user.save();
        } catch (error) {
            throw new DatabaseError('Erro na criação do usuario');
        }
    };

    async login(body: bodyInterface) {
        try {
            const user = await User.findOneBy({ username: body.username });
            if (!user?.comparePassword(body.password)) {
                throw new DatabaseError('Senha incorreta.');
            }
            return user?.generateToken();
        } catch (error) {
            throw new DatabaseError('Usuario ou senha incorretos.');
        }
    };
};

export default new UserRepository;