import { getRepository, Like, MoreThan,createQueryBuilder } from 'typeorm';
import { Department } from '../models/Department';

export const getDepartment = async (input) => {
  try {
    const repo = getRepository(Department);
    const condition = {
      ten: Like(`%${input.search}%`),
      trangthai: input.status,

    };
    const [dep, count] = await Promise.all([
      repo.find({
        skip: (input._page - 1) * input._limit,
        take: input._limit,
        relations: ["ns"],
        where: condition,
      }),
      repo.count({ where: condition }),
    ]);
    return {
      data: dep,
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
export const createDepartment = async (input: { ten: string; mota }) => {
  try {
    const repo = getRepository(Department);
    let dep = new Department();
    dep.ten = input.ten;
    dep.mota = input.mota;

    await repo.save(dep);
    return dep;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng tên đơn vị!' as string);

    throw new Error(error as string);
  }
};
export const editDepartment = async (input: { id: string; ten: string; mota }) => {
  try {
    const repo = getRepository(Department);
    let dep = await repo.findOne({ where: { id: input.id } });
    if (!dep) throw 'Không tìm thấy đơn vị!';
    dep.ten = input.ten;
    dep.mota = input.mota;

    await repo.save(dep);
    return dep;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng tên đơn vị!' as string);

    throw new Error(error as string);
  }
};
export const removeDepartment = async (input) => {
  try {
    const repo = getRepository(Department);
    let department =await  repo.findOne(input.id);
    await repo.softDelete(department);
    return 
  } catch (error) {

    throw new Error(error as string);
  }
};

