import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { LevelDetail } from './LevelDetail';
@Entity('level')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => LevelDetail, (userGroup) => userGroup.lv,{nullable:true})
  ctlv: LevelDetail[];

  @Column({
    unique: true,
  })
  ten: string;

  @Column({type:'text',nullable:true})
  mota: string;

  @Column('int', { default: 1 })
  trangthai: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
