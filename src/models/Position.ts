import { Entity, PrimaryGeneratedColumn, Column,OneToMany,DeleteDateColumn } from 'typeorm';
import { Personnel } from '.';
import { PositionDetail } from './PositionDetail';
@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Personnel, (level) => level.dv)
  ns: Personnel[];
  @Column({
    unique: true,
  })
  ten: string;

  @OneToMany(type => PositionDetail, userGroup => userGroup.cv)
  ctcv: PositionDetail[];

  @Column()
  mota: string;

  @Column('int', { default: 1 })
  trangthai: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
