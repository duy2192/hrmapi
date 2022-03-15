import { Entity, PrimaryGeneratedColumn, Column,OneToMany,DeleteDateColumn } from "typeorm";
import {Job} from './Job'
import {Personnel} from './Personnel'
@Entity('department')
export class Department {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Job, work => work.dv,{nullable:true})
    qtlv: Job[]
    @OneToMany(() => Personnel, personnel => personnel.dv,{nullable:true})
    ns: Personnel[]

    @Column({
        unique: true,
        default:""
    })
    ten: string
    
    @Column({
        nullable:true
    })
    mota: string

    @Column({
        nullable:true
    })
    diachi: string

    @Column('int', {default: 1})
    trangthai: number

    @DeleteDateColumn()
    deletedAt?: Date;
}