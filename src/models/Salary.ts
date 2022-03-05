import { Entity, PrimaryGeneratedColumn, Column,ManyToOne } from 'typeorm';
import { Personnel } from './Personnel';
@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.luong)
  ns: Personnel;

  @Column({type:"date", default: () => "CURRENT_TIMESTAMP"})
  ngaybatdau: string;
  
  @Column({type:"float"})
  hsl: number;
 
  @Column({type:"float"})
  hspc: number;
  
  @Column({type:"float"})
  luongcb: number;

  @Column('int', { default: 1 })
  trangthai: number;
}
