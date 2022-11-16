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

import User from './User';

const currencyTransformer: ValueTransformer = {
    from: (value: string) => Currency(value),
    to: (value: Currency) => value.toString(),
};

@Entity("Transaction")
export default class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ManyToOne(() => User)
    public debitedAccountId: User;

    @ManyToOne(() => User)
    public creditedAccountId: User;

    @Column({ transformer: currencyTransformer })
    public value: number;

    @CreateDateColumn()
    public readonly createdAt: Date;
}

