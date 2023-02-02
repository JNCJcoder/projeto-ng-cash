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
            const list = await Transaction.find({
                where: [
                    { creditedAccountId: { id: account.id } },
                    { debitedAccountId: { id: account.id } },
                ],
                relations: { creditedAccountId: true, debitedAccountId: true },
            });

            return list;
        } catch (error) {
            throw new DatabaseError('Erro ao tentar ler a lista de transaçoes: ', error);
        }
    }
};

export default new TransactionRepository;