import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';

@Entity()
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.baohiem)
  ns: Personnel;

  @Column()
  loaibh: string;

  @Column()
  sothe: string;

  @Column({type:"text"})
  noidk: string;

  @Column({type:"date",default: () => "CURRENT_TIMESTAMP"})
  tungay: string;

  @Column({type:"date",default: () => "CURRENT_TIMESTAMP"})
  denngay: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai: number;
}
