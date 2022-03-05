import { Request, Response } from 'express';
import { done, error, success } from '../utils/response';
import { createReward, getReward,removeReward } from '../services/reward.service';
// import {createSalarySchema} from "../schema/salary.schema";
import log from '../utils/logger';

export default class RewardController {
  async createReward(req: Request, res: Response) {
    try {
      //   createSalarySchema.validateSync(req.body)
      const reward = await createReward(req.body);
      success(res, reward);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async getReward(req: Request, res: Response) {
    try {
      //   createSalarySchema.validateSync(req.body)
      const input = {
        id: req.params.id,
      };
      const reward = await getReward(input);
      success(res, reward);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
  async removeReward(req: Request, res: Response) {
    try {
      const input = {
        id: req.params.id,
      };
      const reward = await removeReward(input);
      success(res, reward);
    } catch (e) {
      log.error((e as Error).message);
      error(res, (e as Error).message);
    }
  }
}
