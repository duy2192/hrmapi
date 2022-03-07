import { getRepository, Not } from 'typeorm';
import { Job } from '../models/Job';
import { Personnel } from '../models/Personnel';

export const jobTransfer = async (input) => {
  try {
    const jobRepo = getRepository(Job);
    const personnelRepo = getRepository(Personnel);
    let job = new Job();
    job = {
      ...input,
    };
    const [personnel,currentJob]:any = await Promise.all([ personnelRepo.findOne({
      relations: ['dv'],
      where: {
        id: input.ns,
      },
    }),jobRepo.findOne({
      where: { ns: input.ns },
      relations: ['cv'],
      order: {
        ['id']: 'DESC',
      },
    })])
    if (personnel.dv.id == input.dv && currentJob?.cv?.id == input.cv) throw 'Nhân viên đang làm việc tại đây!';
    personnel.dv = input.dv;
    await Promise.all([
      jobRepo.save(job),
      personnelRepo.save(personnel),
      jobRepo.update(
        {
          id: Not(job.id),
          ns: input.ns,
        },
        {
          trangthai: 0,
        }
      ),
    ]);

    return job;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getJob = async (input) => {
  try {
    const repo = getRepository(Job);
    const job = repo.find({
      where: {
        ns: input.id,
      },
      relations: ['ns', 'dv', 'cv'],
      order: {
        id: 'DESC',
      },
    });
    return job;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const removeJob = async (input) => {
  try {
    const repo = getRepository(Job);
    await repo.softDelete({
      id: input.id,
    });
    return;
  } catch (error) {
    throw new Error(error as string);
  }
};
