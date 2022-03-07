import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
import { Department } from './Department';
import { Position } from './Position';
@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, (personnel) => personnel.qtlv)
  ns: Personnel;

  @ManyToOne(() => Department, (dep) => dep.qtlv)
  dv: string;

  @ManyToOne(() => Position, (pos) => pos.qtlv)
  cv: string; 

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  ngaybatdau: string;

  @Column({type:"text",nullable:true})
  ghichu: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai: number;
}
