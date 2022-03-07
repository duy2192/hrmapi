import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
@Entity()
export class Discipline {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.id)
  ns: Personnel;

  @Column({type:"date",default: () => "CURRENT_TIMESTAMP"})
  ngayqd: string;

  @Column({nullable:true})
  hinhthuc: string;

  @Column({type:"text",default:""})
  noidung: string;


  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai: number;
}
