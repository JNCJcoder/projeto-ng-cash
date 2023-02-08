import userRepository from '../repositories/userRepository';

class AccountService {
    async balance(username: string) {
        const user = await userRepository.getUserAndAccount(username);

        return user.accountId.balance;
    };
};

export default new AccountService;