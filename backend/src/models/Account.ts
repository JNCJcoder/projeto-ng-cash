import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ValueTransformer,
} from "typeorm";

import Currency from "currency.js";

const currencyTransformer: ValueTransformer = {
    from: (value: string) => Currency(value),
    to: (value: Currency) => value.toString(),
};

@Entity("Account")
export default class Account extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @Column()
    public username: string;

    @Column({ transformer: currencyTransformer })
    public balance: Currency;
}

