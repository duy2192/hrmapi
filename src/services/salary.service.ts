import { getRepository,Not,IsNull } from 'typeorm';
import { Salary } from '../models/Salary';

export const createSalary = async (input) => {
  try {
    const repo = getRepository(Salary);
    let salary = new Salary();
    salary={
        ...input
    }

    await repo.save(salary);
    return salary;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getSalary = async (input) => {
  try {
    const repo = getRepository(Salary);
    const salary = repo.find({
      where:{
        ns:{
          id:input.id
        }
      },
      relations:["ns"],
      order: {
        id: 'DESC',
      }, 

    }) 
    return salary;
  } catch (error) {
    throw new Error(error as string);
  }
};