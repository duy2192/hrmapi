import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,DeleteDateColumn } from 'typeorm';
import { Personnel } from './Personnel';
import { Level } from './Level';
@Entity()
export class LevelDetail {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @ManyToOne(() => Personnel, (personnel) => personnel.ctlv, { primary: true })
  ns: Personnel;

  @ManyToOne(() => Level, (pos) => pos.ctlv, { primary: true })
  lv: Level;
  
  @Column({nullable:true})
  noidaotao: string;

  @Column({nullable:true})
  chuyennganh: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  tungay: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  denngay: string;

  @Column({nullable:true})
  ketqua: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('int', { default: 1 })
  trangthai?: number;
}
