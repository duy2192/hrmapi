import { getRepository, MoreThan, Like, Not, In } from 'typeorm';
import { Personnel } from '../models/Personnel';
import { Contract } from '../models/Contract';
import { Job } from '../models/Job';
import { Salary } from '../models/Salary';
import { PositionDetail } from '../models/PositionDetail';
import { LevelDetail } from '../models/LevelDetail';

export const getAllPersonnel = async (input) => {
  try {
    const repo = getRepository(Personnel);
    const commonAndConditions = {
      trangthai: input.status,
      dv: { id: Number.parseInt(input.department) || MoreThan(0) },
      gioitinh: input.gender || Like('%%'),
    };
    const condition = [
      {
        ten: Like(`%${input.search}%`),
        ...commonAndConditions,
      },
      {
        email: Like(`%${input.search}%`),
        ...commonAndConditions,
      },
      { sdt: Like(`%${input.search}%`), 
      ...commonAndConditions },
    ];

    const sortField = input._sort.split(':')[0];
    const sortType = input._sort.split(':')[1];
    const [personnel, count]: any = await Promise.all([
      repo.find({
        skip: (input._page - 1) * input._limit,
        take: input._limit,
        relations: ['ctlv', 'ctlv.lv', 'dv', 'luong', 'hopdong', 'ctcv', 'ctcv.cv'],
        where: condition,
        order: {
          [sortField]: sortType,
        },
      }),
      repo.count({ where: condition }),
    ]);

    // console.log(personnel.filter((item) => (item.ctcv.map((positem) => positem.cv.id).includes(1))));

    return {
      data: personnel,
      pagination: {
        limit: input._limit,
        page: input._page,
        total: count,
      },
    };
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getPersonnel = async (input) => {
  try {
    const repo = getRepository(Personnel);
    const personnel = await repo.findOne({
      relations: ['ctlv', 'ctlv.lv', 'dv', 'luong', 'hopdong', 'qtlv'],
      where: { id: input.id },
    });
    return personnel;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updatePersonnel = async (input) => {
  try {
    const repo = getRepository(Personnel);
    const personnel = await repo.findOne(input.id);
    personnel.ten = input.ten?.replace(/  +/g, ' ');
    personnel.gioitinh = input.gioitinh;
    personnel.ngaysinh = input.ngaysinh;
    personnel.dantoc = input.dantoc?.replace(/  +/g, ' ');
    personnel.tongiao = input.tongiao?.replace(/  +/g, ' ');
    personnel.quoctich = input.quoctich?.replace(/  +/g, ' ');
    personnel.email = input.email;
    personnel.sdt = input.sdt;
    personnel.tp = input.tp || personnel.tp;
    personnel.quan = input.quan || personnel.quan;
    personnel.phuong = input.phuong || personnel.phuong;
    personnel.diachi = input.diachi?.replace(/  +/g, ' ');
    personnel.cccd = input.cccd;
    personnel.ngaycap = input.ngaycap;
    personnel.noicap = input.noicap?.replace(/  +/g, ' ');
    await repo.save(personnel);
    return personnel;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createPersonnel = async (input) => {
  try {
    const personnelRepo = getRepository(Personnel);
    let personnel = new Personnel();
    personnel = {
      sdt: input.sdt,
      phuong: input.phuong,
      quan: input.quan,
      tp: input.tp,
      cccd: input.cccd,
      gioitinh: input.gioitinh,
      email: input.email,
      dv: input.dv,
      ten: input.ten.replace(/  +/g, ' ') || '',
      ngaysinh: input.ngaysinh,
      nguyenquan: input.nguyenquan?.replace(/  +/g, ' ') || '',
      dantoc: input.dantoc?.replace(/  +/g, ' ') || '',
      tongiao: input.tongiao?.replace(/  +/g, ' ') || '',
      quoctich: input.quoctich?.replace(/  +/g, ' ') || '',
      ngaycap: input.ngaycap?.replace(/  +/g, ' ') || '',
      noicap: input.noicap?.replace(/  +/g, ' ') || '',
      diachi: input.diachi?.replace(/  +/g, ' ') || '',
    };
    await personnelRepo.save(personnel);
    const contractRepo = getRepository(Contract);

    let contract = new Contract();
    contract.ns = personnel;
    contract.loaihd = input.loaihd;
    contract.ngayky = input.ngayky;
    contract.ngaykt = input.ngaykt;
    contract.file = input.file;
    await contractRepo.save(contract);

    const jobRepo = getRepository(Job);
    let job = new Job();
    job.ns = personnel;
    job.ngaybatdau = input.ngayky;
    job.dv = input.dv;
    job.cv = input.cv;
    await jobRepo.save(job);

    const salaryRepo = getRepository(Salary);
    let salary = new Salary();
    salary.ns = personnel;
    salary.hsl = input.hsl;
    salary.hspc = input.hspc;
    salary.luongcb = input.luongcb;
    await salaryRepo.save(salary);

    const positionRepo = getRepository(PositionDetail);
    let position = new PositionDetail();
    position.ns = personnel;
    position.cv = input.cv;
    // position.ngaybonhiem=input.ngaybonhiem
    await positionRepo.save(position);

    const levelRepo = getRepository(LevelDetail);
    let level = new LevelDetail();
    level.ns = personnel;
    level.lv = input.lv;
    level.noidaotao = input.noidaotao?.replace(/  +/g, ' ') || '';
    level.tungay = input.tungay;
    level.denngay = input.denngay;
    level.chuyennganh = input.chuyennganh?.replace(/  +/g, ' ') || '';
    level.ketqua = input.ketqua?.replace(/  +/g, ' ') || '';
    await levelRepo.save(level);

    return personnel;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng hồ sơ!' as string);

    throw new Error(error as string);
  }
};

export const getPositionDetail = async (input) => {
  try {
    const repo = getRepository(PositionDetail);
    const position = await repo.find({
      relations: ['ns', 'cv'],
      where: { ns: input.id },
    });
    return position;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const addPositionDetail = async (input) => {
  try {
    const repo = getRepository(PositionDetail);
    let position = new PositionDetail();
    position = {
      ns: input.ns,
      cv: input.cv,
      ngaybonhiem: input.ngaybonhiem,
      ghichu: input.ghichu.replace(/  +/g, ' '),
    };
    let checkPos = await repo.count({
      where: {
        ns: input.ns,
        cv: input.cv,
        trangthai: 1,
      },
    });
    if (checkPos > 0) throw 'Nhân viên đang đảm nhiệm chức vụ này!';
    await repo.save(position);
    return position;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const removePositionDetail = async (input) => {
  try {
    const repo = getRepository(PositionDetail);
    await repo.softDelete({
      id: input.id,
    });
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getLevelDetail = async (input) => {
  try {
    const repo = getRepository(LevelDetail);
    const level = await repo.find({
      relations: ['ns', 'lv'],
      where: { ns: input.id },
    });
    return level;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const addLevelDetail = async (input) => {
  try {
    const repo = getRepository(LevelDetail);
    let level = new LevelDetail();
    level = {
      ns: input.ns,
      lv: input.lv,
      noidaotao: input.noidaotao.replace(/  +/g, ' '),
      chuyennganh: input.chuyennganh.replace(/  +/g, ' '),
      tungay: input.tungay,
      denngay: input.denngay,
      ketqua: input.ketqua.replace(/  +/g, ' '),
    };
    await repo.save(level);
    return level;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const removeLevelDetail = async (input) => {
  try {
    const repo = getRepository(LevelDetail);
    await repo.softDelete({
      id: input.id,
    });
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};
