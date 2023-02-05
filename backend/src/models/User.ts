import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    BeforeUpdate,
    BeforeInsert,
    OneToOne,
    JoinColumn
} from "typeorm";
import jwt from 'jsonwebtoken';

import Account from './Account';
import { encrypt, decrypt } from '../utils/crypt';

const secret = process.env.JWT_SECRET;

@Entity("User")
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id!: string;

    @Column({ unique: true })
    public username!: string;

    @Column()
    public password!: string;

    @OneToOne(() => Account, (account) => account.id)
    @JoinColumn()
    public accountId!: Account;

    @BeforeInsert()
    private async hashPassword(): Promise<void> {
        this.password = await encrypt(this.password);
    }

    public generateToken() {
        const payload = {
            id: this.id,
            username: this.username,
            accountId: this.accountId
        }

        const options = {
            expiresIn: '24h'
        }
        return jwt.sign(payload, secret!, options);
    }

    public async comparePassword(password: string) {
        return await decrypt(password, this.password);
    }
}

