import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Level } from './Level';
import { LevelDetail } from './LevelDetail';
import { Department } from './Department';
import { Salary } from './Salary';
import { PositionDetail } from './PositionDetail';
import { Reward } from './Reward';
import { Discipline } from './Discipline';
import { Job } from './Job';
import { Contract } from './Contract';
import { Insurance } from './Insurance';

@Entity()
export class Personnel {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany(() => Level, (level) => level.id)
  lv?: Level[];

  @ManyToOne((type) => Department, (dep) => dep.id)
  dv: Department;

  @OneToMany((type) => PositionDetail, (pos) => pos.ns)
  ctcv?: PositionDetail[];

  @OneToMany((type) => LevelDetail, (ctlv) => ctlv.ns)
  ctlv?: LevelDetail[];

  @OneToMany(() => Salary, (salary) => salary.ns)
  luong?: Salary[];

  @OneToMany(() => Job, (work) => work.ns)
  qtlv?: Job[];

  @OneToMany(() => Reward, (reward) => reward.ns)
  khenthuong?: Reward[];

  @OneToMany(() => Discipline, (discipline) => discipline.ns)
  kyluat?: Discipline[];

  @OneToMany(() => Insurance, (ins) => ins.ns)
  baohiem?: Insurance[];

  @OneToMany(() => Contract, (contract) => contract.ns)
  hopdong?: Contract[];

  @Column({nullable:true})
  ten: string;

  @Column({nullable:true})
  gioitinh: string;

  @Column({ type: 'text',default:"" })
  avatar?: string;
  
  @Column({ type: 'text',default:"" })
  nguyenquan: string;

  @Column({ type: 'date' })
  ngaysinh: string;

  @Column({nullable:true})
  dantoc: string;

  @Column({nullable:true})
  tongiao: string;

  @Column({nullable:true})
  quoctich: string;

  @Column({default:""})
  cccd: string;

  @Column({ type: 'date' })
  ngaycap: string;

  @Column({nullable:true})
  noicap: string;

  @Column()
  tdvh?: string;

  @Column()
  tddt?: string;

  @Column({default:""})
  email: string;

  @Column({default:""})
  sdt: string;

  @Column({default:''})
  tp: string;

  @Column({default:''})
  quan: string;

  @Column({default:''})
  phuong: string;

  @Column({default:''})
  diachi: string;

  @Column('int', { default: 1 })
  trangthai?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
  