import Currency from 'currency.js';

import userRepository from '../repositories/userRepository';
import transactionRepository from '../repositories/transactionRepository';

import UnauthorizedError from '../models/errors/unauthorizedError';

interface bodyInterface {
    debitedUsername: string;
    creditedUsername: string;
    value: string;
}

class TransactionService {
    async cashin(body: bodyInterface, username: string) {
        const { creditedUsername, debitedUsername, value } = body;

        if (username != debitedUsername) {
            throw new UnauthorizedError("Você só pode enviar dinheiro da sua conta.")
        }

        if (username == creditedUsername) {
            throw new UnauthorizedError("Você não pode mandar dinheiro para si mesmo.");
        }

        const creditedUser = (await userRepository.getUserAndAccount(creditedUsername))[0];
        const debitedUser = (await userRepository.getUserAndAccount(debitedUsername))[0];

        if (Currency(debitedUser.accountId.balance!).intValue < Currency(value).intValue) {
            throw new UnauthorizedError("Você não pode mandar mais dinheiro do que possui.");
        }

        debitedUser.accountId.balance = Currency(debitedUser.accountId.balance!).subtract(Currency(value)).toString();
        creditedUser.accountId.balance = Currency(creditedUser.accountId.balance!).add(Currency(value)).toString();

        await creditedUser.save();
        await debitedUser.save();

        await transactionRepository.create(creditedUser.accountId, debitedUser.accountId, value);
    };

    async list(username: string) {
        const userAccount = (await userRepository.getUserAndAccount(username))[0].accountId;

        const transactionList = await transactionRepository.list(userAccount);

        return transactionList;
    }
};

export default new TransactionService;