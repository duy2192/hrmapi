import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
import { Position } from './Position';
@Entity()
export class PositionDetail {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Personnel, (personnel) => personnel.ctcv, { primary: true })
  ns: Personnel;

  @ManyToOne(() => Position, (pos) => pos.ctcv, { primary: true })
  cv: Position;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  ngaybonhiem: string;
  @Column({type:"text",default:''})
  ghichu: string;

  @DeleteDateColumn()
  deletedAt?: Date;
  @Column('int', { default: 1 }) 
  trangthai?: number;
}
