import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    BeforeUpdate,
    OneToOne,
    JoinColumn
} from "typeorm";

import Account from './Account';
import { encrypt } from '../utils/crypt';

@Entity("User")
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @OneToOne(() => Account)
    @JoinColumn()
    public accountId: Account;

    @BeforeUpdate()
    private async hashPassword(): Promise<void> {
        this.password = await encrypt(this.password);
    }
}

