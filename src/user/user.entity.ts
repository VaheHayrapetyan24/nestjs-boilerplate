import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '255' })
    username: string;

    @Column({ type: 'varchar', length: '255', unique: true })
    email: string;

    @Column({ type: 'varchar', length: '255' })
    @Exclude({ toPlainOnly: true }) // when converting to json removes the field
    password: string;

    @BeforeInsert()
    private generateAndSetPassword (): User {
        this.password = hashSync(this.password, genSaltSync(8));
        return this;
    }

    public comparePassword (password: string): boolean {
        return this.password && compareSync(password, this.password);
    }
}
