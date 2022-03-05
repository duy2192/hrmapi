import { getRepository, Like } from 'typeorm';
import { Position } from '../models/Position';
export const getPosition = async (input) => {
  try {
    const repo = getRepository(Position);
    const position = repo.findOne(input.id);

    return position;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getAllPosition = async (input) => {
  try {
    const repo = getRepository(Position);
    const condition = {
      ten: Like(`%${input.search}%`),
      trangthai: input.status,
    };
    const [position, count] = await Promise.all([
      repo.find({
        skip: (input._page - 1) * input._limit,
        take: input._limit,
        relations: ['ns'],
        where: condition,
      }),
      repo.count({ where: condition }),
    ]);
    return {
      data: position,
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
export const createPosition = async (input: { ten: string; mota }) => {
  try {
    const repo = getRepository(Position);
    let pos = new Position();
    pos.ten = input.ten;
    pos.mota = input.mota;

    await repo.save(pos);
    return pos;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng tên chức vụ!' as string);

    throw new Error(error as string);
  }
};
export const updatePosition = async (input) => {
  try {
    const repo = getRepository(Position);
    let pos =await  repo.findOne(input.id);
    pos.ten = input.ten;
    pos.mota = input.mota;
    await repo.save(pos);
    return pos;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng tên chức vụ!' as string);

    throw new Error(error as string);
  }
};
export const removePosition = async (input) => {
  try {
    const repo = getRepository(Position);
    let pos =await  repo.findOne(input.id);
    await repo.softDelete(pos);
    return 
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng tên chức vụ!' as string);

    throw new Error(error as string);
  }
};
