import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    BeforeUpdate,
    OneToOne,
    JoinColumn
} from "typeorm";
import jwt from 'jsonwebtoken';

import Account from './Account';
import { encrypt } from '../utils/crypt';

const secret = process.env.JWT_SECRET;

@Entity("User")
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @Column({ unique: true })
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

    public generateToken() {
        return jwt.sign({ username: this.username }, secret, { expiresIn: '24h' });
    }
}

