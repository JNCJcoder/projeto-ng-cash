import Currency from 'currency.js';

import userRepository from '../repositories/userRepository';
import transactionRepository from '../repositories/transactionRepository';

import UnauthorizedError from '../models/errors/unauthorizedError';

interface bodyInterface {
    debitedUsername: string;
    creditedUsername: string;
    value: string;
    date: string
}

class TransactionService {
    async cashin(body: bodyInterface, username: string) {
        const { creditedUsername, debitedUsername, value } = body;

        if (username != debitedUsername) {
            throw new UnauthorizedError("Você só pode enviar dinheiro da sua conta.")
        }

        if (debitedUsername == creditedUsername) {
            throw new UnauthorizedError("Você não pode mandar dinheiro para si mesmo.");
        }

        const creditedUserFound = await userRepository.getUserByUsername(creditedUsername);
        if (creditedUsername != creditedUserFound?.username) {
            throw new UnauthorizedError("O Usuario creditado não existe.")
        }

        const creditedUser = (await userRepository.getUserAndAccount(creditedUsername));
        const debitedUser = (await userRepository.getUserAndAccount(debitedUsername));

        if (Currency(debitedUser.accountId.balance!).intValue < Currency(value).intValue) {
            throw new UnauthorizedError("Você não pode mandar mais dinheiro do que possui.");
        }

        if (Currency(debitedUser.accountId.balance!).intValue === 0) {
            throw new UnauthorizedError("Você não possui dinheiro disponivel.")
        }

        debitedUser.accountId.balance = Currency(debitedUser.accountId.balance!).subtract(Currency(value)).toString();
        creditedUser.accountId.balance = Currency(creditedUser.accountId.balance!).add(Currency(value)).toString();

        await creditedUser.save();
        await debitedUser.save();

        await transactionRepository.create(creditedUser.accountId, debitedUser.accountId, value);
    };

    async list(username: string) {
        const userAccount = (await userRepository.getUserAndAccount(username)).accountId;

        const transactionList = await transactionRepository.list(userAccount);

        const newList: Array<bodyInterface> = [];

        for (let transaction of transactionList) {
            const debitedData = await userRepository.getUserByAccountID(transaction.debitedAccountId);
            const creditedData = await userRepository.getUserByAccountID(transaction.creditedAccountId);

            newList.push({
                debitedUsername: debitedData?.username!,
                creditedUsername: creditedData?.username!,
                value: "R$ " + transaction.value,
                date: `${transaction.createdAt.toDateString()} - ${transaction.createdAt.toLocaleTimeString()}`
            });
        }

        return newList;
    }
};

export default new TransactionService;