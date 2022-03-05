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

  @OneToMany(() => Contract, (contract) => contract.ns)
  hopdong?: Contract[];

  @Column()
  ten: string;

  @Column()
  gioitinh: string;

  @Column({ type: 'text' })
  avatar?: string;
  @Column({ type: 'text' })
  nguyenquan: string;

  @Column({ type: 'date' })
  ngaysinh: string;

  @Column()
  dantoc: string;

  @Column()
  tongiao: string;

  @Column()
  quoctich: string;

  @Column()
  cccd: string;

  @Column({ type: 'date' })
  ngaycap: string;

  @Column()
  noicap: string;

  @Column()
  tdvh?: string;

  @Column()
  tddt?: string;

  @Column()
  email: string;

  @Column()
  sdt: string;

  @Column()
  tp: string;

  @Column()
  quan: string;

  @Column()
  phuong: string;

  @Column()
  diachi: string;

  @Column('int', { default: 1 })
  trangthai?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
  