import { getRepository,Like } from 'typeorm';
import { Level } from '../models/Level';
import { LevelDetail } from '../models/LevelDetail';

export const getLevel = async (input) => {
  try {
    const repo = getRepository(Level);
    const condition = {
      ten: Like(`%${input.search}%`),
      trangthai: input.status,

    };
    const [level, count] = await Promise.all([
      repo.find({
        skip: (input._page - 1) * input._limit,
        take: input._limit,
        relations: ["ctlv"],
        where: condition,
      }),
      repo.count({ where: condition }),
    ]);
    return {
      data: level,
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
export const createLevel = async (input: { ten: string; mota }) => {
  try {
    const repo = getRepository(Level);
    let level = new Level();
    level.ten = input.ten;
    level.mota = input.mota;

    await repo.save(level);
    return level;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng tên trình độ!' as string);

    throw new Error(error as string);
  }
};
export const editLevel = async (input: { id: string; ten: string; mota }) => {
  try {
    const repo = getRepository(Level);
    let level = await repo.findOne({ where: { id: input.id } });
    if(!level) throw "Không tìm thấy trình độ!"
    level.ten = input.ten;
    level.mota = input.mota;

    await repo.save(level);
    return level;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng tên trình độ!' as string);

    throw new Error(error as string);
  }
};
export const removeLevel = async (input: { id: string;}) => {
  try {
    const repo = getRepository(Level);
    let level = await repo.findOne({ where: { id: input.id } });
    if(!level) throw "Không tìm thấy trình độ!"
    level.trangthai=1
    await repo.save(level);
    return level;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new Error('Trùng tên trình độ!' as string);

    throw new Error(error as string);
  }
};
