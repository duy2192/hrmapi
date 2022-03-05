import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    username: string
    
    @Column({
        unique: true
    })
    email: string
 
    @Column()
    name: string

    @Column("text")
    password: string

    @Column("text")
    resetpwdtoken: string

    @Column('int', { default: 1 })
    trangthai: number;

    @Column('int', { default: 1 })
    role: number;
}