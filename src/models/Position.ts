import { Entity, PrimaryGeneratedColumn, Column,OneToMany,DeleteDateColumn } from 'typeorm';
import { Personnel } from '.';
import { PositionDetail } from './PositionDetail';
import { Job } from './Job';
@Entity('position')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Personnel, (level) => level.dv,{nullable:true})
  ns: Personnel[];

  @OneToMany(() => Job, job => job.cv,{nullable:true})
  qtlv: Job[]

  @Column({
    unique: true,
    default:""
  })
  ten: string;

  @OneToMany(type => PositionDetail, userGroup => userGroup.cv)
  ctcv: PositionDetail[];

  @Column({type:"text"})
  mota: string;

  @Column('int', { default: 1 })
  trangthai: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
