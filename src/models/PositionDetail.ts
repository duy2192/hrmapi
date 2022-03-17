import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
import { Position } from './Position';
@Entity('position_detail')
export class PositionDetail {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Personnel, (personnel) => personnel.ctcv, { primary: true })
  ns: Personnel;

  @ManyToOne(() => Position, (pos) => pos.ctcv, { primary: true })
  cv: Position;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ngaybonhiem: string;
  @Column({type:"text",nullable: true})
  ghichu: string;

  @DeleteDateColumn()
  deletedAt?: Date;
  @Column('int', { default: 1 }) 
  trangthai?: number;
}
