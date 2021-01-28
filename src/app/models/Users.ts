import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcryptjs from 'bcryptjs'

@Entity('users')
class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcryptjs.hashSync(this.password, 8);
    }
}

export default Users;