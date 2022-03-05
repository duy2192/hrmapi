import { getRepository,Not,IsNull } from 'typeorm';
import { Reward } from '../models/Reward';

export const createReward= async (input) => {
  try {
    const repo = getRepository(Reward);
    let reward = new Reward();
    reward={
        ...input
    }

    await repo.save(reward);
    return reward;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getReward= async (input) => {
  try {
    const repo = getRepository(Reward);
    const reward=repo.find({
      where:{
        ns:input.id
      },
      order: {
        id: 'DESC',
      },
    })
    return reward;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const removeReward= async (input) => {
  try {
    const repo = getRepository(Reward);
    await repo.softDelete({
      id:input.id
    })
    return ;
  } catch (error) {
    throw new Error(error as string);
  }
};