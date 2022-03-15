import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
import { Position } from './Position';
@Entity('position_detail')
export class PositionDetail {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Personnel, (personnel) => personnel.ctcv, { primary: true,nullable:true })
  ns: Personnel;

  @ManyToOne(() => Position, (pos) => pos.ctcv, { primary: true,nullable:true })
  cv: Position;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ngaybonhiem: string;
  @Column({type:"text"})
  ghichu: string;

  @DeleteDateColumn()
  deletedAt?: Date;
  @Column('int', { default: 1 }) 
  trangthai?: number;
}
