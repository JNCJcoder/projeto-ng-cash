import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ValueTransformer,
} from "typeorm";

import Currency from "currency.js";

const currencyTransformer: ValueTransformer = {
    from: (value: string) => Currency(value).toString(),
    to: (value: string) => Currency(value).toString(),
};

@Entity("Account")
export default class Account extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id!: string;

    @Column({
        transformer: currencyTransformer
    })
    public balance?: string;
}

