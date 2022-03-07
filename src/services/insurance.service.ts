import { getRepository} from 'typeorm';
import { Insurance } from '../models/Insurance';

export const createInsurance= async (input) => {
  try {
    const repo = getRepository(Insurance);
    let insurance = new Insurance();
    insurance={
        ...input
    }

    await repo.save(insurance);
    return insurance;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getAllInsurance = async (input) => {
  try {
    const repo = getRepository(Insurance);
    const insurance=await repo.find({
      where:{
        ns:input.id
      },
      relations:["ns"],
      order: {
        id: 'DESC',
      },
    })
    return insurance;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const removeInsurance = async (input) => {
    try {
      const repo = getRepository(Insurance);
      let insurance =await  repo.findOne(input.id);
      await repo.softDelete(insurance);
      return 
    } catch (error) {
  
      throw new Error(error as string);
    }
  };
  