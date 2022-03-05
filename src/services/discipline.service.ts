import { getRepository } from 'typeorm';
import { Discipline } from '../models/Discipline';

export const createDiscipline= async (input) => {
  try {
    const repo = getRepository(Discipline);
    let dis = new Discipline();
    dis={
        ...input
    }

    await repo.save(dis);
    return dis;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getDiscipline= async (input) => {
  try {
    const repo = getRepository(Discipline);
    const discipline=repo.find({
      where:{
        ns:input.id
      },
      order: {
        id: 'DESC',
      },
    })
    return discipline;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const removeDiscipline= async (input) => {
  try {
    const repo = getRepository(Discipline);
    await repo.softDelete({
      id:input.id
    })
    return ;
  } catch (error) {
    throw new Error(error as string);
  }
};