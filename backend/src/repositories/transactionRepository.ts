import DatabaseError from "../models/errors/databaseError";
import Transaction from "../models/Transaction";
import Account from "../models/Account";

class TransactionRepository {
    async create(credited: Account, debited: Account, value: string) {
        try {
            const transaction = new Transaction();
            transaction.debitedAccountId = debited;
            transaction.creditedAccountId = credited;
            transaction.value = value;
            transaction.save();
        } catch (error) {
            throw new DatabaseError('Erro ao tentar concluir a transação');
        }
    }

    async list(account: Account) {
        try {
            const debitedList = await Transaction.find({ where: { debitedAccountId: { id: account.id } }, relations: { debitedAccountId: true, creditedAccountId: true, } });
            const creditedList = await Transaction.find({ where: { creditedAccountId: { id: account.id } }, relations: { debitedAccountId: true, creditedAccountId: true, } });
            const list = [...debitedList, ...creditedList];

            return list;
        } catch (error) {
            throw new DatabaseError('Erro ao tentar ler a lista de transaçoes: ', error);
        }
    }
};

export default new TransactionRepository;