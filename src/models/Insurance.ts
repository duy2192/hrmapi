import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';

@Entity()
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.baohiem)
  ns: Personnel;

  @Column({nullable:true})
  loaibh: string;

  @Column({nullable:true})
  sothe: string;

  @Column({type:"text",default:""})
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
