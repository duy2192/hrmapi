import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
@Entity('contract')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.id,{nullable:true})
  ns: Personnel;

  @Column({default:''})
  loaihd: string;

  @Column({type:"timestamp",default: () => "CURRENT_TIMESTAMP"})
  ngayky: string;

  @Column({type:"timestamp",default: () => "CURRENT_TIMESTAMP"})
  ngaykt: string;

  @Column({type:"text"})
  ghichu: string;

  @Column({type:"text",nullable:true})
  file: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai: number;
}
