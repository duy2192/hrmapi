import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
@Entity('discipline')
export class Discipline {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.id,{nullable:true})
  ns: Personnel;

  @Column({type:"timestamp",default: () => "CURRENT_TIMESTAMP"})
  ngayqd: string;

  @Column({nullable:true})
  hinhthuc: string;

  @Column({type:"text"})
  noidung: string;


  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai: number;
}
