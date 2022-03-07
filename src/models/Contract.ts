import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.id)
  ns: Personnel;

  @Column({type:"text",default:''})
  loaihd: string;

  @Column({type:"date",default: () => "CURRENT_TIMESTAMP"})
  ngayky: string;

  @Column({type:"date",default: () => "CURRENT_TIMESTAMP"})
  ngaykt: string;

  @Column({type:"text",default:""})
  ghichu: string;

  @Column({type:"text",nullable:true})
  file: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai: number;
}
