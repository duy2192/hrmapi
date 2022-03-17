import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
@Entity('reward')
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.id,{nullable:true})
  ns: Personnel;

  @Column({type:"timestamp",default: () => "CURRENT_TIMESTAMP"})
  ngayqd: string;

  @Column({default:''})
  hinhthuc: string;

  @Column({type:"text",nullable: true})
  noidung: string;


  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai: number;
}
