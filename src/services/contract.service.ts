import { getRepository,Not} from 'typeorm';
import { Contract } from '../models/Contract';

export const createContract= async (input) => {
  try {
    const repo = getRepository(Contract);
    let contract = new Contract();
    contract={
        ...input
    }

    await repo.save(contract);
    // await repo.update({
    //   id:Not(contract.id),
    //   ns:input.ns

    // },{
    //   trangthai:0
    // })
    return contract;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getAllContract = async (input) => {
  try {
    const repo = getRepository(Contract);
    const job=await repo.find({
      where:{
        ns:input.id
      },
      relations:["ns"],
      order: {
        id: 'DESC',
      },
    })
    return job;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getContract = async (input) => {
  try {
    const repo = getRepository(Contract);
    const job=repo.findOne({
      where:{
        id:input.id
      },
    })
    return job;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const removeContract= async (input) => {
  try {
    const repo = getRepository(Contract);
    await repo.softDelete({
      id:input.id
    })
    return ;
  } catch (error) {
    throw new Error(error as string);
  }
};