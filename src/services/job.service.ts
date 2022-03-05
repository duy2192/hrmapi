import { getRepository,Not } from 'typeorm';
import { Job } from '../models/Job';
import { Personnel } from '../models/Personnel';

export const jobTransfer = async (input) => {
  try {
    const jobRepo = getRepository(Job);
    const personnelRepo = getRepository(Personnel);
    let job = new Job();
    job={
        ...input
    }
    const personnel=await personnelRepo.findOne({
      relations:["dv"],
      where:{
        id:input.ns
      }
    })
    if(personnel.dv.id==input.dv) throw "Nhân viên đang làm việc tại đây!"
    personnel.dv=input.dv
    await jobRepo.save(job);
    await personnelRepo.save(personnel)
    await jobRepo.update({
      id:Not(job.id),
      ns:input.ns
    },{
      trangthai:0
    })
    return job;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getJob = async (input) => {
  try {
    const repo = getRepository(Job);
    const job=repo.find({
      where:{
        ns:input.id
      },
      relations:["ns","dv"],
      order: {
        id: 'DESC',
      },
    })
    return job;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const removeJob = async (input) => {
  try {
    const repo = getRepository(Job);
    await repo.softDelete({
      id:input.id
    })
    return ;
  } catch (error) {
    throw new Error(error as string);
  }
};