import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { LevelDetail } from './LevelDetail';
@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => LevelDetail, (userGroup) => userGroup.lv)
  ctlv: LevelDetail[];

  @Column({
    unique: true,
  })
  ten: string;

  @Column()
  mota: string;

  @Column('int', { default: 1 })
  trangthai: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
