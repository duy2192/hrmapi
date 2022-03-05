import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.id)
  ns: Personnel;

  @Column()
  loaihd: string;

  @Column({type:"date",default: () => "CURRENT_TIMESTAMP"})
  ngayky: string;

  @Column({type:"date"})
  ngaykt: string;

  @Column({type:"text"})
  ghichu: string;

  @Column({type:"text"})
  file: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai: number;
}
