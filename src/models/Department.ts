import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import {Job} from './Job'
import {Personnel} from './Personnel'
@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Job, work => work.ns)
    qtlv: Job[]
    @OneToMany(() => Personnel, personnel => personnel.dv)
    ns: Personnel[]

    @Column({
        unique: true
    })
    ten: string
    
    @Column({
    })
    mota: string

    @Column({
    })
    diachi: string

    @Column('int', {default: 1})
    trangthai: number
}