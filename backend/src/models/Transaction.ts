import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    Column,
    ManyToOne,
    ValueTransformer
} from "typeorm";
import Currency from "currency.js";

import Account from './Account';

const currencyTransformer: ValueTransformer = {
    from: (value: string) => Currency(value).toString(),
    to: (value: string) => Currency(value).toString(),
};

@Entity("Transaction")
export default class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id!: string;

    @ManyToOne(() => Account, { eager: true })
    public debitedAccountId!: Account;

    @ManyToOne(() => Account, { eager: true })
    public creditedAccountId!: Account;

    @Column({ transformer: currencyTransformer })
    public value!: string;

    @CreateDateColumn()
    public readonly createdAt!: Date;
}

