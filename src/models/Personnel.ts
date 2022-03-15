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

@Entity('personnel')
export class Personnel {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany(() => Level, (level) => level.id,{nullable: true})
  lv?: Level[];

  @ManyToOne((type) => Department, (dep) => dep.id,{nullable: true})
  dv: Department;

  @OneToMany((type) => PositionDetail, (pos) => pos.ns,{nullable: true})
  ctcv?: PositionDetail[];

  @OneToMany((type) => LevelDetail, (ctlv) => ctlv.ns,{nullable: true})
  ctlv?: LevelDetail[];

  @OneToMany(() => Salary, (salary) => salary.ns,{nullable: true})
  luong?: Salary[];

  @OneToMany(() => Job, (work) => work.ns,{nullable: true})
  qtlv?: Job[];

  @OneToMany(() => Reward, (reward) => reward.ns,{nullable: true})
  khenthuong?: Reward[];

  @OneToMany(() => Discipline, (discipline) => discipline.ns,{nullable: true})
  kyluat?: Discipline[];

  @OneToMany(() => Insurance, (ins) => ins.ns,{nullable: true})
  baohiem?: Insurance[];

  @OneToMany(() => Contract, (contract) => contract.ns,{nullable: true})
  hopdong?: Contract[];

  @Column({ nullable: true })
  ten: string;

  @Column({ nullable: true })
  gioitinh: string;

  @Column({ type: 'text',  })
  avatar?: string;

  @Column({ type: 'text',  })
  nguyenquan: string;

  @Column({ type: 'timestamp' })
  ngaysinh: string;

  @Column({ nullable: true })
  dantoc: string;

  @Column({ nullable: true })
  tongiao: string;

  @Column({ nullable: true })
  quoctich: string;

  @Column(
    { default: '', 
    // unique: true 
  })
  cccd: string;

  @Column({ type: 'timestamp' })
  ngaycap: string;

  @Column({ nullable: true })
  noicap: string;

  @Column({ default: '' })
  tdvh?: string;

  @Column({ default: '' })
  tddt?: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  sdt: string;

  @Column({ default: '' })
  tp: string;

  @Column({ default: '' })
  quan: string;

  @Column({ default: '' })
  phuong: string;

  @Column({ default: '' })
  diachi: string;

  @Column('int', { default: 1 })
  trangthai?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
