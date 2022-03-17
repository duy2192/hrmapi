import { Entity, PrimaryGeneratedColumn, Column,ManyToOne } from 'typeorm';
import { Personnel } from './Personnel';
@Entity('salary')
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.luong)
  ns: Personnel;

  @Column({type:"timestamp", default: () => "CURRENT_TIMESTAMP"})
  ngaybatdau: string;
  
  @Column({type:"float",default:0})
  hsl: number;
 
  @Column({type:"float",default:0})
  hspc: number;
  
  @Column({type:"float",default:0})
  luongcb: number;

  @Column('int', { default: 1 })
  trangthai: number;
}
