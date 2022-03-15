import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        default:''
    })
    username: string
    
    @Column({
        unique: true,
        default:""
    })
    email: string
 
    @Column({
        // unique: true,
        default:""
    })
    sdt: string
 
    @Column({default:''})
    name: string

    @Column({type:"text"})
    password: string

    @Column({type:"text",nullable:true})
    resetpwdtoken: string

    @Column({type:"text",nullable:true})
    unblocktoken: string

    @Column({type:"int",default:0})
    failLogin: number

    @Column('int', { default: 1 })
    trangthai: number;

    @Column('int', { default: 1 })
    role: number;
}