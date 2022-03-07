import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
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
 
    @Column({default:''})
    name: string

    @Column({type:"text",default:''})
    password: string

    @Column({type:"text",default:''})
    resetpwdtoken: string

    @Column('int', { default: 1 })
    trangthai: number;

    @Column('int', { default: 1 })
    role: number;
}